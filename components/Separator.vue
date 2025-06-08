<template>
	<div class="dsx-separator"></div>
</template>

<style lang="scss" scoped>
.dsx-separator {
	--separator-y-gap: 1.5rem;
	width: 80%;
	height: 1px;
	background-color: hsl(var(--accent-hsl) / 0.1);
	border: none;
	margin: var(--separator-y-gap) auto;

	@include dev('md') {
		--separator-y-gap: 0.925rem;
	}
}
</style>
