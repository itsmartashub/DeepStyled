<template>
	<section class="section-colors colors">
		<div class="section-cards">
			<!-- <ColorPicker
				v-for="picker in colorPickers"
				:key="picker.id"
				:id="picker.id"
				:mode="picker.mode"
				v-model="picker.model"
				@change="picker.handler"
			/> -->

			<ColorPicker id="lightColor" v-model="lightHex" mode="Light" @change="saveLight" />
			<ColorPicker id="darkColor" v-model="darkHex" mode="Dark" @change="saveDark" />
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
import { onMounted, watch, computed } from 'vue'
import { useStyleTag } from '@vueuse/core'
import { useAccentColors } from '@/composables/useAccentColors.js'
import ColorPicker from '@/components/Custom/Colors/ColorPicker.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import CardToggle from '@/components/Cards/Toggle.vue'
import IconPipe from '@/components/Icons/Pipe.vue'
import Separator from '@/components/Separator.vue'

import { accentUserBubbleItem } from '@/utils/storage'
import { useToggleStorage } from '@/composables/useToggleStorage.js'

const toggleAccentUserBubble = useToggleStorage(accentUserBubbleItem, 'dsx-toggle-accent-user-bubble')

const { lightHex, darkHex, load, saveLight, saveDark, reset, lightHSL, darkHSL } = useAccentColors()

const accentCSS = computed(() => {
	const [lightH, lightS, lightL] = lightHSL.value
	const [darkH, darkS, darkL] = darkHSL.value

	return `
		body.light{
			--accent-h: ${String(lightH)} !important;
			--accent-s: ${lightS}% !important;
			--accent-l: ${lightL}% !important;
		}
		
		body.dark{
			--accent-h: ${String(darkH)} !important;
			--accent-s: ${darkS}% !important;
			--accent-l: ${darkL}% !important;
		}
	`
})

const {
	css,
	load: loadStyles,
	unload: unloadStyles,
} = useStyleTag(accentCSS.value, { id: 'dsx-accent-styles', immediate: true })

// Update CSS when accent values change
watch(accentCSS, (newCSS) => {
	css.value = newCSS
})

onMounted(async () => {
	await load()
})

// optional: clean up on unmount if needed
// onUnmounted(() => unloadStyles())
</script>
