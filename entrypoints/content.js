// import '@/styles/index.scss'
import '../styles/index.scss'
import { createApp } from 'vue'

import ThemeManager from '@/components/ThemeManager.vue'
import { useThemeManager } from '@/composables/useThemeManager'
// import { getAllStorageItems } from '@/utils/storage'

export default defineContentScript({
	matches: ['*://chat.deepseek.com/*'],

	async main(ctx) {
		// Force theme initialization before the UI mounts.
		useThemeManager()

		// Use the integrated UI API provided by wxt-dev
		const ui = createIntegratedUi(ctx, {
			position: 'inline',
			anchor: 'body',
			onMount: (container) => {
				// Create and mount the Vue 3 app with the ThemeManager component
				const app = createApp(ThemeManager)
				app.mount(container)

				// console.log('getAllStorageItems: ', getAllStorageItems())

				return app
			},
			onRemove: (app) => {
				// Cleanly unmount the Vue app when the UI is removed
				app.unmount()
			},
		})
		// Finally, add the UI to the page
		ui.mount()
	},
})
