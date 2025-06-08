<template>
	<div class="layouts-toggles">
		<ToggleCard
			v-model="hideThinkingState"
			title="Hide Thinking Process"
			subtitle="Hide AI reasoning steps and show only final answers"
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
