// src/utils/storage.js
import { storage } from 'wxt/storage'
import { hslToHex } from '@/composables/useColorConversion'

export const DEFAULT_ACCENT_LIGHT_HSL = [335, 21, 35] // Example: Warm color for light mode
export const DEFAULT_ACCENT_DARK_HSL = [236, 100, 81] // Example: Cool color for dark mode

// Default values for max widths (in px)
export const DEFAULT_MAX_WIDTH = 800

export const THEMES = {
	LIGHT: 'light',
	DARK: 'dark',
	SYSTEM: 'system',
	OLED: 'oled',
}

export function getAllStorageItems() {
	storage.snapshot('local').then((res) => console.table(res))
}

export const themeItem = storage.defineItem('local:theme', {
	fallback: THEMES.SYSTEM,
})

export const isOLEDItem = storage.defineItem('local:isOLED', {
	fallback: false,
})

export const accentLightItem = storage.defineItem('local:accent-light', {
	fallback: hslToHex(DEFAULT_ACCENT_LIGHT_HSL),
})

export const accentDarkItem = storage.defineItem('local:accent-dark', {
	fallback: hslToHex(DEFAULT_ACCENT_DARK_HSL),
})

// New storage items for our font settings:
export const fontFamilyItem = storage.defineItem('local:font-family')
export const fontSizeItem = storage.defineItem('local:font-size')
export const lineHeightItem = storage.defineItem('local:line-height')
export const letterSpacingItem = storage.defineItem('local:letter-spacing')

export const maxWidthChatsItem = storage.defineItem('local:maxWidthChats', {
	fallback: { value: DEFAULT_MAX_WIDTH, unit: 'px' },
})

export const maxWidthTextareaItem = storage.defineItem('local:maxWidthTextarea', {
	fallback: { value: DEFAULT_MAX_WIDTH, unit: 'px' },
})

export const hideThinkingItem = storage.defineItem('local:hideThinking', {
	fallback: false,
})
