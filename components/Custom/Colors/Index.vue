<template>
	<section class="section-colors colors">
		<div class="section-cards">
			<ColorPicker
				v-for="picker in colorPickers"
				:key="picker.id"
				:id="picker.id"
				v-model="picker.model"
				:mode="picker.mode"
				@change="picker.handler"
			/>
		</div>

		<Separator />

		<CardToggle
			v-model="toggleAccentUserBubble"
			title="Accent User Bubble"
			subtitle="Make User bubble fully accented for higher contrast"
			:iconComponent="IconPipe"
		/>

		<Separator />

		<footer class="section-footer">
			<ButtonPrimary @click="reset">Reset Colors</ButtonPrimary>
		</footer>
	</section>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useAccentColors } from '@/composables/useAccentColors.js'
import ColorPicker from '@/components/Custom/Colors/ColorPicker.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import CardToggle from '@/components/Cards/Toggle.vue'
import IconPipe from '@/components/Icons/Pipe.vue'
import Separator from '@/components/Separator.vue'

import { accentUserBubbleItem } from '@/utils/storage'
import { useToggleStorage } from '@/composables/useToggleStorage.js'

// toggle
const toggleAccentUserBubble = useToggleStorage(accentUserBubbleItem, 'dsx-toggle-accent-user-bubble')

// use composable
const { lightHex, darkHex, load, saveLight, saveDark, reset, cssString } = useAccentColors()

// Reactive array for color pickers
const colorPickers = reactive([
	{ id: 'lightColor', model: lightHex, mode: 'Light', handler: saveLight },
	{ id: 'darkColor', model: darkHex, mode: 'Dark', handler: saveDark },
])

// Inject CSS into head
let styleTag
onMounted(async () => {
	styleTag = document.getElementById('dynamic-accent-styles')
	if (!styleTag) {
		styleTag = document.createElement('style')
		styleTag.id = 'dynamic-accent-styles'
		document.head.appendChild(styleTag)
	}

	await load()
	styleTag.textContent = cssString.value
})

// Watch for live updates
watch(cssString, (newVal) => {
	if (styleTag) styleTag.textContent = newVal
})

// const resetColors = () => reset()
</script>
