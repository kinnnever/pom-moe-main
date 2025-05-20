import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// @ts-ignore
			fallback: null,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: [
				'/',
				'/characters',
				'/characters/acheron',
				'/characters/march-7th',
				'/characters/dan-heng'
				// ✅ thêm từng nhân vật có .svelte riêng
			]
		},
		alias: {
			$components: 'src/components',
			$utils: 'src/utils',
			$types: 'src/app.d.ts',
			$stores: 'src/stores',
			$data: 'src/data'
		}
	}
};

export default config;
