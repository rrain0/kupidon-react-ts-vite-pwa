import {
  GetCarouselProps,
  getIndexesProps, MergeProgressCallback,
} from 'src/util/animated/carousel/props/carouselPropsCommon.ts'
import { MathU } from 'src/util/common/MathU.ts'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import round3 = MathU.round3
import Sign = TypeU.Sign




// Fixed - Карусель, где за раз можно пролистнуть только 1 элемент
// Forward - Переходить можно только на следующие элементы



export const getFixedForwardLoopedCarouselProps = (props: GetCarouselProps) => {
  let {
    startP,
    startItemP,
    deltaP,
    itemsCnt,
    viewsCnt,
    startViewI,
    currViewI: viewI = 0,
    startItemI = 0,
  } = props
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps({ startViewI, viewsCnt, startItemI, itemsCnt })
  
  startP = round3(startP)
  startItemP = round3(startItemP)
  deltaP = round3(deltaP)
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const _pos0P = startP + deltaP
  const pos0PBase = Math.floor(startP / 100) * 100
  const pCurr = RangeU.clamp(_pos0P - pos0PBase, [-100, 100])
  const pos0P = pos0PBase + pCurr
  const dir = Math.sign(pCurr) as Sign
  const overflow = _pos0P - pos0P
  
  const pos0ViewI = loopViewI(Math.floor(pos0PBase / 100))
  
  const _pos0ItemP = startItemP + deltaP
  const pos0ItemP = _pos0ItemP - overflow
  const pos0ItemPBase = pos0ItemP - pCurr
  const pos0ItemI = Math.floor(pos0ItemPBase / 100)
  const pos0ItemHalfI = loopItemI(Math.floor((pos0ItemPBase + 50) / 100))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = loopViewI(viewI - pos0ViewI)
  const viewPosPBase = loopViewP(pos0P + 100 * viewPosI)
  
  const viewP = loopViewP(100 * viewPosI + pCurr)
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosPBase, viewItemI })
  
  return {
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewP, viewI,
    viewItemI,
  }
}







export const fixedForwardCarouselMergeProgress: MergeProgressCallback = (props) => {
  const {
    startViewI, viewsCnt, startItemI, itemsCnt,
    startP, startItemP, deltaP,
    setStartProgress, setStartItemProgress, setDeltaProgress,
    noLoop,
  } = props
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps({ startViewI, viewsCnt, startItemI, itemsCnt })
  
  const _pos0P = startP + deltaP
  const pos0PBase = Math.floor(startP / 100) * 100
  const pCurr = RangeU.clamp(_pos0P - pos0PBase, [-100, 100])
  const pos0P = pos0PBase + pCurr
  const overflow = _pos0P - pos0P
  
  const _pos0ItemP = startItemP + deltaP
  const pos0ItemP = _pos0ItemP - overflow
  const pos0ItemPBase = pos0ItemP - pCurr
  
  const isNext = Math.abs(pCurr) >= 100
  
  let p = isNext ? pos0PBase + 100 : pos0PBase
  p = round3(p)
  p = noLoop ? clampViewP(p) : loopViewP(p)
  setStartProgress(p)
  
  let itemP = isNext ? pos0ItemPBase + 100 : pos0ItemPBase
  itemP = round3(itemP)
  itemP = noLoop ? clampItemP(itemP) : loopItemP(itemP)
  setStartItemProgress(itemP)
  
  setDeltaProgress(0)
}