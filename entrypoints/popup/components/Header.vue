<template>
	<header class="header">
		<code class="version">v3.0.0</code>
	</header>
</template>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: center;
	align-items: center;
}
.version {
	font-size: 1.5rem;
	padding: 0.25rem 0.5rem;
	border-radius: var(--br-btn);
	// background-color: var(--accent);
	background-color: color-mix(in oklab, var(--on-accent), transparent 80%) inset;
	color: var(--accent);
	font-weight: bold;
	// width: max-content;
	display: inline-flex;
	margin-top: 1rem;
	backdrop-filter: blur(20px);
	box-shadow: 0px 4px 8px 0px color-mix(in oklab, var(--accent), transparent 50%) inset;
}
</style>
