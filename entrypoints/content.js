// import '@/styles/index.scss'

// import { createApp } from 'vue'
// import ThemeManager from '@/components/ThemeManager.vue'
// import { useThemeManager } from '@/composables/useThemeManager'
// // import FloatingBtn from '@/components/FloatingBtn.vue'
// // import Theme from '@/components/Theme.vue'

// export default defineContentScript({
// 	matches: ['*://chat.deepseek.com/*'],
// 	async main(ctx) {
// 		console.log('Hello content.js')

// 		// Force theme initialization before the UI mounts.
// 		// This uses your wxt/storage calls—if they’re async, wait for them.
// 		const { init } = useThemeManager()
// 		await init() // the document.body gets the right classes here

// 		// Use the integrated UI API provided by wxt-dev
// 		const ui = createIntegratedUi(ctx, {
// 			position: 'inline',
// 			anchor: 'body',
// 			onMount: (container) => {
// 				// Create and mount the Vue 3 app with the FloatingButton component
// 				console.log(container)

// 				const app = createApp(ThemeManager)
// 				app.mount(container)

// 				return app
// 			},
// 			onRemove: (app) => {
// 				// Cleanly unmount the Vue app when the UI is removed
// 				app.unmount()
// 			},
// 		})

// 		// Finally, add the UI to the page
// 		ui.mount()
// 	},
// })

// ___________________________________________

// entrypoints/content.js
// import '@/styles/index.scss'
import { createApp } from 'vue'
import ThemeManager from '@/components/ThemeManager.vue'
import { useThemeManager } from '@/composables/useThemeManager'

export default defineContentScript({
	matches: ['*://chat.deepseek.com/*'],
	css: ['src/styles/index.scss'], // 👈 Use the same index.scss for content scripts

	async main(ctx) {
		// Simply call useThemeManager() so that the reactive syncing is set up.
		// (No need to call an explicit init—our watchers run immediately.)
		useThemeManager()

		// Use the integrated UI API provided by wxt-dev
		const ui = createIntegratedUi(ctx, {
			position: 'inline',
			anchor: 'body',
			onMount: (container) => {
				const app = createApp(ThemeManager)
				app.mount(container)
				return app
			},
			onRemove: (app) => {
				app.unmount()
			},
		})

		ui.mount()
	},
})
