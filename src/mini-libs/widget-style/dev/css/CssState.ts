


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


export abstract class CssState {
  
  /** @returns state selector */
  abstract use(): string
  
  /** @returns this state selector '&<selector>' */
  useThis(): string {
    return useThis(this.use())
  }
  
}

