import { rangeMapClamp } from 'src/utils/base/math/rangeUtils.ts'



export const random = (from = 0, until = 1) => (
  rangeMapClamp(Math.random(), [0, 1], [from, until])
)

export const randomInt = (from = 0, to = 1) => (
  Math.floor(random(from, to + 1))
)

