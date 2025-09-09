// composables/useAccentColors.js
import { ref, computed } from 'vue'
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

	// Save on change
	const saveLight = () => accentLightItem.setValue(lightHex.value)
	const saveDark = () => accentDarkItem.setValue(darkHex.value)

	const reset = () => {
		lightHex.value = accentLightItem.fallback
		darkHex.value = accentDarkItem.fallback
		saveLight()
		saveDark()
	}

	// Compute HSL for CSS injection
	const lightHSL = computed(() => hexToHSL(lightHex.value))
	const darkHSL = computed(() => hexToHSL(darkHex.value))

	// // CSS string
	const cssString = computed(
		() => `
	        body.light {
	            --accent-h: ${lightHSL.value[0]} !important;
	            --accent-s: ${lightHSL.value[1]}% !important;
	            --accent-l: ${lightHSL.value[2]}% !important;
	        }
	        body.dark {
	            --accent-h: ${darkHSL.value[0]} !important;
	            --accent-s: ${darkHSL.value[1]}% !important;
	            --accent-l: ${darkHSL.value[2]}% !important;
	        }
	    `
	)

	return {
		lightHex,
		darkHex,
		load,
		saveLight,
		saveDark,
		reset,
		cssString,
	}
}
