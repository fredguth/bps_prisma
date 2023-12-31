import { vitePreprocess } from "@sveltejs/kit/vite";
import { importAssets } from "svelte-preprocess-import-assets";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$components: '$lib/components',
			$utils: '$lib/utils',
			$ui: '$lib/components/ui',
			$stores: '$lib/stores',
		},
		adapter: adapter(),
	},
	vitePlugin: {
		inspector: true,
	},

	preprocess: [vitePreprocess({}), importAssets()],
}

export default config;
