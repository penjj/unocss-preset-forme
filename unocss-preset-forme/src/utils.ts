import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import type { ResetCSS } from './types'

const { resolve } = createRequire(import.meta.url)

function hyphenate(str: string) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
}

export async function resolveResetCSS(type: ResetCSS): Promise<string> {
  if (typeof type === 'object') {
    const plugins: string[] = ['sanitize/sanitize']
    for (const t in type) {
      if (Reflect.get(type, t)) {
        plugins.push(`sanitize/${hyphenate(t)}`)
      }
    }
    let cssText = ''
    for (const plugin of plugins) {
      cssText += await resolveCSSText(plugin)
      cssText += '\n'
    }

    return cssText
  }

  return resolveCSSText(type)
}

export function resolveCSSText(type: string) {
  return readFile(resolve(`@unocss/reset/${type}.css`), 'utf8')
}
