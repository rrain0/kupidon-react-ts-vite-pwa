import { DOMHandlers } from '@use-gesture/core/types'
import React from 'react'

export type ReactDOMAttributes = {
  // @ts-expect-error
  [Key in keyof DOMHandlers]: React.DOMAttributes<EventTarget>[Key]
}
