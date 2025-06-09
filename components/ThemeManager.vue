<template>
	<div ref="themeManagerRef" class="theme-manager" :class="{ 'is-active': isActive }">
		<div class="theme-manager__roller" @click.stop="toggleActive">
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeManager } from '@/composables/useThemeManager'
import { THEMES } from '@/utils/storage'
import CustomizationSettings from '@/components/CustomizationSettings.vue'
import IconSettings from '@/components/Icons/IconSettings.vue'
import IconRoller from '@/components/Icons/IconRoller.vue'
import IconSun from '@/components/Icons/IconSun.vue'
import IconMoon from '@/components/Icons/IconMoon.vue'
import IconMoonFull from '@/components/Icons/IconMoonFull.vue'

const { changeTheme } = useThemeManager()

const themeManagerRef = ref(null)
const settingsOpen = ref(false)
const isActive = ref(false)

const toggleActive = () => (isActive.value = !isActive.value)

const openSettings = () => {
	settingsOpen.value = true
	isActive.value = false
}

const closeSettings = () => (settingsOpen.value = false)

const handleClickOutside = (event) => {
	if (themeManagerRef.value && !themeManagerRef.value.contains(event.target)) {
		isActive.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})

const THEME_OPTIONS = [
	{ id: THEMES.LIGHT, icon: IconSun },
	{ id: THEMES.DARK, icon: IconMoon },
	{ id: THEMES.OLED, icon: IconMoonFull },
]
</script>

<style scoped lang="scss">
$trans: 0.3s ease;
$border-accent: 1px solid hsla(var(--accent-hsl) / 0.2);
$blur-backdrop: blur(1rem);

.theme-manager {
	position: fixed;
	top: var(--roller-top);
	right: var(--roller-right);
	display: grid;
	place-items: center;
	gap: 0.5rem;
	color: var(--c-accent);
	z-index: 5;

	&__roller {
		aspect-ratio: 1 / 1;
		display: grid;
		place-items: center;
		border: $border-accent;
		border-radius: 50vw;
		background-image: var(--c-bg-gradient);
		backdrop-filter: $blur-backdrop;
		cursor: pointer;
		transition: transform $trans, background $trans, color $trans;
		width: var(--roller-size);
		height: var(--roller-size);

		&:hover {
			transform: scale(1.1);
			background-image: none;
			background-color: var(--c-accent);
			color: var(--c-on-accent);
		}

		&:active {
			transform: scale(0.95);
		}
	}

	&__buttons {
		display: grid;
		place-items: center;
		gap: 0.5rem;
		width: var(--roller-size);
		padding: 0.2rem;
		background-image: var(--c-bg-gradient);
		backdrop-filter: $blur-backdrop;
		border: $border-accent;
		border-radius: 20vw;
		opacity: 0;
		pointer-events: none;
		clip-path: polygon(0 0, 100% 0, 100% 0, 0% 0);
		transition: opacity $trans, clip-path $trans;

		button {
			position: relative;
			aspect-ratio: 1 / 1;
			font-family: var(--fontFamily), var(--fontFamilyDefault);
			line-height: 1;
			background-color: transparent;
			color: currentColor;
			border: 0;
			border-radius: 50vw;
			cursor: pointer;
			transform: scale(0);
			transition: transform 0.3s $easeInOutBack, color $trans;

			// Tooltip optimization
			&::after {
				content: attr(data-ds-btn-metadata);
				position: absolute;
				top: 50%;
				left: 50%;
				width: max-content;
				font-size: 0.7rem;
				font-weight: 700;
				text-transform: uppercase;
				padding: 6px;
				background-color: var(--c-accent);
				color: var(--c-on-accent);
				border-radius: 50vw;
				opacity: 0;
				transform: translate(-50%, 0%) scale(0);
				transition: opacity $trans, transform $trans;
				z-index: 2;
				pointer-events: none;
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

	// Active state optimizations
	&.is-active &__buttons {
		opacity: 1;
		pointer-events: all;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

		button {
			transform: scale(1);
			// Staggered animation using SCSS loop
			@for $i from 1 through 4 {
				&:nth-child(#{$i}) {
					transition-delay: #{$i * 0.05}s;
				}
			}
		}
	}
}
</style>
