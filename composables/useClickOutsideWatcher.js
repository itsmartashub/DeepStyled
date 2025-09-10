import { onClickOutside } from '@vueuse/core'

/*
 * Reactive click-outside watcher that automatically manages listener lifecycle
- target - Element ref to watch
- isOpen - Reactive boolean that controls when listener is active
- onClose - Callback to execute when clicked outside
- options - VueUse onClickOutside options (ignore, etc.)
- Manual cleanup function is returned */
export function useClickOutsideWatcher(target, isOpen, onClose, options = {}) {
	let stopListener = null

	const cleanup = () => {
		stopListener?.()
		stopListener = null
	}

	watch(
		isOpen,
		(open) => {
			cleanup() // Always cleanup previous listener

			if (open && target.value) {
				stopListener = onClickOutside(target, onClose, options)
			}
		},
		{ flush: 'post' } // Wait for DOM updates
	)

	// Cleanup on component unmount
	onScopeDispose(cleanup)

	// Return manual cleanup function for edge cases
	return cleanup
}
