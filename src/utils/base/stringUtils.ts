


export const capitalize = (str: string) => (
  str.replace(/^./, match => match.toUpperCase())
)
export const uncapitalize = (str: string) => (
  str.replace(/^./, match => match.toLowerCase())
)

