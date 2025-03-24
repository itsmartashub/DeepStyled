<template>
	<article :class="[className, 'card']" :data-gpth-err="`${min}${unit} ⇔ ${max}${unit}`">
		<label :for="inputId" class="rounded-full flex items-center gap-2 h-full w-full">
			<!-- <p>{{ computedDisplay }}</p> -->
			<div class="card__unitname-wrapper">
				<p class="card__unit rounded-full flex items-center justify-center">{{ unit }}</p>
				<p class="card__name uppercase font-semibold">{{ name }}</p>
			</div>

			<input
				:type="inputType"
				:id="inputId"
				:value="inputValue"
				:placeholder="inputPlaceholder"
				class="rounded-full outline-none border-none font-bold"
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
// const computedDisplay = computed(() => {
// 	// If displayValue is given (i.e. actual output), use that.
// 	// Otherwise, fall back to modelValue.
// 	return props.displayValue !== null ? props.displayValue : props.modelValue
// })

const inputValue = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	},
})
</script>
