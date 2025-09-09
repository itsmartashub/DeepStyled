<template>
	<section class="section-colors colors">
		<div class="section-cards">
			<!-- <div class="colorpicker">
				<label for="lightColor">
					<input id="lightColor" type="color" v-model="lightHex" @change="onLightChange" />
					<p>Accent <span>Light</span></p>
				</label>
			</div>
			<div class="colorpicker">
				<label for="darkColor">
					<input id="darkColor" type="color" v-model="darkHex" @change="onDarkChange" />
					<p>Accent <span>Dark</span></p>
				</label>
			</div> -->
			<ColorPicker
				v-for="picker in colorPickers"
				:key="picker.id"
				:id="picker.id"
				:v-model="picker.modelValue"
				:label="picker.label"
				:subLabel="picker.subLabel"
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
			<ButtonPrimary id="resetColors" @click="resetColors">Reset Colors</ButtonPrimary>
		</footer>
	</section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { accentLightItem, accentDarkItem } from '@/utils/storage'
import { hexToHSL } from '@/composables/useColorConversion'
import ColorPicker from '@/components/Colors/ColorPicker.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import CardToggle from '@/components/Cards/Toggle.vue'
import IconPipe from '@/components/Icons/Pipe.vue'
import Separator from '@/components/Separator.vue'

import { accentUserBubbleItem } from '@/utils/storage'
import { useToggleStorage } from '@/composables/useToggleStorage.js'

// One toggle controls everything
const toggleAccentUserBubble = useToggleStorage(accentUserBubbleItem, 'dsx-toggle-accent-user-bubble')

// The accent colors are stored as hex strings (because <input type="color"> only works with hex)
const lightHex = ref('')
const darkHex = ref('')

// Centralized color picker configuration
const colorPickers = [
	{
		id: 'lightColor',
		modelValue: lightHex,
		label: 'Accent',
		subLabel: 'Light',
		handler: onLightChange,
	},
	{
		id: 'darkColor',
		modelValue: darkHex,
		label: 'Accent',
		subLabel: 'Dark',
		handler: onDarkChange,
	},
]

// Watch for changes in storage and update the reactive variables
const stopLightWatcher = accentLightItem.watch((newVal) => {
	if (newVal !== lightHex.value) {
		lightHex.value = newVal
	}
})

const stopDarkWatcher = accentDarkItem.watch((newVal) => {
	if (newVal !== darkHex.value) {
		darkHex.value = newVal
	}
})

// Compute HSL values from the hex colors for CSS variable application
const lightHSL = computed(() => hexToHSL(lightHex.value))
const darkHSL = computed(() => hexToHSL(darkHex.value))

// Create the dynamic CSS string that will be injected globally
const cssString = computed(() => {
	return `
	  body.light {
		--accent-h: ${lightHSL.value[0]} !important;
		--accent-s: ${lightHSL.value[1]}% !important;
		--accent-l: ${lightHSL.value[2]}% !important;
	  }
	  body.dark {
		--accent-h: ${darkHSL.value[0]} !important;
		--accent-s: ${darkHSL.value[1]}% !important;
		--accent-l: ${darkHSL.value[2]}% !important;
	  }
	`
})

// Global style tag reference (we want this to persist across pages)
let styleTag = null

onMounted(async () => {
	// Check if the style tag already exists; if not, create and append it.
	styleTag = document.getElementById('dynamic-accent-styles')
	if (!styleTag) {
		styleTag = document.createElement('style')
		styleTag.id = 'dynamic-accent-styles'
		document.head.appendChild(styleTag)
	}

	// Load stored accent colors (or fallback to defaults)
	try {
		const [storedLight, storedDark] = await Promise.all([accentLightItem.getValue(), accentDarkItem.getValue()])

		lightHex.value = storedLight || accentLightItem.fallback
		darkHex.value = storedDark || accentDarkItem.fallback

		// Set the initial CSS content in the style tag
		styleTag.innerHTML = cssString.value
	} catch (error) {
		console.error('Failed to load accent colors:', error)
		// Set fallback values
		lightHex.value = accentLightItem.fallback
		darkHex.value = accentDarkItem.fallback
	}
})

// Update the injected CSS whenever the computed cssString changes
watch(cssString, (newVal) => {
	if (styleTag) {
		styleTag.innerHTML = newVal
	}
})

// Persist new accent color values on change (only on change events)
function onLightChange() {
	accentLightItem.setValue(lightHex.value)
}

function onDarkChange() {
	accentDarkItem.setValue(darkHex.value)
}

function resetColors() {
	// Reset to default values from storage.js
	lightHex.value = accentLightItem.fallback
	darkHex.value = accentDarkItem.fallback

	// Reuse the existing change handlers to update storage
	onLightChange()
	onDarkChange()
}

// Clean up watchers when component is unmounted
onUnmounted(() => {
	stopLightWatcher()
	stopDarkWatcher()
})
</script>
