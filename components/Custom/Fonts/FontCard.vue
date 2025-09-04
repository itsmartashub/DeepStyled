<template>
	<article
		:class="[className, 'fonts__group', 'card', cardSizeClass]"
		:data-gpth-err="`${min}${unit} &hArr; ${max}${unit}`"
	>
		<label :for="inputId" class="grid gap-1 h-full w-full">
			<div class="card--big__unitname">
				<p class="card--big__unit">{{ icon }}</p>
				<p class="card--big__name">{{ name }}</p>
			</div>
			<!-- Render either an input or select -->
			<component
				:is="componentType"
				:id="inputId"
				:value="innerValue"
				:placeholder="inputPlaceholder"
				v-bind="inputAttrs"
				class="outline-none border-none focus:outline-none focus:border-none font-bold"
				@input="updateValue"
				@change="updateValue"
				@blur="handleBlur"
				@keyup.enter="handleEnter"
			>
				<!-- For a select, populate its options -->
				<template v-if="isSelect">
					<option v-for="opt in options" :key="opt.value" :value="opt.value">
						{{ opt.label }}
					</option>
				</template>
			</component>
		</label>
	</article>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
	name: { type: String, required: true },
	icon: { type: String, default: 'PX' },
	className: { type: String, default: '' },
	inputId: { type: String, required: true },
	inputType: { type: String, default: 'number' },
	inputPlaceholder: { type: [String, Number], default: '' },
	modelValue: { type: [String, Number], default: '' },
	min: { type: Number, default: 0 },
	max: { type: Number, default: 20 },
	unit: { type: String, default: 'px' },
	cardSizeClass: { type: String, default: 'card--big' },
	// When true, this component renders a <select> instead of an <input>
	isSelect: { type: Boolean, default: false },
	// Options to be used when isSelect is true (array of { value, label })
	options: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue', 'blur', 'keyup.enter'])

const innerValue = ref(props.modelValue)
watch(
	() => props.modelValue,
	(newVal) => {
		innerValue.value = newVal
	}
)
watch(innerValue, (newVal) => {
	emit('update:modelValue', newVal)
})

// Determine which element to render: 'select' if isSelect, otherwise 'input'
const componentType = computed(() => (props.isSelect ? 'select' : 'input'))

// For input elements, pass type, min, and max attributes; not needed for select.
const inputAttrs = computed(() => {
	return props.isSelect ? {} : { type: props.inputType, min: props.min, max: props.max }
})

function updateValue(e) {
	const newValue = e && e.target ? e.target.value : e
	innerValue.value = newValue
	emit('update:modelValue', newValue)
}

function handleBlur(e) {
	emit('blur', e)
}

function handleEnter(e) {
	emit('keyup.enter', e)
}
</script>
