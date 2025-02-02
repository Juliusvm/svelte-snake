import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),
    kit: {
        adapter: adapter(),
        vite: {
            server: {
                fs: {allow: ['./static/']}
            }
        },

        // Override http methods in the Todo forms
        methodOverride: {
            allowed: ['PATCH', 'DELETE']
        }
    }
};

export default config;
