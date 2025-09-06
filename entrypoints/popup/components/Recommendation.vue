<script setup>
import { ref } from 'vue'
import PillChip from '@/components/PillChip.vue'
import IconGithub from '@/components/Icons/Github.vue'
import IconFirefox from '@/components/Icons/Firefox.vue'
import IconChrome from '@/components/Icons/Chrome.vue'

const extLinks = [
	{
		name: 'Github',
		url: 'https://github.com/itsmartashub/GPThemes',
		icon: IconGithub,
	},
	{
		name: 'Chrome',
		url: 'https://chromewebstore.google.com/detail/gpthemes/bghdlfnkbghekhdadaokecnhkcodfcna',
		icon: IconChrome,
	},
	{
		name: 'Firefox',
		url: 'https://addons.mozilla.org/en-US/firefox/addon/gpthemes/',
		icon: IconFirefox,
	},
]
</script>

<template>
	<div class="recommendation">
		<p>
			Enjoying this? Try
			<a href="https://github.com/itsmartashub/GPThemes" target="_blank" rel="noopener noreferrer"
				><b>GPT<span>hemes</span></b></a
			>
			for ChatGPT
		</p>
		<ul class="recommendation__items">
			<li v-for="link in extLinks" :key="link.name" class="recommendation__item">
				<PillChip :icon="link.icon" chip-bg="var(--on-accent)" chip-text="var(--accent)" :href="link.url" />
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.recommendation {
	position: fixed;
	bottom: 0%;
	left: 50%;
	transform: translateX(-50%);
	width: max-content;
	background-color: color-mix(in oklab, var(--accent), transparent 90%);
	backdrop-filter: blur(0.65rem) saturate(1.12);
	border-radius: var(--br);
	padding: 0.8rem;
	display: flex;
	flex-direction: column;
	gap: 0.65rem;
	margin-bottom: 0.5rem;
	box-shadow: 0 0 1px 1px color-mix(in oklab, var(--accent), transparent 90%) inset;
	z-index: -1;
	// text-shadow: 0 0 8px color-mix(in oklab, var(--accent), black 60%);

	p {
		b {
			padding: 0.25rem 0.5rem;
			font-weight: bold;
			background-color: color-mix(in oklab, var(--accent), transparent 90%);
			border-radius: 0.5rem;
			box-shadow: 0 0 1px 1px color-mix(in oklab, var(--accent), transparent 90%) inset;
			transition: all 0.2s ease;

			span {
				font-weight: 400;
			}
		}

		a {
			&:hover {
				b {
					background-color: var(--accent);
					color: var(--on-accent);
				}
			}
		}
	}

	&__items {
		--pillchip-font-size: 0.75rem;
		padding: 0.1rem;
		align-self: center;
		display: flex;
		gap: 0.5rem;
		font-size: 0.825em;
		// z-index: 10;
		// translate: 0 50%;
		border-radius: 50vw;
		// background-color: color-mix(in oklab, var(--accent), transparent 90%);
		// border: 2px solid color-mix(in oklab, var(--accent), transparent 90%);
		// backdrop-filter: blur(2rem);
	}
}
</style>
