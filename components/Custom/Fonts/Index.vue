<!-- src/components/FontChanger.vue -->
<template>
	<section class="section-fonts fonts">
		<div class="section-cards">
			<!-- <div class="fonts__bigcards-wrapper"> -->
			<!-- Font Family Selector Card using FontCard -->
			<FontCard
				className="fonts__family"
				inputId="fontFamily"
				isSelect
				:options="fontFamilyOptions"
				icon="T"
				name="FONT FAMILY"
				v-model="localFontFamily"
				@change="handleFontFamilyChange"
			/>

			<!-- Font Size Card using FontCard (renders an input by default) -->
			<FontCard
				className="fonts__size"
				inputId="fontSize"
				:inputType="fontSizeData.inputType"
				:inputPlaceholder="fontSizeData.inputPlaceholder"
				:min="fontSizeData.min"
				:max="fontSizeData.max"
				unit="px"
				icon="PX"
				name="Font Size"
				v-model="localFontSize"
				@blur="handleFontSizeBlur"
				@keyup.enter="handleFontSizeBlur"
			/>
			<!-- </div> -->
			<!-- <div class="fonts__smallcards-wrapper"> -->
			<!-- The small cards can remain as they were, or be refactored similarly -->
			<FontSmallCard
				:name="lineHeightData.name"
				:class-name="lineHeightData.className"
				:input-id="lineHeightData.inputId"
				:input-type="lineHeightData.inputType"
				v-model="localLineHeight"
				:input-placeholder="lineHeightData.inputPlaceholder"
				:min="lineHeightData.min"
				:max="lineHeightData.max"
				unit="px"
				@blur="handleLineHeightBlur"
				@keyup.enter="handleLineHeightBlur"
			/>
			<FontSmallCard
				:name="letterSpacingData.name"
				:class-name="letterSpacingData.className"
				:input-id="letterSpacingData.inputId"
				:input-type="letterSpacingData.inputType"
				v-model="localLetterSpacing"
				:input-placeholder="letterSpacingData.inputPlaceholder"
				:min="letterSpacingData.min"
				:max="letterSpacingData.max"
				unit="px"
				@blur="handleLetterSpacingBlur"
				@keyup.enter="handleLetterSpacingBlur"
			/>
			<!-- </div> -->
		</div>
		<footer class="section-footer">
			<ButtonPrimary id="resetFont" @click="resetFonts">Reset Fonts</ButtonPrimary>
		</footer>
		<div v-if="errorMessage" class="gpth-error-msg fixed rounded-xl bg-red-500 red-500 p-3 font-semibold text-center">
			{{ errorMessage }}
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import FontCard from './FontCard.vue'
import FontSmallCard from './FontSmallCard.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import { useFontSettings } from '@/composables/useFontSettings'

const defaults = {
	fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--fontFamilyDefault').trim(),
	fontSize: 16,
	letterSpacing: 0,
	lineHeight: 28,
}

const fontFamilyOptions = [
	{ value: defaults.fontFamily, label: 'Default' },
	{ value: 'Inter', label: 'Inter' },
	{ value: 'Roboto', label: 'Roboto' },
	{ value: 'Roboto Mono', label: 'Roboto Mono' },
	{ value: 'DM Sans', label: 'DM Sans' },
	{ value: 'Reddit Mono', label: 'Reddit Mono' },
	{ value: 'Poppins', label: 'Poppins' },
	{ value: 'Noto Sans', label: 'Noto Sans' },
	{ value: 'Lato', label: 'Lato' },
	{ value: 'Quicksand', label: 'Quicksand' },
	{ value: 'Outfit', label: 'Outfit' },
]

const fontSizeData = {
	name: 'Font Size',
	className: 'fonts__size',
	inputId: 'fontSize',
	inputType: 'number',
	inputPlaceholder: defaults.fontSize,
	min: 12,
	max: 24,
}

const lineHeightData = {
	name: 'Line Height',
	className: 'fonts__lineHeight',
	inputId: 'lineHeight',
	inputType: 'number',
	inputPlaceholder: defaults.lineHeight,
	min: 12,
	max: 60,
}

const letterSpacingData = {
	name: 'Letter Space',
	className: 'fonts__letterSpacing',
	inputId: 'letterSpacing',
	inputType: 'number',
	inputPlaceholder: defaults.letterSpacing,
	min: -30,
	max: 30,
}

const {
	fontFamily,
	fontSize,
	lineHeight,
	letterSpacing,
	errorMessage,
	setFontFamily,
	setFontSize,
	setLineHeight,
	setLetterSpacing,
	resetAllFonts,
	loadStoredSettings,
} = useFontSettings(defaults)

const localFontFamily = ref(fontFamily.value)
const localFontSize = ref(fontSize.value)
const localLineHeight = ref(lineHeight.value)
const localLetterSpacing = ref(letterSpacing.value)

onMounted(() => {
	loadStoredSettings()
	// console.log(localFontFamily, localFontSize)
})

watch(fontFamily, (val) => (localFontFamily.value = val))
watch(fontSize, (val) => (localFontSize.value = val))
watch(lineHeight, (val) => (localLineHeight.value = val))
watch(letterSpacing, (val) => (localLetterSpacing.value = val))

function handleFontFamilyChange(e) {
	setFontFamily(e.target.value)
}

function handleFontSizeBlur(e) {
	setFontSize(e.target.value)
}

function handleLineHeightBlur(e) {
	setLineHeight(e.target.value)
}

function handleLetterSpacingBlur(e) {
	setLetterSpacing(e.target.value)
}

function resetFonts() {
	resetAllFonts()
}
</script>
<!-- <style lang="scss" scoped>
.fonts {
	&__bigcards-wrapper,
	&__smallcards-wrapper {
		--gap: 0.65rem;

		display: grid;
		grid-template-columns: var(--cards-grid-template);
		gap: var(--gap);
	}
}
</style> -->
