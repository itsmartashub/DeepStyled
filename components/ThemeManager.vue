<template>
	<div class="theme-manager">
		<div class="theme-manager__roller">
			<IconRoller />
		</div>

		<div class="theme-manager__buttons">
			<button
				v-for="t in THEME_OPTIONS"
				:key="t.id"
				:id="t.id"
				:data-ds-btn-metadata="t.id"
				@click="changeTheme(t.id)"
				:data-active="effectiveActiveTheme === t.id"
			>
				<component :is="t.icon" />
			</button>
			<button @click.stop="openSettings" data-ds-btn-metadata="more"><IconSettings /></button>
		</div>
	</div>
	<Transition name="slideX">
		<CustomizationSettings v-show="settingsOpen" @close="closeSettings" />
	</Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeManager } from '@/composables/useThemeManager'
import { THEMES } from '@/utils/storage'
import CustomizationSettings from '@/components/CustomizationSettings.vue'
import IconSettings from '@/components/Icons/IconSettings.vue'
import IconRoller from '@/components/Icons/IconRoller.vue'
import IconSun from '@/components/Icons/IconSun.vue'
import IconMoon from '@/components/Icons/IconMoon.vue'
import IconMoonFull from '@/components/Icons/IconMoonFull.vue'

const { effectiveActiveTheme, changeTheme } = useThemeManager()

const settingsOpen = ref(false)

const openSettings = () => (settingsOpen.value = true)

const closeSettings = () => (settingsOpen.value = false)

const THEME_OPTIONS = [
	{ id: THEMES.LIGHT, icon: IconSun },
	{ id: THEMES.DARK, icon: IconMoon },
	{ id: THEMES.OLED, icon: IconMoonFull },
]

// Alias effectiveTheme for template clarity.
// const effectiveActiveTheme = computed(() => effectiveTheme.value)
</script>

<style scoped lang="scss">
.theme-manager {
	position: fixed;
	top: var(--roller-top);
	right: var(--roller-right);
	display: grid;
	place-items: center;
	gap: 0.5rem;
	color: var(--c-accent);
	z-index: 5;

	&:hover {
		.theme-manager__buttons {
			opacity: 1 !important;
			pointer-events: all !important;
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) !important;

			button {
				transform: scale(1) !important;
			}
		}
	}

	&__roller {
		aspect-ratio: 1 / 1;
		display: grid;
		place-items: center;
		width: var(--roller-size);
		height: var(--roller-size);
		background-image: var(--c-bg-gradient);
		border: 1px solid hsla(var(--accent-hsl) / 0.2);
		border-radius: 50vw;
		backdrop-filter: blur(1rem);
		cursor: pointer;
		transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

		&:hover {
			background-image: none !important;
			background-color: var(--c-accent);
			color: var(--c-on-accent);
		}
	}

	&__buttons {
		display: grid;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		width: var(--roller-size);

		padding: 0.2rem;
		background-image: var(--c-bg-gradient);
		backdrop-filter: blur(1rem);
		border: 1px solid hsla(var(--accent-hsl) / 0.2);
		border-radius: 20vw;
		opacity: 0;
		pointer-events: none;
		clip-path: polygon(0 0, 100% 0, 100% 0, 0% 0);
		transition: clip-path 0.3s ease, opacity 0.3s ease-in-out;

		button {
			position: relative;
			aspect-ratio: 1 / 1;
			cursor: pointer;
			font-family: var(--fontFamily), var(--fontFamilyDefault);
			line-height: 1;
			background-color: transparent;
			color: currentColor;
			border-radius: 50vw;
			transform: scale(0);
			transition: transform 0.3s linear;

			&::after {
				content: attr(data-ds-btn-metadata);
				position: absolute;
				top: 50%;
				left: 50%;
				width: max-content;
				font-size: 0.7rem;
				text-transform: uppercase;
				font-weight: 700;
				padding: 6px;
				border-radius: 5px;
				background-color: var(--c-accent);
				color: var(--c-on-accent);
				border-radius: 50vw;
				opacity: 0;
				transform: translate(-50%, 0%) scale(0);
				transition: transform 0.3s ease, opacity 0.4s linear;
			}

			&:hover {
				color: transparent;

				&::after {
					opacity: 1;
					transform: translate(-50%, -50%) scale(1);
				}
			}
		}
	}
}
// button[data-active='true'] {
// 	background: var(--c-accent);
// 	color: var(--c-on-accent);
// }
</style>
