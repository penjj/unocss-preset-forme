import { defineConfig } from 'unocss'
import { presetForme } from 'unocss-preset-forme'

export default defineConfig({
  presets: [
    presetForme({
      reset: 'tailwind-compat',
    }),
  ],
  content: {},
})
