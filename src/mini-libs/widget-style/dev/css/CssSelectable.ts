

export interface CssSelectable {
  /** @returns state selector */
  use: () => string
  /** @returns this state selector '&<selector>' */
  useThis: () => string
}

