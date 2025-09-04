import { ref, watch } from 'vue'

export function useToggleStorage(storageItem, attributeName) {
	const state = ref(false)
	let initialized = false

	// Initialize state from storage
	const initializeState = async () => {
		try {
			const val = await storageItem.getValue()
			state.value = Boolean(val)
		} catch (error) {
			console.warn('Failed to load storage value:', error)
		} finally {
			initialized = true
		}
	}

	initializeState()

	watch(state, async (val, oldVal) => {
		// Skip until initialization finishes
		if (!initialized) return

		// Only update if value actually changed
		if (val === oldVal) return

		const root = document.documentElement
		if (val) {
			if (!root.hasAttribute(attributeName)) root.setAttribute(attributeName, '')
		} else {
			if (root.hasAttribute(attributeName)) root.removeAttribute(attributeName)
		}

		try {
			await storageItem.setValue(val)
		} catch (error) {
			console.warn('Failed to save storage value:', error)
		}
	})

	return state
}
