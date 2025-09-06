<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import dsHeaderImg from '@/assets/img/ds-header-lg.webp'
</script>

<template>
	<div class="popup">
		<img class="popup__bg" :src="dsHeaderImg" />
		<Header />

		<Footer />
	</div>
</template>

<style lang="scss" scoped>
.popup {
	// padding: 2rem;
	position: relative;
	width: 100%;
	height: 100dvh;
	display: grid;
	align-content: space-between;
	justify-content: center;

	/* background-image: url('@/assets/img/ds-header-lg.png'); */
	/* background-image: url(dsHeaderImg) no-repeat center fixed; */
	/* background-size: cover; */

	&__bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		width: 100%;
		height: 20rem;
		object-fit: cover;
		object-position: center;
		display: block;
	}
}
</style>
