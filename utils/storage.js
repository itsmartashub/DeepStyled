import { storage } from 'wxt/storage'
import { hslToHex } from '@/composables/useColorConversion'

// ---------- Default constants ----------
export const DEFAULT_ACCENT_LIGHT_HSL = [335, 21, 35]
export const DEFAULT_ACCENT_DARK_HSL = [236, 100, 81]
export const DEFAULT_MAX_WIDTH = 800

export const THEMES = Object.freeze({
	LIGHT: 'light',
	DARK: 'dark',
	SYSTEM: 'system',
	OLED: 'oled',
})

// Pre-compute hex values instead of doing it every time
const DEFAULT_ACCENT_LIGHT_HEX = hslToHex(DEFAULT_ACCENT_LIGHT_HSL)
const DEFAULT_ACCENT_DARK_HEX = hslToHex(DEFAULT_ACCENT_DARK_HSL)

// ---------- Helper ----------
export async function getAllStorageItems() {
	try {
		const res = await storage.snapshot('local')
		console.table(res)
		return res // return for chaining
	} catch (e) {
		console.warn('Failed to snapshot storage:', e)
		return null
	}
}

// ---------- Storage configuration ----------
const STORAGE_CONFIG = Object.freeze({
	theme: {
		themeItem: { key: 'local:theme', fallback: THEMES.SYSTEM },
		isOLEDItem: { key: 'local:isOLED', fallback: false },
		accentLightItem: { key: 'local:accent-light', fallback: DEFAULT_ACCENT_LIGHT_HEX },
		accentDarkItem: { key: 'local:accent-dark', fallback: DEFAULT_ACCENT_DARK_HEX },
	},
	fonts: {
		fontFamilyItem: { key: 'local:font-family', fallback: null },
		fontSizeItem: { key: 'local:font-size', fallback: null },
		lineHeightItem: { key: 'local:line-height', fallback: null },
		letterSpacingItem: { key: 'local:letter-spacing', fallback: null },
	},
	layout: {
		maxWidthChatsItem: { key: 'local:maxWidthChats', fallback: { value: DEFAULT_MAX_WIDTH, unit: 'px' } },
		maxWidthTextareaItem: { key: 'local:maxWidthTextarea', fallback: { value: DEFAULT_MAX_WIDTH, unit: 'px' } },
		hideThinkingItem: { key: 'local:hideThinking', fallback: false },
	},
})

// ---------- Generate storage items (optimized) ----------
export const storageItems = {}
const itemEntries = [] // Cache for destructuring

for (const category of Object.values(STORAGE_CONFIG)) {
	for (const [name, config] of Object.entries(category)) {
		const item = storage.defineItem(
			config.key,
			config.fallback !== undefined ? { fallback: config.fallback } : undefined
		)
		storageItems[name] = item
		itemEntries.push([name, item])
	}
}

// ---------- Named exports (generated dynamically) ----------
export const {
	themeItem,
	isOLEDItem,
	accentLightItem,
	accentDarkItem,
	fontFamilyItem,
	fontSizeItem,
	lineHeightItem,
	letterSpacingItem,
	maxWidthChatsItem,
	maxWidthTextareaItem,
	hideThinkingItem,
} = storageItems
