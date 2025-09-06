<script setup>
import Header from './components/Header.vue'
import PopupImage from './components/PopupImage.vue'
</script>

<template>
	<div class="popup">
		<PopupImage />
		<Header />
	</div>
</template>

<style lang="scss" scoped>
.popup {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
