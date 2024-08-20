import {
  type Preset,
  type StaticShortcutMap,
  definePreset,
  presetUno,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'
import type { Options } from './types'
import { resolveResetCSS } from './utils'

function resolvePresets(options: Options) {
  const presets: Preset[] = [presetUno()]
  if (options.animations !== false) {
    presets.push(presetAnimations(options.animations) as Preset)
  }
  return presets
}

export const presetForme = definePreset<Options>((options = {}) => {
  const presets = resolvePresets(options)

  return {
    name: 'unocss-preset-forme',
    presets,
    preflights: [
      {
        getCSS() {
          if (options.reset) {
            return resolveResetCSS(options.reset)
          }
        },
        layer: '0',
      },
    ],
    rules: [
      [
        /^f-all-(start|center|end)$/,
        ([, align]) => {
          return `flex items-${align} justify-${align}`
        },
      ],
    ],
    shortcuts: mergeShortcuts(
      // f-all-center => flex items-center justify-center
      flattenToObj(
        ['start', 'center', 'end'].map(align => [
          `f-${align}`,
          `flex items-${align} justify-${align}`,
        ]),
      ),
    ),
  } satisfies Preset
})

function mergeShortcuts(...objects: StaticShortcutMap[]) {
  return objects.reduce((prev, current) => Object.assign({}, prev, current), {})
}

function flattenToObj(flatShortcuts: [string, string][]) {
  const shortcuts: StaticShortcutMap = {}
  for (const [name, value] of flatShortcuts) {
    shortcuts[name] = value
  }
  return shortcuts
}

export { type Options as PresetFormeOptions, presetForme as default }
