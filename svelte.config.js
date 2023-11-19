import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      $components: "$lib/components",
      $utils: "$lib/utils",
      $ui: "$lib/components/ui",
      $stores: "$lib/stores",
    },
    adapter: adapter(),
  },

  preprocess: [vitePreprocess({})],
};

export default config;
