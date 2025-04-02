import { MathU } from 'src/util/common/MathU.ts'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Getter = TypeU.Getter
import mod = MathU.mod
import round3 = MathU.round3





export type GetLoopedCarouselProps = {
  getStartProgressX: Getter<number>
  getStartItemProgress: Getter<number>
  deltaProgressX: number
  itemsCnt: number
  viewsCnt: number
  viewsFromI: number
  viewI?: number | undefined
  itemsFromI?: number | undefined
}
export const getLoopedCarouselProps = (props: GetLoopedCarouselProps) => {
  let {
    getStartProgressX,
    getStartItemProgress,
    deltaProgressX: dp,
    itemsCnt,
    viewsCnt,
    viewsFromI,
    viewI = 0,
    itemsFromI = 0,
  } = props
  
  const viewFirstI = viewsFromI
  const viewEndI = viewFirstI + viewsCnt
  const viewLastI = viewEndI - 1
  const viewFirstP = viewFirstI * 100
  const viewEndP = viewEndI * 100
  const viewLastP = viewLastI * 100
  viewI += viewFirstI
  const loopViewI = (v: number) => RangeU.loop(v, [viewFirstI, viewEndI])
  const loopViewP = (v: number) => RangeU.loop(v, [viewFirstP, viewEndP])
  
  const itemFirstI = itemsFromI
  const itemEndI = itemsCnt
  const itemLastI = itemEndI - 1
  const itemFirstP = itemFirstI * 100
  const itemEndP = itemEndI * 100
  const itemLastP = itemLastI * 100
  const loopItemI = (v: number) => RangeU.loop(v, [0, itemEndI])
  const loopItemP = (v: number) => RangeU.loop(v, [0, itemEndP])
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = -(getStartProgressX() + dp)
  const pCurr = round3(mod(pos0P, 100))
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = -(getStartItemProgress() + dp)
  const pos0ItemI = loopItemI(Math.floor(round3(pos0ItemP / 100)) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor(round3((pos0ItemP + 50) / 100)))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const posI = loopViewI(viewI - pos0ViewI)
  const posP = loopViewP(pos0P + 100 * posI)
  
  const viewP = loopViewP(100 * posI - pCurr)
  
  const itemI = loopItemI(pos0ItemI + posI)
  
  // console.log({ pos0P, pCurr })
  // console.log({ viewI, posI, posP, viewP, itemI })
  
  return {
    pos0P, pCurr, pos0PBase,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    posI, posP,
    viewP,
    itemI,
  }
}




export type GetClampedCarouselProps = {
  getStartProgressX: Getter<number>
  getStartItemProgress: Getter<number>
  deltaProgressX: number
  itemsCnt: number
  viewsCnt: number
  viewsFromI: number
  viewI?: number | undefined
  itemsFromI?: number | undefined
}
export const getClampedCarouselProps = (props: GetClampedCarouselProps) => {
  let {
    getStartProgressX,
    getStartItemProgress,
    deltaProgressX: dp,
    itemsCnt,
    viewsCnt,
    viewsFromI,
    viewI = 0,
    itemsFromI = 0,
  } = props
  
  const viewFirstI = viewsFromI
  const viewEndI = viewFirstI + viewsCnt
  const viewLastI = viewEndI - 1
  const viewFirstP = viewFirstI * 100
  const viewEndP = viewEndI * 100
  const viewLastP = viewLastI * 100
  viewI += viewFirstI
  const loopViewI = (v: number) => RangeU.loop(v, [viewFirstI, viewEndI])
  const loopViewP = (v: number) => RangeU.loop(v, [viewFirstP, viewEndP])
  const clampViewP = (v: number) => RangeU.clamp(v, [viewFirstP, viewLastP])
  
  const itemFirstI = itemsFromI
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
  const pCurr = round3(mod(pos0P, 100))
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = clampItemP(loopItemP(-getStartItemProgress()) - dp)
  const pos0ItemI = loopItemI(Math.floor(round3(pos0ItemP / 100)) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor(round3((pos0ItemP + 50) / 100)))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const posI = viewI - pos0ViewI
  const posP = pos0P + 100 * posI
  
  const viewPBase = 100 * posI
  const viewPCurr = pCurr
  const viewP = viewPBase - viewPCurr
  
  const itemI = loopItemI(pos0ItemI + posI)
  
  /* if (viewI === -1) {
   console.log({ pos0P, pos0ViewI, pos0ItemI })
   console.log({ viewI, p, i, viewP, itemI })
   } */
  
  return {
    pos0P, pCurr, pos0PBase,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    posI, posP,
    viewPBase, viewPCurr, viewP,
    itemI,
  }
}


