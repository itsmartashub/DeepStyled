export function setCSSVar(cssPropName, val) {
	return document.documentElement.style.setProperty(`--${cssPropName}`, val)
}
