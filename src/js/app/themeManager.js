import browser from 'webextension-polyfill'
import { openSettings } from './settingsManager.js'

// Constants for theme management
const THEMES = {
	LIGHT: 'light',
	DARK: 'dark',
	SYSTEM: 'system',
	OLED: 'oled',
}

const STORAGE_KEYS = {
	THEME: 'theme',
	IS_OLED: 'isOLED',
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')

// Core theme management
function getSystemTheme() {
	return mediaQuery.matches ? THEMES.LIGHT : THEMES.DARK
}

// Theme state management
async function getStoredThemeState() {
	const result = await browser.storage.local.get([STORAGE_KEYS.THEME, STORAGE_KEYS.IS_OLED])
	return {
		theme: result[STORAGE_KEYS.THEME] || THEMES.SYSTEM,
		isOLED: result[STORAGE_KEYS.IS_OLED] === true,
	}
}

function setRootTheme(theme, isOLED) {
	const body = document.body
	const effectiveTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme
	const isDark = effectiveTheme === THEMES.DARK

	body.className = effectiveTheme

	// Efficiently manage attributes
	body.toggleAttribute('data-ds-dark-theme', isDark)
	body.dataset.dsxTheme = isDark && isOLED ? 'oled' : effectiveTheme
}

async function updateTheme(newTheme, isOLED = false) {
	const { theme: currentTheme } = await getStoredThemeState()
	const currentIsOLED = (await browser.storage.local.get(STORAGE_KEYS.IS_OLED))[STORAGE_KEYS.IS_OLED]

	if (currentTheme === newTheme && currentIsOLED === isOLED) return

	setRootTheme(newTheme, isOLED)

	// Update storage and DOM in a single operation
	await browser.storage.local.set({
		[STORAGE_KEYS.THEME]: newTheme,
		[STORAGE_KEYS.IS_OLED]: isOLED,
	})
}

// Event handlers
async function handleChangeTheme(e) {
	const themeBtn = e.target.closest('button')
	if (!themeBtn) return

	const themeId = themeBtn.id

	console.log(themeId)

	switch (themeId) {
		case THEMES.LIGHT:
		case THEMES.DARK:
		case THEMES.SYSTEM:
			await updateTheme(themeId, false)
			break
		case 'oled':
			await updateTheme(THEMES.DARK, true)
			break
		case 'dsx-open-settings':
			openSettings()
			break
	}
}

async function init() {
	const { theme, isOLED } = await getStoredThemeState()
	setRootTheme(theme, isOLED)

	mediaQuery.addEventListener('change', async () => {
		const { theme, isOLED } = await getStoredThemeState()
		if (theme === THEMES.SYSTEM) {
			setRootTheme(THEMES.SYSTEM, isOLED)
		}
	})
}

export { init, handleChangeTheme }
