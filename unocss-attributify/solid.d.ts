import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      [key: string]: any
    }
  }
}
