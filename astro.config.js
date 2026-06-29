// @ts-check
import {defineConfig} from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  devToolbar: {enabled: false},
  vite: {plugins: [tailwindcss()]},
  site: 'https://musingswithcode.github.io',
  base: '/programming-interactivity'
})
