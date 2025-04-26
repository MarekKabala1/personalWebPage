// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
	integrations: [mdx(), react()],

	markdown: {
		shikiConfig: {
			theme: 'dracula',
		},
	},
	image: {
		domains: ['astro.build'],
	},
	env: {
		schema: {
			CONVEX_URL: envField.string({
				access: 'public',
				context: 'client',
			}),
		},
	},
	output: 'static',
	adapter: vercel(),
});
