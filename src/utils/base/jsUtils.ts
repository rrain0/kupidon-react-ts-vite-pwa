


export const maxTimeout = 2 ** 32 / 2 - 1



export function stringifyEq(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
