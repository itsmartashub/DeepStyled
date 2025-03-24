<!-- src/components/ButtonPrimary.vue -->
<template>
	<button :id="id" :class="className" :disabled="disabled" @click="$emit('click', $event)">
		<slot></slot>
	</button>
</template>

<script setup>
const props = defineProps({
	id: String,
	className: { type: String, default: 'ds-button ds-button--primary' },
	disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['click'])
</script>
