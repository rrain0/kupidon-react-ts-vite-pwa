import { CssSelectable } from '@libs/widget-style-4/css/CssSelectable.ts'


/*
  States order to select in CSS:
  normal
  checked / selected
  hover
  active
  focus
  focusVisible
  readOnly
  disabled
  error
*/



export function useThis(used: string): string {
  if (!used) return ''
  return `&${used}`
}


export abstract class CssState implements CssSelectable {
  abstract use(): string
  abstract useThis(): string
}

