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
  const itemEndI = itemFirstI + itemsCnt
  const itemLastI = itemEndI - 1
  const itemFirstP = itemFirstI * 100
  const itemEndP = itemEndI * 100
  const itemLastP = itemLastI * 100
  const loopItemI = (v: number) => RangeU.loop(v, [itemFirstI, itemEndI])
  const loopItemP = (v: number) => RangeU.loop(v, [itemFirstP, itemEndP])
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = round3(-(getStartProgressX() + dp))
  const pCurr = round3(mod(pos0P, 100))
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = round3(-(getStartItemProgress() + dp))
  const pos0ItemI = loopItemI(Math.floor(round3(pos0ItemP / 100)))
  const pos0ItemHalfI = round3(loopItemI(Math.floor((pos0ItemP + 50) / 100)))
  
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
  viewI: number
}
export const getClampedCarouselProps = (props: GetClampedCarouselProps) => {
  let {
    getStartProgressX,
    getStartItemProgress,
    deltaProgressX: dp,
    itemsCnt,
    viewsCnt,
    // TODO - does not support any fromI except 0
    viewsFromI: fromI,
    viewI: viewI,
  } = props
  
  viewI += fromI
  const viewIMax = fromI + viewsCnt
  const viewPMax = 100 * viewIMax
  const loopPos0P = (v: number) => RangeU.loop(v, [0, viewsCnt * 100])
  const clampPos0P = (v: number) => RangeU.clamp(v, [0, (viewsCnt - 1) * 100])
  const loopViewI = (v: number) => RangeU.loop(v, [fromI, viewIMax])
  const loopViewP = (v: number) => RangeU.loop(v, [100 * fromI, viewPMax])
  const loopPos0ItemP = (v: number) => RangeU.loop(v, [0, itemsCnt * 100])
  const clampPos0ItemP = (v: number) => RangeU.clamp(v, [0, (itemsCnt - 1) * 100])
  const loopItemI = (v: number) => RangeU.loop(v, [0, itemsCnt])
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = clampPos0P(loopPos0P(-getStartProgressX()) - dp)
  const pos0IP = -mod(pos0P, 100)
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  const pos0ItemP = clampPos0ItemP(loopPos0ItemP(-getStartItemProgress()) - dp)
  const pos0ItemI = loopItemI(Math.floor(pos0ItemP / 100))
  const pos0ItemHalfI = loopItemI(Math.floor((pos0ItemP + 50) / 100))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const i = viewI - pos0ViewI
  // progress of current index, nonegative
  const iP = pos0IP
  const p = pos0P + 100 * i
  const viewPI = 100 * i
  const viewIP = iP
  const viewP = viewPI + viewIP
  const itemI = loopItemI(pos0ItemI + i)
  
  /* if (viewI === -1) {
   console.log({ pos0P, pos0ViewI, pos0ItemI })
   console.log({ viewI, p, i, viewP, itemI })
   } */
  
  return { pos0P, pos0ItemP, pos0ItemI, pos0ItemHalfI, i, iP, p, viewPI, viewIP, viewP, itemI }
}


