import { computed, ref, watchEffect } from 'vue'
import { useStorage } from '@vueuse/core'
import { THEMES, isOLEDItem } from '@/utils/storage'

// Local storage theme (with potential metadata object)
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

const oledFlag = ref(false)

isOLEDItem.getValue().then((v) => (oledFlag.value = v))
isOLEDItem.watch((newVal) => (oledFlag.value = newVal))

const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')

const rawTheme = computed(() => {
	const storedTheme = rawThemeStorage.value?.value
	const theme = storedTheme || THEMES.SYSTEM
	return theme === THEMES.SYSTEM ? (mediaQuery.matches ? THEMES.LIGHT : THEMES.DARK) : theme
})

const effectiveActiveTheme = computed(() => {
	return oledFlag.value ? THEMES.OLED : rawTheme.value
})

watchEffect(() => {
	applyTheme(rawTheme.value, oledFlag.value)
})

function updateThemeInStorage(newTheme) {
	const current = rawThemeStorage.value || {}
	rawThemeStorage.value = { ...current, value: newTheme }
}

function isDarkLike(theme, oled) {
	return theme === THEMES.DARK || (!oled && theme === THEMES.SYSTEM && !mediaQuery.matches) || oled
}

function changeTheme(themeId) {
	const currentStoredTheme = rawThemeStorage.value?.value || THEMES.SYSTEM
	const currentOLED = oledFlag.value

	const newOLED = themeId === THEMES.OLED
	const newStoredTheme = newOLED ? THEMES.DARK : themeId

	const currentIsDark = isDarkLike(currentStoredTheme, currentOLED)
	const nextIsDark = isDarkLike(newStoredTheme, newOLED)

	const themeChangedVisually = currentIsDark !== nextIsDark

	// Skip if nothing changes
	if (currentStoredTheme === newStoredTheme && currentOLED === newOLED) return

	// Ask for confirmation if reload is needed
	if (themeChangedVisually) {
		const ok = confirm(
			`Changing between light and dark themes requires reloading the page.\n\n` +
				`Some parts of the interface, like markdown code block syntax colors, may not update correctly without it.\n\n` +
				`Proceed and reload now?`
		)
		if (!ok) return
	}

	updateThemeInStorage(newStoredTheme)
	isOLEDItem.setValue(newOLED)

	console.log('Theme changed to:', themeId)

	if (themeChangedVisually) {
		location.reload()
	}
}

function applyTheme(theme, isOLED) {
	const isDark = isDarkLike(theme, isOLED)
	const body = document.body

	body.className = isDark ? THEMES.DARK : theme
	body.toggleAttribute('data-ds-dark-theme', isDark)
	body.dataset.dsxTheme = isOLED ? THEMES.OLED : theme
}

export function useThemeManager() {
	return {
		effectiveActiveTheme,
		changeTheme,
	}
}
