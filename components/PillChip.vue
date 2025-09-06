<template>
	<component
		:is="componentType"
		:href="href || undefined"
		:target="href ? '_blank' : undefined"
		:title="href ? text : undefined"
		:rel="href ? 'noopener noreferrer' : undefined"
		:to="to || undefined"
		class="pill-chip"
		:style="chipStyles"
		@click="handleClick"
		v-bind="componentProps"
	>
		<div v-if="icon" class="pill-chip__icon">
			<component :is="icon" class="pill-chip__svg" />
		</div>

		<span v-if="text" class="pill-chip__text">
			{{ text }}
		</span>
	</component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	text: {
		type: String,
		default: '',
	},
	icon: {
		type: [Object, Function],
		default: null,
	},
	chipBg: {
		type: String,
		default: 'var(--c-on-accent, var(--accent))',
	},
	chipText: {
		type: String,
		default: 'var(--c-accent, var(--on-accent))',
	},
	href: {
		type: String,
		default: '',
	},
	to: {
		type: [String, Object],
		default: '',
	},
	onClick: {
		type: Function,
		default: null,
	},
})

const emit = defineEmits(['click'])

const componentType = computed(() => {
	if (props.href) return 'a'
	if (props.to) return 'router-link'
	return 'button'
})

const componentProps = computed(() => ({
	type: componentType.value === 'button' ? 'button' : undefined,
}))

const chipStyles = computed(() => ({
	'--chip-bg': props.chipBg,
	'--chip-text': props.chipText,
	'--icon-bg': props.chipText,
	'--icon-color': props.chipBg,
}))

const handleClick = (event) => {
	if (props.onClick) {
		props.onClick(event)
	}
	emit('click', event)
}
</script>

<style lang="scss" scoped>
.pill-chip {
	display: inline-flex;
	align-items: center;
	gap: 0.375em;
	padding: 0.2em;
	font-size: var(--pillchip-font-size);
	font-weight: 500;
	font-family: inherit;
	text-decoration: none;
	background-color: var(--chip-bg);
	color: var(--chip-text);
	backdrop-filter: blur(1rem);
	border: color-mix(in oklab, currentColor, transparent 85%) 2px solid;
	border-radius: 50vw;
	outline: none;
	cursor: pointer;
	transition: all 0.25s ease;

	--icon-size: 1.8em;

	&__icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: var(--icon-size);
		height: var(--icon-size);
		background-color: var(--icon-bg);
		border-radius: 50vw;
		transition: all 0.25s ease;
	}

	&__svg {
		width: calc(var(--icon-size) * 0.75);
		height: calc(var(--icon-size) * 0.75);
		color: var(--icon-color);
		transition: all 0.25s ease;
	}

	&__text {
		font-weight: bold;
		white-space: nowrap;
		line-height: 1;
		transition: all 0.25s ease;
	}

	// Hover states - invert colors
	&:hover {
		background-color: var(--chip-text);
		color: var(--chip-bg);
		transform: scale(0.95);

		.pill-chip__icon {
			background-color: var(--icon-color);
		}

		.pill-chip__svg {
			color: var(--icon-bg);
		}
	}

	&:active {
		transform: scale(1);
	}

	&:focus-visible {
		outline: 2px solid var(--chip-text);
		outline-offset: 2px;
	}
}
</style>
