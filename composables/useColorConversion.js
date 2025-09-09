export function hexToHSL(hex) {
	hex = hex.replace(/^#/, '')
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((c) => c + c)
			.join('')
	}

	// Bitwise parsing is faster than parseInt with radix
	const r = parseInt(hex.slice(0, 2), 16) / 255
	const g = parseInt(hex.slice(2, 4), 16) / 255
	const b = parseInt(hex.slice(4, 6), 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const diff = max - min

	let h = 0,
		s = 0
	const l = (max + min) * 0.5

	if (diff !== 0) {
		s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

		// Slightly optimized switch
		if (max === r) h = (g - b) / diff + (g < b ? 6 : 0)
		else if (max === g) h = (b - r) / diff + 2
		else h = (r - g) / diff + 4

		h *= 60
	}

	return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
}

export function hslToHex([h, s, l]) {
	s *= 0.01 // Multiplication is faster than division
	l *= 0.01

	const c = (1 - Math.abs(2 * l - 1)) * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = l - c * 0.5

	let r = 0,
		g = 0,
		b = 0

	// Optimized range checking
	const h60 = h / 60
	if (h60 < 1) {
		r = c
		g = x
		b = 0
	} else if (h60 < 2) {
		r = x
		g = c
		b = 0
	} else if (h60 < 3) {
		r = 0
		g = c
		b = x
	} else if (h60 < 4) {
		r = 0
		g = x
		b = c
	} else if (h60 < 5) {
		r = x
		g = 0
		b = c
	} else {
		r = c
		g = 0
		b = x
	}

	// Bitwise magic for hex conversion - much faster!
	const toHex = (n) => (Math.round((n + m) * 255) | 0).toString(16).padStart(2, '0')

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
