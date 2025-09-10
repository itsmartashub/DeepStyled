export function hexToHSL(hex) {
	// console.log(hex)

	// if (typeof hex !== 'string') throw new Error('Invalid HEX value')
	hex = hex.replace(/^#/, '')
	// if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) throw new Error('Invalid HEX value')

	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((c) => c + c)
			.join('')
	}

	const r = parseInt(hex.slice(0, 2), 16) / 255
	const g = parseInt(hex.slice(2, 4), 16) / 255
	const b = parseInt(hex.slice(4, 6), 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const diff = max - min

	let h = 0
	let s = 0
	const l = (max + min) * 0.5

	if (diff !== 0) {
		s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

		if (max === r) h = (g - b) / diff + (g < b ? 6 : 0)
		else if (max === g) h = (b - r) / diff + 2
		else h = (r - g) / diff + 4

		h *= 60
	}

	// return [h, s * 100, l * 100] // keep floats internally for better round-trip
	// Round to nearest integer using Math.round()
	return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
}

export function hslToHex([h, s, l]) {
	if (!Array.isArray([h, s, l]) || [h, s, l].some((v) => typeof v !== 'number')) throw new Error('Invalid HSL array')

	s *= 0.01
	l *= 0.01

	const c = (1 - Math.abs(2 * l - 1)) * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = l - c * 0.5

	let r = 0,
		g = 0,
		b = 0
	const h60 = h / 60

	if (h60 < 1) [r, g, b] = [c, x, 0]
	else if (h60 < 2) [r, g, b] = [x, c, 0]
	else if (h60 < 3) [r, g, b] = [0, c, x]
	else if (h60 < 4) [r, g, b] = [0, x, c]
	else if (h60 < 5) [r, g, b] = [x, 0, c]
	else [r, g, b] = [c, 0, x]

	const toHex = (n) => {
		const val = Math.round((n + m) * 255)
		const clamped = Math.min(255, Math.max(0, val)) // clamp for safety
		return clamped.toString(16).padStart(2, '0')
	}

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
