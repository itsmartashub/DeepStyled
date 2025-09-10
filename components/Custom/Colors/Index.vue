<template>
	<section class="section-colors colors">
		<div class="section-cards">
			<ColorPicker
				v-for="picker in colorPickers"
				:key="picker.id"
				:id="picker.id"
				:mode="picker.mode"
				v-model="picker.model"
				@change="picker.handler"
				v-memo="[picker.model.value]"
			/>

			<!-- <ColorPicker id="lightColor" v-model="lightHex" mode="Light" @change="saveLight" />
			<ColorPicker id="darkColor" v-model="darkHex" mode="Dark" @change="saveDark" /> -->
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
import { reactive, onMounted, watch, nextTick, ref } from 'vue'
import { useCssVar } from '@vueuse/core'
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

const { lightHex, darkHex, load, saveLight, saveDark, reset, lightHSL, darkHSL } = useAccentColors()

// Reactive array for color pickers
const colorPickers = ref([
	{ id: 'lightColor', model: lightHex, mode: 'Light', handler: saveLight },
	{ id: 'darkColor', model: darkHex, mode: 'Dark', handler: saveDark },
])

// Apply CSS variables efficiently without reparsing stylesheets
let rafId
let cssH, cssS, cssL, cssHsl
const applyLiveCssVars = () => {
	if (rafId) cancelAnimationFrame(rafId)
	rafId = requestAnimationFrame(() => {
		const isDark = document.body.classList.contains('dark')
		const h = isDark ? darkHSL.value[0] : lightHSL.value[0]
		const s = isDark ? darkHSL.value[1] : lightHSL.value[1]
		const l = isDark ? darkHSL.value[2] : lightHSL.value[2]
		cssH.value = String(h)
		cssS.value = `${s}%`
		cssL.value = `${l}%`
		// cssHsl.value = `${h} ${s}% ${l}%`
	})
}

onMounted(async () => {
	// bind css vars to body element
	cssH = useCssVar('--accent-h', () => document.body)
	cssS = useCssVar('--accent-s', () => document.body)
	cssL = useCssVar('--accent-l', () => document.body)
	// cssHsl = useCssVar('--accent-hsl', () => document.body)

	await load()
	applyLiveCssVars()
})

watch([lightHSL, darkHSL], applyLiveCssVars, { deep: false })
</script>
