<script setup>
console.log('popup')
</script>

<template>
	<div class="popup">
		<h1 class="logo">DeepStyled</h1>
		<button>TEST</button>
		<a href="https://vitejs.dev">vitejs</a>
	</div>
</template>

<style scoped>
.logo {
	color: red;
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}

button {
	background-color: red;
}
</style>
