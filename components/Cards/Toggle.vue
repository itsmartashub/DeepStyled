<template>
	<label
		class="dsx-toggle-card"
		:for="computedId"
		:class="{
			'is-checked': modelValue,
			'is-disabled': disabled,
			'is-loading': loading,
		}"
	>
		<div class="dsx-toggle-card__icon" aria-hidden="true">
			<component :is="iconComponent" v-if="iconComponent" />
			<span v-else>{{ icon }}</span>
		</div>

		<div class="dsx-toggle-card__content">
			<h3 class="title">{{ title }}</h3>
			<p class="subtitle" v-if="subtitle" :id="`${computedId}-desc`" v-html="subtitle"></p>
		</div>

		<div class="dsx-toggle-card__toggle" role="switch" :aria-checked="modelValue">
			<input
				ref="inputRef"
				type="checkbox"
				:id="computedId"
				:checked="modelValue"
				@change="handleChange"
				:disabled="disabled || loading"
				:aria-describedby="subtitle ? `${computedId}-desc` : undefined"
				@focus="isFocused = true"
				@blur="isFocused = false"
			/>
			<span class="toggle-thumb" :class="{ 'is-focused': isFocused }" aria-hidden="true"></span>
			<!-- :checked="model" -->
			<!-- @change="model = $event.target.checked" -->
			<!-- @change="handleChange" -->
		</div>

		<div class="dsx-tooltip" v-if="tooltip" v-html="tooltip"></div>
	</label>
</template>

<script setup>
import { computed, ref, useId } from 'vue'

const props = defineProps({
	modelValue: { type: Boolean, default: false },
	id: { type: String, default: '' },
	title: { type: String, required: true },
	subtitle: { type: String, default: '' },
	tooltip: { type: String, default: '' },
	icon: { type: String, default: '' },
	iconComponent: { type: [Object, String], default: null },
	disabled: { type: Boolean, default: false },
	loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isFocused = ref(false)
const inputRef = ref(null)
const generatedId = useId()
const computedId = computed(() => props.id || generatedId)
// 💥 auto-defines `modelValue` prop and emits `update:modelValue`
// const model = defineModel()

const handleChange = (event) => {
	const newValue = event.target.checked
	emit('update:modelValue', newValue)
	emit('change', newValue)
}

defineExpose({
	focus: () => inputRef.value?.focus(),
	blur: () => inputRef.value?.blur(),
})

console.log('props.modelValue: ', props.modelValue)
</script>

<style lang="scss" scoped>
.dsx-toggle-card {
	--card-gap: 0.725rem;
	--card-padding: 0.725rem;
	--card-border-radius: calc(var(--br-btn) * 1.5);

	--icon-size: 2.75rem;

	--toggle-width: 3rem;
	--toggle-height: 1.75rem;
	--toggle-padding: 0.165rem;
	--toggle-thumb-size: calc(var(--toggle-height) - 2 * var(--toggle-padding));
	--toggle-bg: hsl(var(--accent-hsl) / 0.3);
	--toggle-thumb-bg: var(--c-accent);

	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1rem;
	gap: var(--card-gap);
	padding: var(--card-padding);
	background-color: hsl(var(--accent-hsl) / 0.1);
	border: 1px solid transparent;
	border-radius: var(--card-border-radius);
	cursor: pointer;
	user-select: none;
	transition: transform $duration $easeInOutQuad;

	&:hover:not(.is-disabled) {
		border-color: hsl(var(--accent-hsl) / 0.1);
		transform: scale(0.98);

		.dsx-tooltip {
			opacity: 1 !important;
			transform: translate(-50%, -105%) !important;
		}
	}

	&:active:not(.is-disabled) {
		transform: scale(1.02);
	}

	// &:focus-within {
	// 	outline: 2px solid var(--c-accent);
	// 	outline-offset: 2px;
	// }

	// &.is-checked {
	// 	background-color: hsl(var(--accent-hsl) / 0.15);
	// 	border-color: hsl(var(--accent-hsl) / 0.3);
	// }

	&.is-disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	&.is-loading {
		cursor: wait;
	}

	&__icon {
		position: relative;
		display: grid;
		place-items: center;
		width: var(--icon-size);
		height: var(--icon-size);
		flex-shrink: 0;
		background-color: hsl(var(--accent-hsl) / 0.12);
		color: var(--c-accent);
		border-radius: var(--br-btn);
		transition: transform $duration $easeInOutBack;

		@include dev('sm') {
			display: none;
		}

		span {
			display: grid;
			place-items: center;
		}

		svg,
		span {
			font-size: calc(var(--icon-size) * 0.7);
			width: calc(var(--icon-size) * 0.7);
			height: calc(var(--icon-size) * 0.7);
		}
	}

	&__content {
		min-width: 0;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.325em;

		.title {
			color: var(--c-accent);
			margin: 0;
			font-size: 0.825em;
			font-weight: bold;
			line-height: 1;
			text-transform: uppercase;
			// overflow: hidden;
			// text-overflow: ellipsis;
			// white-space: nowrap;
		}

		.subtitle {
			margin: 0;
			font-size: 0.75em;
			line-height: 1.1;
			// display: -webkit-box;
			// -webkit-box-orient: vertical;
			// -webkit-line-clamp: 2;
			// overflow: hidden;
		}
	}

	&__toggle {
		position: relative;
		display: inline-block;
		width: var(--toggle-width);
		height: var(--toggle-height);
		flex-shrink: 0;
		background-color: var(--toggle-bg);
		border-radius: 50vw;
		transition: background-color $duration $easeInOutQuad;

		input {
			position: absolute;
			opacity: 0;
			width: 100%;
			height: 100%;
			margin: 0;
			cursor: pointer;
			z-index: 1;
			// background-color: red;

			&:disabled {
				cursor: not-allowed;
			}
		}

		.toggle-thumb {
			position: absolute;
			inset: 0;
			background-color: var(--toggle-thumb-bg);
			border-radius: var(--toggle-width);
			top: var(--toggle-padding);
			left: var(--toggle-padding);
			width: var(--toggle-thumb-size);
			height: var(--toggle-thumb-size);
			transition: transform $duration $easeInOutBack, background-color $duration $easeInOutQuad;
		}
	}

	&.is-checked {
		--toggle-bg: var(--c-accent);
		--toggle-thumb-bg: var(--c-on-accent);

		.toggle-thumb {
			transform: translateX(calc(var(--toggle-width) - var(--toggle-thumb-size) - 2 * var(--toggle-padding)));
		}
	}
}

.dsx-tooltip {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	padding: 1rem;
	font-size: 0.85em;
	line-height: 1.2;
	// background: hsl(var(--accent-hsl) / 0.8);
	// color: var(--c-on-accent);
	background-color: var(--c-accent-hover);
	color: var(--c-txti);
	backdrop-filter: blur(1.725rem);
	border-radius: var(--br-btn);
	z-index: 1;
	pointer-events: none !important;
	opacity: 0;
	transition: opacity 0.2s linear, transform 0.2s $easeInOutQuad;

	strong {
		font-weight: bold;
	}
}
</style>
