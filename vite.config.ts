import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    proxy: {
      // Proxy OpenAI requests to avoid browser CORS restrictions
      '/api/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openai/, ''),
        configure: (proxy) => {
          proxy.on('error', (err) => console.error('[openai proxy error]', err));
        },
      },
      '/api/onecompiler': {
        target: 'https://onecompiler.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/onecompiler/, '/api/v1/run'),
      },
    },
  },
  plugins: [react(), tailwindcss()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
