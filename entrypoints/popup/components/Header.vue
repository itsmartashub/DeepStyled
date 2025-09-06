<script setup>
import { ref, computed } from 'vue'
import { version, name } from '@/package.json'
import PillChip from '@/components/PillChip.vue'
import IconGithub from '@/components/Icons/Github.vue'

const EXT_VERSION = ref(`v${version}`)
const EXT_REPO = `https://github.com/itsmartashub/${name}`
const EXT_RELEASE_LINK = computed(() => `${EXT_REPO}/releases/tag/v${EXT_VERSION.value}`)

const goToProfile = () => {
	chrome.runtime.openOptionsPage()
}

const openLink = () => {
	chrome.tabs.create({
		url: EXT_REPO ? EXT_REPO : 'https://github.com/itsmartashub/DeepStyled',
		active: true,
	})
	// Optional: close popup after opening
	window.close()
}

// onMounted(async () => {
// 	try {
// 		// Get version from extension manifest
// 		const manifest = chrome.runtime.getManifest()
// 		EXT_VERSION.value = `v${manifest.version}`
// 	} catch (error) {
// 		console.error('Failed to get extension version:', error)
// 		EXT_VERSION.value = 'Github'
// 	}
// })
</script>

<template>
	<header class="header">
		<div>
			<!-- Icon + Text -->
			<PillChip
				:text="EXT_VERSION"
				:icon="IconGithub"
				chip-bg="var(--on-accent)"
				chip-text="var(--accent)"
				href="https://github.com/itsmartashub/deepstyled"
			/>

			<!-- Icon only -->
			<PillChip :icon="IconGithub" @click="toggleLike" />

			<!-- Text only -->
			<PillChip text="DeepStyled" />
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
