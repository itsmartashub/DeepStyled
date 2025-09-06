<script setup>
import PopupImage from './components/PopupImage.vue'
import Header from './components/Header.vue'
import Recommendation from './components/Recommendation.vue'
</script>

<template>
	<div class="popup">
		<PopupImage />
		<Header />
		<Recommendation />
	</div>
</template>

<style lang="scss" scoped>
.popup {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
