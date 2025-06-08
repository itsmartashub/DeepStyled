import { ref, watch } from 'vue'

export function useToggleStorage(storageItem, cssVar, hideOnTrue = true) {
	const state = ref(false)

	storageItem.getValue().then((val) => {
		state.value = val

		// Only run after value is loaded
		watch(
			state,
			(val) => {
				const display = val === hideOnTrue ? 'none' : 'block'
				document.documentElement.style.setProperty(cssVar, display)
				storageItem.setValue(val)
			},
			{ immediate: true }
		)
	})

	return state
}
