<template>
	<div class="layouts-toggles">
		<ToggleCard
			v-model="hideThinkingState"
			title="Hide Thinking Process"
			subtitle="Force hide AI reasoning steps and display only final answers. </br></br>
			Note: Clicking on the thought process element won't reveal it again. Only toggling this setting can restore it."
			:iconComponent="IconThinkingProcess"
		/>
	</div>
</template>

<script setup>
import { hideThinkingItem } from '@/utils/storage'
import { useToggleStorage } from '@/composables/useToggleStorage.js'
import ToggleCard from '@/components/Toggle/Card.vue'
import IconThinkingProcess from '@/components/Icons/ThinkingProcess.vue'

// One toggle controls everything
const hideThinkingState = useToggleStorage(hideThinkingItem, '--displayThinkingProcess')
</script>
