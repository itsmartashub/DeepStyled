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
					additionalData: `@import "@/styles/shared.scss";`, // 👈 Auto-import SCSS
				},
			},
		},
	}),
	// manifestVersion: 3,
	manifest: ({ browser }) => ({
		name: 'DeepStyled - Deepseek Customization',
		author: 'itsmarta',
		homepage_url: 'https://github.com/itsmartashub/DeepStyled',
		permissions: ['storage'],
		host_permissions: ['https://chat.deepseek.com/*'],
		content_security_policy: {
			extension_pages:
				"script-src 'self'; style-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
		},
		...(browser === 'firefox' && {
			applications: {
				gecko: {
					id: 'deepstyled@itsmarta',
				},
			},
		}),
	}),
})
