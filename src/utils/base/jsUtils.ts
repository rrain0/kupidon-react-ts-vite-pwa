


export const maxTimeout = 2 ** 32 / 2 - 1



export const stringifyEq = (obj1: any, obj2: any) => (
  JSON.stringify(obj1) === JSON.stringify(obj2)
)
