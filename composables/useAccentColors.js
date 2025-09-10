// composables/useAccentColors.js
import { ref, computed } from 'vue'
// import { useDebounceFn } from '@vueuse/core'
import { accentLightItem, accentDarkItem } from '@/utils/storage'
import { hexToHSL } from '@/composables/useColorConversion'

export function useAccentColors() {
	const lightHex = ref(accentLightItem.fallback)
	const darkHex = ref(accentDarkItem.fallback)

	// Load stored values
	const load = async () => {
		try {
			const [storedLight, storedDark] = await Promise.all([accentLightItem.getValue(), accentDarkItem.getValue()])
			if (storedLight) lightHex.value = storedLight
			if (storedDark) darkHex.value = storedDark
		} catch (err) {
			console.error('Failed to load accent colors', err)
		}
	}

	// Save only when user commits (@change)
	const saveLight = async () => {
		try {
			await accentLightItem.setValue(lightHex.value)
		} catch (err) {
			console.error('Failed to save light accent color', err)
		}
	}

	const saveDark = async () => {
		try {
			await accentDarkItem.setValue(darkHex.value)
		} catch (err) {
			console.error('Failed to save dark accent color', err)
		}
	}

	const reset = () => {
		lightHex.value = accentLightItem.fallback
		darkHex.value = accentDarkItem.fallback
		saveLight()
		saveDark()
	}

	// // Compute HSL for CSS injection
	const lightHSL = computed(() => hexToHSL(lightHex.value))
	const darkHSL = computed(() => hexToHSL(darkHex.value))

	return {
		lightHex,
		darkHex,
		load,
		saveLight,
		saveDark,
		reset,
		lightHSL,
		darkHSL,
	}
}
