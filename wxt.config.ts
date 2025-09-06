import { defineConfig } from 'wxt'
import { resolve } from 'path'

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ['@wxt-dev/module-vue', '@wxt-dev/auto-icons'],
	autoIcons: {
		enabled: true,
		developmentIndicator: false,
		sizes: [128, 48, 32, 16],
	},
	vite: () => ({
		resolve: {
			alias: {
				'@': resolve('/'),
				'~': resolve('/'),
			},
		},
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
				"script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.gstatic.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'self';",
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
