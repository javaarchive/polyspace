import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import auth from 'auth-astro';

import node from '@astrojs/node';

import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
  integrations: [ astroImageTools, react(), tailwind({
    applyBaseStyles: false,
  }), auth()],

  output: "server",

  adapter: node({
    mode: 'standalone'
  })
});