<template>
	<article :class="[className, 'card', 'card--range']" :data-gpth-err="`${min}${unit} ⇔ ${max}${unit}`">
		<label :for="inputId">
			<div class="card--range__metadata">
				<p class="card--range__output">
					{{ computedDisplay }}
				</p>
				<div class="card--range__unitname">
					<p class="card--range__unit">{{ unit }}</p>
					<p class="card--range__name">{{ name }}</p>
				</div>
			</div>

			<input
				class="card--range__slider"
				:type="inputType"
				:id="inputId"
				:value="inputValue"
				:placeholder="inputPlaceholder"
				:min="min"
				:max="max"
				@input="onInput"
				@blur="$emit('blur', $event)"
				@keyup.enter="$emit('keyup.enter', $event)"
			/>
		</label>
	</article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	name: String,
	className: String,
	inputId: String,
	inputType: { type: String, default: 'text' },
	modelValue: [String, Number],
	displayValue: {
		type: [String, Number],
		default: null,
	},
	inputPlaceholder: [String, Number],
	min: { type: Number, default: null },
	max: { type: Number, default: null },
	unit: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'blur', 'keyup.enter'])

const onInput = (event) => {
	const value = event.target.value
	if (props.inputType === 'number' || props.inputType === 'range') {
		const parsedValue = parseFloat(value)
		if (!isNaN(parsedValue)) {
			emit('update:modelValue', parsedValue)
		} else {
			console.warn('Invalid number input')
		}
	} else {
		emit('update:modelValue', value)
	}
}

// Instead of directly showing modelValue, we display displayValue if provided.
const computedDisplay = computed(() => {
	// If displayValue is given (i.e. actual output), use that.
	// Otherwise, fall back to modelValue.
	return props.displayValue !== null ? props.displayValue : props.modelValue
})

const inputValue = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	},
})
</script>
