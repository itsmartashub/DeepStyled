<template>
	<div class="section-row layouts-toggles">
		<CardToggle
			v-model="hideThinkingState"
			title="Hide Thinking Process"
			subtitle="Force hide AI reasoning steps and display only final answers."
			:iconComponent="IconThinkingProcess"
			tooltip="<strong>Note</strong>: Clicking on the thought process element won't reveal it again. Only toggling this setting can restore it."
		/>
	</div>
</template>

<script setup>
import { hideThinkingItem } from '@/utils/storage'
import { useToggleStorage } from '@/composables/useToggleStorage.js'

import CardToggle from '@/components/Cards/Toggle.vue'
import IconThinkingProcess from '@/components/Icons/ThinkingProcess.vue'

// One toggle controls everything
const hideThinkingState = useToggleStorage(hideThinkingItem, '--displayThinkingProcess')
</script>
