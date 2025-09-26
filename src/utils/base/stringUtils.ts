


export const capitalize = (str: string) => (
  str.replace(/^./, match => match.toUpperCase())
)
export const uncapitalize = (str: string) => (
  str.replace(/^./, match => match.toLowerCase())
)


export const stringCompare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0


