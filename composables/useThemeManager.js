import { computed, ref, watchEffect } from 'vue'
import { useStorage } from '@vueuse/core'
import { THEMES, isOLEDItem } from '@/utils/storage'

// Bind to the website’s localStorage theme preference.
const rawThemeStorage = useStorage('__appKit_@deepseek/chat_themePreference', {}, localStorage, {
	read: (v) => {
		try {
			const parsed = JSON.parse(v)
			return typeof parsed === 'object' && parsed !== null ? parsed : {}
		} catch {
			return {}
		}
	},
	write: (v) => JSON.stringify(v),
})

// **OLED flag stored in wxt-dev/storage (for persistence & live updates)**
const oledFlag = ref(false)

// **Sync OLED flag from extension storage on startup**
isOLEDItem.getValue().then((value) => {
	oledFlag.value = value
})

// **Watch for OLED changes across all open tabs (Live Sync)**
isOLEDItem.watch((newVal) => {
	oledFlag.value = newVal
})

// Media query for SYSTEM theme detection.
const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')

// Compute the raw theme (SYSTEM mode respects media query).
const rawTheme = computed(() => {
	const storedTheme = rawThemeStorage.value?.value
	const theme = storedTheme || THEMES.SYSTEM
	return theme === THEMES.SYSTEM ? (mediaQuery.matches ? THEMES.LIGHT : THEMES.DARK) : theme
})

// **Final active theme (OLED takes priority & persists on refresh)**
const effectiveActiveTheme = computed(() => {
	return oledFlag.value ? THEMES.OLED : rawTheme.value
})

// **Apply theme changes reactively**
watchEffect(() => {
	applyTheme(rawTheme.value, oledFlag.value)
})

// **Update only `value` in localStorage (keeping `__version` untouched)**
function updateThemeInStorage(newTheme) {
	const current = rawThemeStorage.value || {}
	rawThemeStorage.value = { ...current, value: newTheme }
}

// **Called from the extension UI**
function changeTheme(themeId) {
	if ([THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM].includes(themeId)) {
		updateThemeInStorage(themeId)
		isOLEDItem.setValue(false) // Disable OLED when switching standard themes
	} else if (themeId === THEMES.OLED) {
		updateThemeInStorage(THEMES.DARK) // Store as DARK (since site doesn’t support OLED natively)
		isOLEDItem.setValue(true) // Enable OLED mode
	} else {
		console.warn('Unknown theme:', themeId)
	}
}

// **Ensure OLED mode applies correctly (Body class = dark, but dsxTheme = oled)**
function applyTheme(theme, isOLED) {
	const isDark = theme === THEMES.DARK || isOLED
	const body = document.body

	// **Force class to "dark" when OLED is enabled**
	body.className = isDark ? THEMES.DARK : theme
	body.toggleAttribute('data-ds-dark-theme', isDark)

	// **OLED should be applied as a dataset, NOT a body class**
	body.dataset.dsxTheme = isOLED ? THEMES.OLED : theme
}

export function useThemeManager() {
	return {
		effectiveActiveTheme,
		changeTheme,
	}
}
