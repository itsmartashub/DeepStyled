import { ref } from 'vue'
import { fontFamilyItem, fontSizeItem, lineHeightItem, letterSpacingItem } from '@/utils/storage'

const GOOGLE_FONT_WEIGHTS = ':ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,100;1,300;1,400;1,500;1,600;1,700'

export function useFontSettings(defaults) {
	const fontFamily = ref(defaults.fontFamily)
	const fontSize = ref(defaults.fontSize)
	const lineHeight = ref(defaults.lineHeight)
	const letterSpacing = ref(defaults.letterSpacing)
	const errorMessage = ref('')

	// Applies settings to document CSS variables immediately.
	function applySettings(settings) {
		Object.entries(settings).forEach(([key, value]) => {
			document.documentElement.style.setProperty(`--${key}`, value)
		})
	}

	// Load stored settings using the imported storage items.
	async function loadStoredSettings() {
		try {
			const storedFontFamily = await fontFamilyItem.getValue()
			const storedFontSize = await fontSizeItem.getValue()
			const storedLineHeight = await lineHeightItem.getValue()
			const storedLetterSpacing = await letterSpacingItem.getValue()

			if (storedFontFamily && storedFontFamily !== defaults.fontFamily) {
				loadGoogleFont(storedFontFamily)
			}
			fontFamily.value = storedFontFamily ?? defaults.fontFamily
			fontSize.value = storedFontSize ?? defaults.fontSize
			lineHeight.value = storedLineHeight ?? defaults.lineHeight
			letterSpacing.value = storedLetterSpacing ?? defaults.letterSpacing

			applySettings({
				fontFamily: fontFamily.value,
				fontSize: fontSize.value,
				lineHeight: lineHeight.value,
				letterSpacing: letterSpacing.value,
			})
		} catch (error) {
			console.error('Failed to load settings:', error)
		}

		// Set up watchers for each storage item.
		fontFamilyItem.watch((newVal) => {
			fontFamily.value = newVal
			if (newVal !== defaults.fontFamily) {
				loadGoogleFont(newVal)
			}
		})
		fontSizeItem.watch((newVal) => {
			fontSize.value = newVal
		})
		lineHeightItem.watch((newVal) => {
			lineHeight.value = newVal
		})
		letterSpacingItem.watch((newVal) => {
			letterSpacing.value = newVal
		})
	}

	// Dynamically load a Google Font.
	function loadGoogleFont(family) {
		const links = [
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
			{
				rel: 'stylesheet',
				href: `https://fonts.googleapis.com/css2?family=${family.replace(
					' ',
					'+'
				)}${GOOGLE_FONT_WEIGHTS}&display=swap`,
			},
		]
		links.forEach(({ rel, href, crossorigin }) => {
			const link = document.createElement('link')
			link.rel = rel
			link.href = href
			if (crossorigin !== undefined) {
				link.crossOrigin = crossorigin
			}
			document.head.appendChild(link)
		})
	}

	// Remove all Google Font-related link elements.
	function removeAllGoogleFontsLinks() {
		const links = Array.from(document.querySelectorAll("head link[href*='fonts.']"))
		links.forEach((link) => {
			if (link.href.includes('fonts.googleapis.com') || link.href.includes('fonts.gstatic.com')) {
				link.remove()
			}
		})
	}

	// Validate numeric input values.
	function validateInputField(value, min, max) {
		const num = parseFloat(value)
		if (isNaN(num)) {
			displayError('Empty or invalid value')
			return false
		} else if (num < min || num > max) {
			displayError(`Number must be between ${min} and ${max}`)
			return false
		}
		return true
	}

	// Display an error message for 4 seconds.
	function displayError(message) {
		errorMessage.value = message
		setTimeout(() => {
			errorMessage.value = ''
		}, 4000)
	}

	// Format a number to remove extra zeros.
	function formatNumber(inputVal, toFixedNum = 2) {
		let formatted = parseFloat(inputVal).toFixed(toFixedNum)
		return formatted.replace(/\.?0+$/, '')
	}

	// Setter functions update UI immediately and then perform storage writes in the background.
	function setFontFamily(value) {
		removeAllGoogleFontsLinks()
		if (value !== defaults.fontFamily) {
			loadGoogleFont(value)
		}
		fontFamily.value = value

		applySettings({ fontFamily: value })
		// Update storage asynchronously without awaiting.
		fontFamilyItem.setValue(value).catch((err) => console.error(err))
	}

	function setFontSize(value) {
		const formatted = formatNumber(value)
		const min = 12,
			max = 24
		if (!validateInputField(formatted, min, max)) {
			fontSize.value = defaults.fontSize
			applySettings({ fontSize: defaults.fontSize })
			fontSizeItem.setValue(defaults.fontSize).catch((err) => console.error(err))
			return
		}
		fontSize.value = formatted

		applySettings({ fontSize: formatted })
		fontSizeItem.setValue(formatted).catch((err) => console.error(err))
	}

	function setLineHeight(value) {
		const formatted = formatNumber(value)
		const min = 12,
			max = 60
		if (!validateInputField(formatted, min, max)) {
			lineHeight.value = defaults.lineHeight
			applySettings({ lineHeight: defaults.lineHeight })
			lineHeightItem.setValue(defaults.lineHeight).catch((err) => console.error(err))
			return
		}
		lineHeight.value = formatted
		applySettings({ lineHeight: formatted })
		lineHeightItem.setValue(formatted).catch((err) => console.error(err))
	}

	function setLetterSpacing(value) {
		const formatted = formatNumber(value)
		const min = -30,
			max = 30
		if (!validateInputField(formatted, min, max)) {
			letterSpacing.value = defaults.letterSpacing
			applySettings({ letterSpacing: defaults.letterSpacing })
			letterSpacingItem.setValue(defaults.letterSpacing).catch((err) => console.error(err))
			return
		}
		letterSpacing.value = formatted
		applySettings({ letterSpacing: formatted })
		letterSpacingItem.setValue(formatted).catch((err) => console.error(err))
	}

	function resetAllFonts() {
		fontFamily.value = defaults.fontFamily
		fontSize.value = defaults.fontSize
		lineHeight.value = defaults.lineHeight
		letterSpacing.value = defaults.letterSpacing
		removeAllGoogleFontsLinks()
		applySettings(defaults)
		// Write all changes to storage asynchronously.
		fontFamilyItem.setValue(defaults.fontFamily).catch((err) => console.error(err))
		fontSizeItem.setValue(defaults.fontSize).catch((err) => console.error(err))
		lineHeightItem.setValue(defaults.lineHeight).catch((err) => console.error(err))
		letterSpacingItem.setValue(defaults.letterSpacing).catch((err) => console.error(err))
	}

	return {
		fontFamily,
		fontSize,
		lineHeight,
		letterSpacing,
		errorMessage,
		setFontFamily,
		setFontSize,
		setLineHeight,
		setLetterSpacing,
		resetAllFonts,
		loadStoredSettings,
	}
}
