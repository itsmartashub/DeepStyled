<template>
	<section class="section-widths widths">
		<div class="section-cards">
			<SliderCard
				:name="chatsWidthData.name"
				:class-name="chatsWidthData.className"
				:input-id="chatsWidthData.inputId"
				:input-type="chatsWidthData.inputType"
				v-model.number="chatSliderDisplay"
				:input-placeholder="chatsWidthData.inputPlaceholder"
				:min="chatWidthMin"
				:max="chatWidthMax"
				:unit="chatWidthUnit"
				:display-value="chatWidthValue"
				@blur="saveChatWidth"
				@update:modelValue="updateChatWidth"
			/>
			<SliderCard
				:name="textareaWidthData.name"
				:class-name="textareaWidthData.className"
				:input-id="textareaWidthData.inputId"
				:input-type="textareaWidthData.inputType"
				v-model.number="textareaSliderDisplay"
				:input-placeholder="textareaWidthData.inputPlaceholder"
				:min="textareaWidthMin"
				:max="textareaWidthMax"
				:unit="textareaWidthUnit"
				:display-value="textareaWidthValue"
				@blur="saveTextareaWidth"
				@update:modelValue="updateTextareaWidth"
			/>
		</div>

		<LayoutsToggles />

		<footer class="section-footer">
			<ButtonPrimary id="resetWidths" @click="resetWidths">Reset Widths</ButtonPrimary>
		</footer>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { maxWidthChatsItem, maxWidthTextareaItem, DEFAULT_MAX_WIDTH } from '@/utils/storage'

import LayoutsToggles from '@/components/Layouts/Toggles.vue'
import SliderCard from '@/components/Cards/SliderCard.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'

// Default actual width in pixels
const defaultWidthPx = DEFAULT_MAX_WIDTH
// Fake slider thumb position for display in pixel mode
const fakeSliderValue = 65

const chatsWidthData = {
	name: 'Width Chats',
	className: 'card--range',
	inputId: 'maxWidthChats',
	inputType: 'range',
	inputPlaceholder: DEFAULT_MAX_WIDTH.toString(),
	cssVar: 'maxWidthChats',
}

const textareaWidthData = {
	name: 'Width Prompt',
	className: 'card--range',
	inputId: 'maxWidthTextarea',
	inputType: 'range',
	inputPlaceholder: DEFAULT_MAX_WIDTH.toString(),
	cssVar: 'maxWidthTextarea',
	isSync: false,
}

// Slider limits (always 0–100). Use refs if you want reactivity.
const chatWidthMin = ref(0)
const chatWidthMax = ref(100)
const textareaWidthMin = ref(0)
const textareaWidthMax = ref(100)

// These are the actual output values and their unit.
const chatWidthUnit = ref('px')
const textareaWidthUnit = ref('px')
const chatWidthValue = ref(defaultWidthPx)
const textareaWidthValue = ref(defaultWidthPx)

// This is the slider's thumb value (what the slider control uses).
// In pixel mode, we "fake" it to be fakeSliderValue.
const chatSliderDisplay = ref(fakeSliderValue)
const textareaSliderDisplay = ref(fakeSliderValue)

// Helper: update the CSS variable on document root.
const updateCssVariable = (key, value, unit) => {
	document.documentElement.style.setProperty(`--${key}`, `${value}${unit}`)
}

onMounted(async () => {
	// Load stored values.
	const storedChatWidth = await maxWidthChatsItem.getValue()
	const storedTextareaWidth = await maxWidthTextareaItem.getValue()

	chatWidthValue.value = storedChatWidth.value
	chatWidthUnit.value = storedChatWidth.unit

	textareaWidthValue.value = storedTextareaWidth.value
	textareaWidthUnit.value = storedTextareaWidth.unit

	// If stored as '%', use the stored slider value; otherwise, fake the slider thumb.
	if (chatWidthUnit.value === '%') {
		chatSliderDisplay.value = chatWidthValue.value
	} else {
		chatSliderDisplay.value = fakeSliderValue
	}

	if (textareaWidthUnit.value === '%') {
		textareaSliderDisplay.value = textareaWidthValue.value
	} else {
		textareaSliderDisplay.value = fakeSliderValue
	}

	// Set initial CSS variables.
	updateCssVariable(chatsWidthData.cssVar, chatWidthValue.value, chatWidthUnit.value)
	updateCssVariable(textareaWidthData.cssVar, textareaWidthValue.value, textareaWidthUnit.value)
})

// Update chat width when slider is moved.
const updateChatWidth = (newValue) => {
	if (chatWidthUnit.value === 'px') {
		// In pixel mode: if user drags away from the fake thumb position, switch mode.
		if (newValue !== fakeSliderValue) {
			chatWidthUnit.value = '%'
			chatWidthValue.value = newValue
			chatSliderDisplay.value = newValue
			updateCssVariable(chatsWidthData.cssVar, newValue, '%')
		} else {
			// Otherwise, do nothing – keep displaying fake value while actual value remains 800.
			chatSliderDisplay.value = fakeSliderValue
		}
	} else {
		chatWidthValue.value = newValue
		chatSliderDisplay.value = newValue
		updateCssVariable(chatsWidthData.cssVar, newValue, '%')
	}
}

// Similarly update textarea width.
const updateTextareaWidth = (newValue) => {
	if (textareaWidthUnit.value === 'px') {
		if (newValue !== fakeSliderValue) {
			textareaWidthUnit.value = '%'
			textareaWidthValue.value = newValue
			textareaSliderDisplay.value = newValue
			updateCssVariable(textareaWidthData.cssVar, newValue, '%')
		} else {
			textareaSliderDisplay.value = fakeSliderValue
		}
	} else {
		textareaWidthValue.value = newValue
		textareaSliderDisplay.value = newValue
		updateCssVariable(textareaWidthData.cssVar, newValue, '%')
	}
}

const saveChatWidth = async () => {
	await maxWidthChatsItem.setValue({ value: chatWidthValue.value, unit: chatWidthUnit.value })
}

const saveTextareaWidth = async () => {
	await maxWidthTextareaItem.setValue({ value: textareaWidthValue.value, unit: textareaWidthUnit.value })
}

const resetWidths = async () => {
	// Reset to pixel mode with default actual value and fake slider thumb.
	chatWidthUnit.value = 'px'
	chatWidthValue.value = defaultWidthPx
	chatSliderDisplay.value = fakeSliderValue

	textareaWidthUnit.value = 'px'
	textareaWidthValue.value = defaultWidthPx
	textareaSliderDisplay.value = fakeSliderValue

	updateCssVariable(chatsWidthData.cssVar, defaultWidthPx, 'px')
	updateCssVariable(textareaWidthData.cssVar, defaultWidthPx, 'px')

	await maxWidthChatsItem.setValue({ value: defaultWidthPx, unit: 'px' })
	await maxWidthTextareaItem.setValue({ value: defaultWidthPx, unit: 'px' })
}
</script>
