<template>
	<div class="section-toggles">
		<ToggleCard
			v-model="hideThinkingState"
			title="Hide Thinking Process"
			subtitle="Hide AI reasoning steps and show only final answers"
			icon="👁️"
		/>
	</div>
</template>

<script setup>
import { hideThinkingItem } from '@/utils/storage'
import { useToggleStorage } from '@/composables/useToggleStorage.js'
import ToggleCard from '@/components/Toggle/Card.vue'

// One toggle controls everything
const hideThinkingState = useToggleStorage(hideThinkingItem, '--displayThinkingProcess')
</script>

<style lang="scss" scoped></style>
