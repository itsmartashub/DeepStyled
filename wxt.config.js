import { defineConfig } from 'wxt'

export default defineConfig({
	extensionApi: 'chrome',
	modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons'],
	autoIcons: {
		enabled: true,
		grayscaleOnDevelopment: false,
		sizes: [128, 48, 32, 16],
	},
	vite: () => ({
		logLevel: 'error', // Suppress warnings
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					quietDeps: true,
					silenceDeprecations: ['import'],
					additionalData: `@import "@/styles/index.scss";`, // 👈 Auto-import SCSS
				},
			},
		},
	}),
	manifestVersion: 3, // Set the desired manifest version here
	manifest: ({ browser }) => ({
		version: '2.0.0',
		name: 'DeepStyled - Deepseek Customization',
		description:
			"Transform DeepSeek's user interface with customizable accent colors, modern designs, and chat bubbles.",
		author: 'itsmarta',
		homepage_url: 'https://github.com/itsmartashub/DeepStyled',
		permissions: ['storage'],
		host_permissions: browser === 'firefox' ? undefined : ['https://chat.deepseek.com/*'],
		content_security_policy: {
			extension_pages:
				"script-src 'self'; style-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
		},
		...(browser === 'firefox' && {
			applications: {
				gecko: {
					id: 'deepstyled@itsmarta',
					strict_min_version: '109.0',
				},
			},
		}),
	}),
})
