<script setup>
import IconGithub from '@/components/Icons/Github.vue'
</script>
<template>
	<footer class="footer">
		<a href="https://github.com/itsmartashub/DeepStyled" target="_blank"> <IconGithub />Github </a>
	</footer>
</template>

<style lang="scss">
.footer {
	align-self: flex-end;
	margin-bottom: 0.25rem;

	a {
		display: flex;
		align-items: center;
		padding: 0.25rem;
		padding-right: 0.85rem;
		color: var(--accent);
		background-color: color-mix(in oklab, var(--accent), transparent 80%);
		border-radius: 50vw;
		gap: 0.5rem;
		backdrop-filter: blur(20px);
		text-transform: uppercase;
		font-weight: bold;
	}

	svg {
		border-radius: 50vw;
		background-color: var(--accent);
		color: var(--on-accent);
		padding: 0.25rem;
	}
}
</style>
