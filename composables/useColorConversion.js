// src/composables/useColorConversion.js

/**
 * Converts a hex color string (e.g. "#ff9800") into an HSL array: [h, s, l]
 */
export function hexToHSL(hex) {
	hex = hex.replace(/^#/, '')
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((c) => c + c)
			.join('')
	}
	const r = parseInt(hex.substr(0, 2), 16) / 255
	const g = parseInt(hex.substr(2, 2), 16) / 255
	const b = parseInt(hex.substr(4, 2), 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h = 0,
		s = 0,
		l = (max + min) / 2

	if (max !== min) {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h = h * 60
	}
	return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
}

/**
 * Converts an HSL array [h, s, l] into a hex color string.
 * h should be between 0 and 360, s and l between 0 and 100.
 */
export function hslToHex([h, s, l]) {
	s /= 100
	l /= 100

	const c = (1 - Math.abs(2 * l - 1)) * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = l - c / 2
	let r = 0,
		g = 0,
		b = 0

	if (h >= 0 && h < 60) {
		r = c
		g = x
		b = 0
	} else if (h >= 60 && h < 120) {
		r = x
		g = c
		b = 0
	} else if (h >= 120 && h < 180) {
		r = 0
		g = c
		b = x
	} else if (h >= 180 && h < 240) {
		r = 0
		g = x
		b = c
	} else if (h >= 240 && h < 300) {
		r = x
		g = 0
		b = c
	} else if (h >= 300 && h < 360) {
		r = c
		g = 0
		b = x
	}

	const toHex = (n) => {
		const hex = Math.round((n + m) * 255).toString(16)
		return hex.length === 1 ? '0' + hex : hex
	}

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
