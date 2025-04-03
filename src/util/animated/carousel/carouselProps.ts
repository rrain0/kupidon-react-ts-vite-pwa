import { MathU } from 'src/util/common/MathU.ts'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Getter = TypeU.Getter
import mod = MathU.mod




// ⚠️⚠️⚠️ Не применять округление - может быть перескок по индексу


export type GetLoopedCarouselProps = {
  getStartProgressX: Getter<number>
  getStartItemProgress: Getter<number>
  deltaProgressX: number
  itemsCnt: number
  viewsCnt: number
  startViewI: number
  currViewI?: number | undefined
  startItemI?: number | undefined
}
export const getLoopedCarouselProps = (props: GetLoopedCarouselProps) => {
  let {
    getStartProgressX,
    getStartItemProgress,
    deltaProgressX: dp,
    itemsCnt,
    viewsCnt,
    startViewI,
    currViewI: viewI = 0,
    startItemI = 0,
  } = props
  
  const viewFirstI = startViewI
  const viewEndI = viewFirstI + viewsCnt
  const viewLastI = viewEndI - 1
  const viewFirstP = viewFirstI * 100
  const viewEndP = viewEndI * 100
  const viewLastP = viewLastI * 100
  viewI += viewFirstI
  const loopViewI = (v: number) => RangeU.loop(v, [viewFirstI, viewEndI])
  const loopViewP = (v: number) => RangeU.loop(v, [viewFirstP, viewEndP])
  
  const itemFirstI = startItemI
  const itemEndI = itemsCnt
  const itemLastI = itemEndI - 1
  const itemFirstP = itemFirstI * 100
  const itemEndP = itemEndI * 100
  const itemLastP = itemLastI * 100
  const loopItemI = (v: number) => RangeU.loop(v, [0, itemEndI])
  const loopItemP = (v: number) => RangeU.loop(v, [0, itemEndP])
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = -(getStartProgressX() + dp)
  const pCurr = mod(pos0P, 100)
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = -(getStartItemProgress() + dp)
  const pos0ItemI = loopItemI(Math.floor(pos0ItemP / 100) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor((pos0ItemP + 50) / 100))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = loopViewI(viewI - pos0ViewI)
  const viewPosP = loopViewP(pos0P + 100 * viewPosI)
  
  const viewP = loopViewP(100 * viewPosI - pCurr)
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosP, viewItemI })
  
  return {
    pos0P, pCurr, pos0PBase,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosP,
    viewP, viewI,
    viewItemI,
  }
}




export type GetClampedCarouselProps = {
  getStartProgressX: Getter<number>
  getStartItemProgress: Getter<number>
  deltaProgressX: number
  itemsCnt: number
  viewsCnt: number
  startViewI: number
  currViewI?: number | undefined
  startItemI?: number | undefined
}
export const getClampedCarouselProps = (props: GetClampedCarouselProps) => {
  let {
    getStartProgressX,
    getStartItemProgress,
    deltaProgressX: dp,
    itemsCnt,
    viewsCnt,
    startViewI,
    currViewI: viewI = 0,
    startItemI = 0,
  } = props
  
  const viewFirstI = startViewI
  const viewEndI = viewFirstI + viewsCnt
  const viewLastI = viewEndI - 1
  const viewFirstP = viewFirstI * 100
  const viewEndP = viewEndI * 100
  const viewLastP = viewLastI * 100
  viewI += viewFirstI
  const loopViewI = (v: number) => RangeU.loop(v, [viewFirstI, viewEndI])
  const loopViewP = (v: number) => RangeU.loop(v, [viewFirstP, viewEndP])
  const clampViewP = (v: number) => RangeU.clamp(v, [viewFirstP, viewLastP])
  
  const itemFirstI = startItemI
  const itemEndI = itemsCnt
  const itemLastI = itemEndI - 1
  const itemFirstP = itemFirstI * 100
  const itemEndP = itemEndI * 100
  const itemLastP = itemLastI * 100
  const loopItemI = (v: number) => RangeU.loop(v, [0, itemEndI])
  const loopItemP = (v: number) => RangeU.loop(v, [0, itemEndP])
  const clampItemP = (v: number) => RangeU.clamp(v, [0, itemLastP])
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = clampViewP(loopViewP(-getStartProgressX()) - dp)
  const pCurr = mod(pos0P, 100)
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = clampItemP(loopItemP(-getStartItemProgress()) - dp)
  const pos0ItemI = loopItemI(Math.floor(pos0ItemP / 100) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor((pos0ItemP + 50) / 100))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = viewI - pos0ViewI
  const viewPosP = pos0P + 100 * viewPosI
  
  const viewPBase = 100 * viewPosI
  const viewPCurr = pCurr
  const viewP = viewPBase - viewPCurr
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosP, viewItemI })
  
  return {
    pos0P, pCurr, pos0PBase,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosP,
    viewPBase, viewPCurr, viewP, viewI,
    viewItemI,
  }
}


