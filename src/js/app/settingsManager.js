import { renderColorsTab, resetAllAccents } from './mainColors.js'
import { renderFontsTab, handleFontsListeners } from './mainFonts.js'
import { renderWidthsTab, handleWidthsListeners } from './mainWidths.js'

let $settings = null
let $resetAllAccentsBtn = null

const SETTINGS_OPEN_CLASS = 'gpth-settings--open'

async function createSettings() {
	const gpthSettings = document.createElement('div')
	gpthSettings.className = 'gpth-settings'

	gpthSettings.innerHTML = `
	<header>
		<h2 class="gpth-settings__title">
			Deep<span>Styled</span> Customization
		</h2>
		<button id="gpth-settings-close">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.34315 6.34338L17.6569 17.6571M17.6569 6.34338L6.34315 17.6571" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</button>
  </header>
  
  <main>
	<div class="tabs">
		<div class="tabs__buttons">
			<button class="tabs__button active">Color</button>
			<button class="tabs__button">Font</button>
			<button class="tabs__button">Width</button>
		</div>
		<div class="tabs__content">
			<div class="tabs__pane active" id="tab-colors">${renderColorsTab}</div>
			<div class="tabs__pane" id="tab-fonts">${renderFontsTab}</div>
			<div class="tabs__pane" id="tab-assets">${renderWidthsTab}</div>
		</div>
	</div>
  </main>  
  `

	document.body.appendChild(gpthSettings)
	cacheElements(gpthSettings)
	addListeners()
}

function cacheElements(gpthSettings) {
	$settings = gpthSettings
	$resetAllAccentsBtn = $settings.querySelector('#resetAllAccents')
	$resetAllAccentsBtn.disabled = true
}
function addListeners() {
	document.getElementById('gpth-settings-close').addEventListener('click', closeSettings)
	handleTabsSwitching()
	handleFontsListeners()
	handleWidthsListeners()
	$resetAllAccentsBtn.addEventListener('click', resetAllAccents)
}
// ___ Settings management
function openSettings() {
	$settings.classList.add(SETTINGS_OPEN_CLASS)
	$settings.addEventListener('transitionend', handleSettingsOpened)
	$resetAllAccentsBtn.disabled = false
}
function handleSettingsOpened() {
	document.body.addEventListener('click', handleClickOutsideSettings)
	$settings.removeEventListener('transitionend', handleSettingsOpened)
}
function closeSettings() {
	$settings.classList.remove(SETTINGS_OPEN_CLASS)
	document.body.removeEventListener('click', handleClickOutsideSettings)
	$resetAllAccentsBtn.disabled = true
}
function handleClickOutsideSettings(e) {
	if (!$settings.contains(e.target) && e.target.id !== 'gpth-open-settings') closeSettings()
}

function handleTabsSwitching() {
	const tabs = document.querySelectorAll('.gpth-settings .tabs__button')
	const panes = document.querySelectorAll('.gpth-settings .tabs__pane')

	tabs.forEach((tab, index) => {
		tab.addEventListener('click', () => {
			document.querySelector('.tabs__button.active').classList.remove('active')
			document.querySelector('.tabs__pane.active').classList.remove('active')

			tab.classList.add('active')
			panes[index].classList.add('active')
		})
	})
}

export { createSettings, openSettings, closeSettings, $settings }
