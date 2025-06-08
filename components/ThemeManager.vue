<template>
	<div class="theme-manager" :class="{ 'is-active': isActive }" @click="toggleActive" @mouseleave="isActive = false">
		<div class="theme-manager__roller">
			<IconRoller />
		</div>

		<div class="theme-manager__buttons">
			<button
				v-for="t in THEME_OPTIONS"
				:key="t.id"
				:id="t.id"
				:aria-label="`Set ${t.id} theme`"
				:data-ds-btn-metadata="t.id"
				@click.stop="changeTheme(t.id)"
			>
				<component :is="t.icon" />
			</button>
			<button @click.stop="openSettings" data-ds-btn-metadata="more" aria-label="Open theme settings">
				<IconSettings />
			</button>
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
const isActive = ref(false)

const toggleActive = () => {
	isActive.value = !isActive.value
}

const openSettings = () => {
	settingsOpen.value = true
	isActive.value = false
}

const closeSettings = () => (settingsOpen.value = false)

const THEME_OPTIONS = [
	{ id: THEMES.LIGHT, icon: IconSun },
	{ id: THEMES.DARK, icon: IconMoon },
	{ id: THEMES.OLED, icon: IconMoonFull },
]
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
	cursor: pointer;

	&.is-active {
		.theme-manager__buttons {
			opacity: 1;
			pointer-events: all;
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

			button {
				transform: scale(1);
				transition-delay: calc(0.1s * var(--i));
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
		transition: all 0.3s ease-in-out;

		&:hover {
			background-image: none;
			background-color: var(--c-accent);
			color: var(--c-on-accent);
			transform: scale(1.1);
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
		transition: all 0.3s ease;

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
			transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);

			// &[data-active='true'] {
			// 	background-color: hsla(var(--accent-hsl) / 0.2);
			// 	color: var(--c-accent);
			// }

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
				background-color: var(--c-accent);
				color: var(--c-on-accent);
				border-radius: 50vw;
				opacity: 0;
				transform: translate(-50%, 0%) scale(0);
				transition: all 0.3s ease;
				z-index: 2;
			}

			&:hover {
				color: transparent;
				transform: scale(1.1);

				&::after {
					opacity: 1;
					transform: translate(-50%, -50%) scale(1);
				}
			}

			&:active {
				transform: scale(0.95);
			}
		}
	}
}

.slideX-enter-active,
.slideX-leave-active {
	transition: transform 0.3s ease, opacity 0.3s ease;
}

.slideX-enter-from,
.slideX-leave-to {
	transform: translateX(100%);
	opacity: 0;
}
</style>
