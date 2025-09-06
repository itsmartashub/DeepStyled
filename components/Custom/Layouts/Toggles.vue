<template>
	<div class="section-row layouts-toggles">
		<CardToggle
			v-model="hideThinkingState"
			title="Hide Thinking Process"
			subtitle="Force hide AI reasoning steps and display only final answers."
			:iconComponent="IconThinkingProcess"
			tooltip="<strong>NOTE</strong>: Clicking on the thought process element won't reveal it again. Only toggling this setting can restore it."
		/>

		<CardToggle
			v-model="toggleBubbleAI"
			title="Turn off AI Bubble"
			subtitle="Turn off the AI bubble style to match the default Deepseek look and feel."
			:iconComponent="IconBubbleOFF"
		/>

		<CardToggle
			v-model="toggleUserBubbleFullWidthState"
			title="User Bubble Full Width"
			subtitle="Make User bubble full width to match the AI bubble width."
			:iconComponent="IconFullWidth"
		/>
	</div>
</template>

<script setup>
import { hideThinkingItem, toggleBubbleAIItem, toggleUserBubbleFullWidthItem } from '@/utils/storage'
import { useToggleStorage } from '@/composables/useToggleStorage.js'

import CardToggle from '@/components/Cards/Toggle.vue'
import IconThinkingProcess from '@/components/Icons/ThinkingProcess.vue'
import IconBubbleOFF from '@/components/Icons/BubbleOFF.vue'
import IconFullWidth from '@/components/Icons/FullWidth.vue'

// One toggle controls everything
const hideThinkingState = useToggleStorage(hideThinkingItem, 'dsx-toggle-thinking-process')
const toggleBubbleAI = useToggleStorage(toggleBubbleAIItem, 'dsx-toggle-ai-bubble')
const toggleUserBubbleFullWidthState = useToggleStorage(
	toggleUserBubbleFullWidthItem,
	'dsx-toggle-user-bubble-full-width'
)
</script>

<style lang="scss">
.layouts-toggles {
	display: grid;
	gap: 0.5rem;
}
</style>
