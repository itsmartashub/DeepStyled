export function renderButton({ className, id, content, disabled = false }) {
	return `
        <button id="${id}" class="${className}" ${disabled ? 'disabled' : ''}>
            ${content}
        </button>
	`
}
