import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Sử dụng adapter-static để build dạng SPA tĩnh
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html', // ⚠️ Quan trọng: Cho phép load các route như /characters/acheron
			precompress: false,
			strict: true
		}),

		// KHÔNG cần "prerender.entries" vì bạn dùng SPA
		// Các route như /characters/acheron sẽ được load client-side

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
