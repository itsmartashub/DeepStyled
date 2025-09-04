<template>
	<section class="section-colors colors">
		<div class="section-cards">
			<div class="colorpicker">
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
			</div>
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

// Watch for changes in storage and update the reactive variables
accentLightItem.watch((newVal) => {
	if (newVal !== lightHex.value) {
		lightHex.value = newVal
	}
})

accentDarkItem.watch((newVal) => {
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
	const storedLight = await accentLightItem.getValue()
	const storedDark = await accentDarkItem.getValue()
	lightHex.value = storedLight || accentLightItem.fallback
	darkHex.value = storedDark || accentDarkItem.fallback

	// Set the initial CSS content in the style tag
	styleTag.innerHTML = cssString.value
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
</script>
<style lang="scss" scoped>
.colorpicker {
	// width: clamp(7rem, 10vw, 10rem);
	cursor: pointer;
	transition: transform 0.2s ease-in-out;

	background-image: linear-gradient(
		135deg,
		hsla(var(--accent-hsl) / 0.2) 0%,
		hsla(var(--accent-hsl) / 0.03) 40%,
		hsla(var(--accent-hsl) / 0.03) 60%,
		hsla(var(--accent-hsl) / 0.1) 100%
	);
	border: 1px solid hsla(var(--accent-hsl) / 0.1);
	border-radius: 1rem;

	label {
		cursor: pointer;
		display: grid;
		place-items: center;
		gap: 0.5rem;
		padding: 0.8rem;

		p {
			font-size: 0.62em;
			text-transform: uppercase;
			margin: 0;
			line-height: 1;

			span {
				font-weight: bold;
			}
		}
	}

	input[type='color'] {
		--input_color_size: 3.2rem;
		--br_colorpicker: 1.5rem;
		width: var(--input_color_size);
		height: var(--input_color_size);
		background-color: transparent;
		border: none;
		outline: none;
		border-radius: var(--br_colorpicker);
		cursor: pointer;

		&::-webkit-color-swatch-wrapper,
		&::-moz-color-swatch-wrapper {
			padding: 0;
		}

		&::-moz-color-swatch {
			border-radius: var(--br_colorpicker);
			border: none;
			outline: none;
		}

		&::-webkit-color-swatch {
			border-radius: var(--br_colorpicker);
			border: none;
			outline: none;
		}
	}

	&:hover {
		transform: scale(0.98);
	}
}
</style>
