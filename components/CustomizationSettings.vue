S
<!-- CustomizationSettings.vue -->
<template>
	<div ref="settingsRef" class="customization-settings">
		<button @click="$emit('close')" class="settings-close">+</button>

		<div class="settings-content">
			<div class="settings-header">
				<h3>Customization Settings</h3>
			</div>
			<div class="settings-tabs">
				<button :class="{ active: activeTab === 'colors' }" @click="activeTab = 'colors'">Colors</button>
				<button :class="{ active: activeTab === 'fonts' }" @click="activeTab = 'fonts'">Fonts</button>
				<button :class="{ active: activeTab === 'width' }" @click="activeTab = 'width'">Width</button>
			</div>
			<div class="settings-body">
				<div v-show="activeTab === 'colors'">
					<CustomColors />
				</div>
				<div v-show="activeTab === 'fonts'">
					<CustomFonts />
				</div>
				<div v-show="activeTab === 'width'">
					<CustomWidths />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CustomColors from '@/components/Colors/Index.vue'
import CustomFonts from '@/components/Fonts/Index.vue'
import CustomWidths from '@/components/Widths/Index.vue'

const activeTab = ref('colors')
const settingsRef = ref(null)
const emit = defineEmits(['close'])

function handleClickOutside(event) {
	if (settingsRef.value && !settingsRef.value.contains(event.target)) {
		emit('close')
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss">
.customization-settings {
	--w-scrollbar: 0.2rem;
	// --p: 2.2rem 2.8rem;
	--p: 2.5rem;
	--max-h: 75vh;
	--shadow-color: hsla(var(--accent-hsl) / 0.09);
	--shadow-values: inset 0 0 20px 10px;
	position: fixed;
	top: calc(var(--roller-top) + var(--roller-size));
	right: var(--roller-right);
	// width: clamp(18rem, 25vw, 22rem);
	width: clamp(17rem, 30vw, 22rem);
	max-height: var(--max-h);
	padding: var(--p);
	background-color: var(--c-bg-sidebar);
	border-radius: var(--br-dialog);
	border: 1px solid hsla(var(--accent-hsl) / 0.18);
	box-shadow: var(--shadow-values) var(--shadow-color);
	overflow: clip scroll;
	font-family: var(--fontFamily);
	font-size: 1.2rem;

	@include dev('xs') {
		--p: 4vw;
		--max-h: 70vh;
		font-size: 1rem;
		// width: calc(100% - calc(var(--roller-right) * 4));
	}

	// @include dev('xxs') {
	// 	--p: 4vw;
	// }

	.settings-close {
		position: absolute;
		top: 0.8rem;
		right: 1rem;
		color: var(--c-danger);
		background-color: hsla(var(--accent-hsl) / 0.15);
		font-size: 1.2em;
		border-radius: 50vw;
		border: none;
		cursor: pointer;
		rotate: 45deg;
	}

	.settings-content {
		width: 100%;
		height: 100%;

		.settings-header {
			position: relative;
			text-align: center;
			font-size: 1.05em;

			h3 {
				font-weight: 500;
				margin: 0 auto;
				margin-bottom: 1rem;
			}
		}

		.settings-tabs {
			display: flex;
			align-items: center;
			padding: 0.25rem;
			margin: 1.5rem auto;
			font-weight: 600;
			background-color: hsla(var(--accent-hsl) / 0.15);
			color: var(--c-accent);
			border-radius: 100vw;

			button {
				flex: 1;
				padding: calc(var(--p-btn) * 0.65);
				font-weight: bold;
				font-family: var(--fontFamily);
				font-size: 0.8em;
				text-align: center;
				border: none;
				background: none;
				border-radius: inherit;
				cursor: pointer;
				color: var(--c-accent);
				transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

				&:focus {
					outline: none;
				}

				&.active {
					background-color: var(--c-accent);
					color: var(--c-on-accent) !important;
				}
			}
		}

		.settings-body {
			overflow-y: auto;
			max-height: calc(var(--max-h) * 0.7);
		}
	}
}
</style>
