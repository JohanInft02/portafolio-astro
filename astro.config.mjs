// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import icon from "astro-icon";;

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    icon(),
  ],
  vite: {
    plugins: [
      {
        name: 'serve-locales',
        configureServer(server) {
          // @ts-ignore
          server.middlewares.use((req, res, next) => {
            // @ts-ignore
            if (req.url.startsWith('/locales/')) {
              // @ts-ignore
              req.url = req.url.replace('/locales/', '/public/locales/');
            }
            next();
          });
        },
      },
    ],
  },
});

