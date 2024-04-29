import { DOMHandlers } from '@use-gesture/core/types'

export type ReactDOMAttributes = {
  // @ts-ignore
  [Key in keyof DOMHandlers]: React.DOMAttributes<EventTarget>[Key]
}
