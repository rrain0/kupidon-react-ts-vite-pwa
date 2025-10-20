


export const compareStrings = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0

export const compareNumbers = (a: number, b: number) => {
  if (Number.isNaN(a) && Number.isNaN(b)) return 0
  if (Number.isNaN(a)) return -1
  if (Number.isNaN(b)) return 1
  return a < b ? -1 : a > b ? 1 : 0
}