if (module.hot) {
	module.hot.accept()
}

import { init as initThemes } from './app/themeManager'
import { init as initFloating } from './app/floatingBtn'
import { init as initColors } from './app/mainColors'
// import { init as initFonts } from './app/mainFonts'
// import { init as initWidths } from './app/mainWidths'
// import { initCanvasObserver } from './app/ui' // nah, it doesnt work for canvas...
import packageJson from '../../package.json'

console.log('packageJson: ', packageJson)

initThemes()
initFloating()
initColors()
// initFonts()
// initWidths()
// initCanvasObserver()
