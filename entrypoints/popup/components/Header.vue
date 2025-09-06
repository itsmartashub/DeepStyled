<script setup>
import { ref, computed } from 'vue'
import { version, name } from '@/package.json'
import PillChip from '@/components/PillChip.vue'
import IconGithub from '@/components/Icons/Github.vue'

const EXT_VERSION = ref(`v${version}`)
const EXT_REPO = `https://github.com/itsmartashub/${name}`
const EXT_RELEASE_LINK = computed(() => `${EXT_REPO}/releases/tag/v${EXT_VERSION.value}`)
</script>

<template>
	<header class="header">
		<PillChip
			:text="EXT_VERSION"
			:icon="IconGithub"
			chip-bg="var(--on-accent)"
			chip-text="var(--accent)"
			:href="EXT_REPO"
		/>
	</header>
</template>

<style lang="scss" scoped>
.header {
	padding: 1rem;
}
</style>
