import { ref, watch } from 'vue'

export function useToggleStorage(storageItem, cssVar) {
	const state = ref(false)

	// Initialize state from storage immediately
	const initializeState = async () => {
		try {
			const val = await storageItem.getValue()
			state.value = Boolean(val)
		} catch (error) {
			console.warn('Failed to load storage value:', error)
		}
	}

	// Fire and forget initialization
	initializeState()

	// Reactive sync: state → CSS + storage
	watch(
		state,
		async (val) => {
			const display = val ? 'none' : 'block'
			document.documentElement.style.setProperty(cssVar, display)

			try {
				await storageItem.setValue(val)
			} catch (error) {
				console.warn('Failed to save storage value:', error)
			}
		},
		{ immediate: true } // Apply initial state to CSS
	)

	return state
}
