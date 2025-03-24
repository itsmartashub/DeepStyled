<!-- src/components/FontSmallCard.vue -->
<template>
	<article :class="[className, 'card', 'card--small']" :data-gpth-err="`${min}${unit} &hArr; ${max}${unit}`">
		<label :for="inputId">
			<input
				:type="inputType"
				:id="inputId"
				:value="modelValue"
				:placeholder="inputPlaceholder"
				:min="min"
				:max="max"
				@input="$emit('update:modelValue', $event.target.value)"
				@blur="$emit('blur', $event)"
				@keyup.enter="$emit('keyup.enter', $event)"
			/>
			<div class="card--small__unitname">
				<p class="card--small__unit">pixels</p>
				<p class="card--small__name uppercase font-semibold">{{ name }}</p>
			</div>
		</label>
	</article>
</template>

<script setup>
const props = defineProps({
	name: String,
	className: String,
	inputId: String,
	inputType: { type: String, default: 'number' },
	modelValue: [String, Number],
	inputPlaceholder: [String, Number],
	min: { type: Number, default: 0 },
	max: { type: Number, default: 20 },
	unit: { type: String, default: 'px' },
})
const emit = defineEmits(['update:modelValue', 'blur', 'keyup.enter'])
</script>

<style lang="scss">
.card--small {
	label,
	input {
		border-radius: 50vw !important;
	}

	label {
		--label-height: 2.5rem;
		--label-padding: 0.28rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		height: var(--label-height);
		padding: var(--label-padding);
		background-color: var(--c-surface-2);
		overflow: clip;
	}

	input {
		--input-size: calc(var(--label-height) - var(--label-padding));
		--tw-ring-color: transparent !important;
		// aspect-ratio: 1 / 1;
		// height: var(--input-size);
		// width: var(--input-size);
		aspect-ratio: 1 / 1;
		height: 100%;
		max-width: max-content;
		padding: 0 !important;
		font-size: 1em;
		text-align: center;
		background-color: hsla(var(--accent-hsl) / 0.2);
		color: var(--c-accent);
		outline: none !important;
		border: none !important;
		transform-origin: center center;
		transition: all 0.25s ease-in-out;

		// &:is(:focus, :focus-visible, :focus-within) {
		// 	transform: scaleX(1) translateX(10%);
		// 	font-size: 1.2em !important;
		// }
	}

	&__unitname {
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition: transform 0.25s ease-in-out;
	}

	&__unit,
	&__name {
		font-size: 0.58em;
	}

	&__unit {
		--px: 0.35rem;
		display: grid;
		place-items: center;
		width: max-content;
		font-size: 0.5em;
		padding: 0 var(--px);
		background-color: hsla(var(--accent-hsl) / 0.12);
		color: var(--c-accent);
		line-height: 1;
		border-radius: 1rem;
		translate: -0.15rem 0;
		// @include bg-accent-inverse;
	}

	&__name {
		margin-top: 0.35rem !important;
		font-weight: bold;
		text-transform: uppercase;
	}

	&:has(input:focus) {
		.card--small__unitname {
			display: none !important;
		}

		input {
			width: 100% !important;
			max-width: 100% !important;
			font-size: 1.2em !important;
			transform: unset !important;
			aspect-ratio: unset !important;
		}
	}

	&:hover {
		input {
			transform: scale(1.1);
		}

		.card--small__unitname {
			transform: translateX(3px);
		}
	}
}
</style>
