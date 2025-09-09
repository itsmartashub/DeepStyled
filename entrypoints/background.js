import { browser } from '#imports'

export default defineBackground(() => {
	async function updateBadge() {
		const manifest = browser.runtime.getManifest()
		const badgeText = manifest.version

		browser.action.setBadgeText({ text: badgeText })
		browser.action.setBadgeBackgroundColor({ color: '#adb4e4' })
	}

	// Update badge on installation/update
	browser.runtime.onInstalled.addListener(async () => {
		await updateBadge()
	})

	// Initial badge setup
	updateBadge()
})
