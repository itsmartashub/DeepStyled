<script setup>
import dsHeaderImg from '@/assets/img/ds-header-lg.webp'
</script>
<template>
	<img class="image-bg" :src="dsHeaderImg" />
</template>

<style lang="scss" scoped>
.image-bg {
	position: absolute;
	inset: 0;
	z-index: -1;
	width: 100%;
	height: 20rem;
	object-fit: cover;
	object-position: center;
	display: block;
}
</style>
