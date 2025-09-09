<template>
	<div class="colorpicker">
		<label :for="id">
			<input
				:id="id"
				type="color"
				:value="modelValue"
				@input="$emit('update:modelValue', $event.target.value)"
				@change="$emit('change', $event)"
				:aria-label="`Select ${label} ${subLabel} color`"
			/>
			<p>
				{{ label }} <span>{{ subLabel }}</span>
			</p>
		</label>
	</div>
</template>

<script setup>
defineProps({
	id: {
		type: String,
		required: true,
	},
	modelValue: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	subLabel: {
		type: String,
		required: true,
	},
})

defineEmits(['update:modelValue', 'change'])
</script>

<style lang="scss" scoped>
.colorpicker {
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
