// Sanitize 配置项
import type { PresetAnimationsOptions } from 'unocss-preset-animations'

// @see https://github.com/csstools/sanitize.css
export interface SanitizeOptions {
  forms?: boolean
  assets?: boolean
  systemUi?: boolean
  typography?: boolean
  uiMonospace?: boolean
  reduceMotion?: boolean
}

export type ResetCSS =
  | 'tailwind'
  | 'tailwind-compat'
  | 'eric-meyer'
  | 'normalize'
  | SanitizeOptions

export interface Options {
  /**
   * 是否开启动画预设功能，默认为开启，设置成 false 可以关闭
   */
  animations?: false | PresetAnimationsOptions

  /**
   * 是否开启样式重置, 设置成 false 可以关闭
   * @default sanitize
   */
  reset?: false | ResetCSS
}
