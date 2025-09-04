<template>
	<div ref="settingsRef" class="customization-settings">
		<header class="customization-settings__header">
			<h3>Customization Settings</h3>
		</header>

		<div class="customization-settings__tabs">
			<button
				v-for="tab in tabs"
				:key="tab.id"
				:class="{ active: activeTab === tab.id }"
				@click="activeTab = tab.id"
				@mousedown.prevent
			>
				{{ tab.label }}
			</button>
		</div>

		<div class="customization-settings__body">
			<CustomColors v-show="activeTab === 'colors'" key="colors" class="tab-content" />
			<CustomFonts v-show="activeTab === 'fonts'" key="fonts" class="tab-content" />
			<CustomLayouts v-show="activeTab === 'layouts'" key="layouts" class="tab-content" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CustomColors from '@/components/Custom/Colors/Index.vue'
import CustomFonts from '@/components/Custom/Fonts/Index.vue'
import CustomLayouts from '@/components/Custom/Layouts/Index.vue'

const tabs = [
	{ id: 'colors', label: 'Colors' },
	{ id: 'fonts', label: 'Fonts' },
	{ id: 'layouts', label: 'Layouts' },
]

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
	// @include scrollbar;

	// --w-scrollbar: 0.2rem;
	--p: 2.5rem;
	--max-h: 65dvh;
	--shadow-color: hsla(var(--accent-hsl) / 0.09);
	--shadow-values: inset 0 0 20px 10px;
	position: fixed;
	top: calc(var(--roller-top) + var(--roller-size) + 0.5rem);
	right: var(--roller-right);
	width: clamp(16rem, 35vw, 22rem);
	max-height: var(--max-h);
	padding: var(--p);
	background-color: var(--c-bg-sidebar);
	border-radius: var(--br-dialog);
	border: 1px solid hsla(var(--accent-hsl) / 0.18);
	box-shadow: var(--shadow-values) var(--shadow-color);
	overflow: clip scroll;
	font-family: var(--fontFamily), var(--fontFamilyDefault);
	font-size: 1.2rem;
	z-index: 10; // z-index of code-block markdown banner is 6, so we need to be above that

	@include dev('md') {
		--max-h: 85dvh;
		right: 50%;
		transform: translateX(50%);
		width: clamp(16rem, 60vw, 30rem);
	}

	// @include dev('sm') {
	// }

	@include dev('xs') {
		--p: 4vw;
		width: 85vw;
		font-size: 1rem;
	}

	&__header {
		position: relative;
		text-align: center;
		font-size: 1.05em;

		h3 {
			font-weight: 500;
			margin: 0 auto;
			margin-bottom: 1rem;
		}
	}

	&__tabs {
		display: flex;
		align-items: center;
		padding: 0.25rem;
		margin: 1.5rem auto;
		font-weight: 600;
		background-color: hsla(var(--accent-hsl) / 0.15);
		color: var(--c-accent);
		border-radius: 50vw;

		button {
			flex: 1;
			flex-wrap: wrap;
			padding: calc(var(--p-btn) * 0.65);
			font-weight: bold;
			font-family: var(--fontFamily), var(--fontFamilyDefault);
			font-size: 0.8em;
			text-align: center;
			background: none;
			color: var(--c-accent);
			border-radius: inherit;
			cursor: pointer;
			transition: background-color 0.15s ease-out, color 0.15s ease-out, transform 0.1s ease-out;
			user-select: none;

			&:hover:not(.active) {
				background-color: hsla(var(--accent-hsl) / 0.08);
			}

			&:active {
				transform: scale(0.98);
			}

			&.active {
				background-color: var(--c-accent);
				color: var(--c-on-accent);
			}
		}
	}

	&__body {
		&,
		.tab-content-wrapper,
		.tab-content {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
