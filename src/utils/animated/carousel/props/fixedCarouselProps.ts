import {
  GetCarouselProps,
  getIndexesProps, MergeProgressCallback,
} from 'src/utils/animated/carousel/props/carouselPropsCommon.ts'
import { rf3, rf5 } from 'src/utils/base/math/mathUtils.ts'
import { rangeClamp } from 'src/utils/base/math/rangeUtils.ts'
import { Sign } from 'src/utils/base/typeUtils.ts'




// Fixed - Карусель, где за раз можно пролистнуть только 1 элемент
// Forward - Переходить можно только на следующие элементы


/*
 Одна вьюха отображает один item, даже когда перемещается в другой position index,
 пока текущий item должен быть виден.
 */



export const getFixedForwardLoopedCarouselProps = (props: GetCarouselProps) => {
  let {
    startP,
    startItemP,
    deltaP,
    currViewI: viewI = 0,
    ...indexProps
  } = props
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps(indexProps)
  
  viewI += viewFirstI
  
  startP = rf3(startP)
  startItemP = rf3(startItemP)
  deltaP = rf3(deltaP)
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const _pos0P = rf3(startP + deltaP)
  const pos0PI = Math.floor(rf5(startP / 100))
  const pos0PBase = rf3(Math.floor(pos0PI) * 100)
  const pCurr = rf3(rangeClamp(_pos0P - pos0PBase, [-100, 100]))
  const pos0P = rf3(pos0PBase + pCurr)
  const dir = Math.sign(pCurr) as Sign
  const overflow = rf3(_pos0P - pos0P)
  
  const pos0ViewI = loopViewI(Math.floor(rf5(pos0PBase / 100)))
  
  const _pos0ItemP = rf3(startItemP + deltaP)
  const pos0ItemP = rf3(_pos0ItemP - overflow)
  const pos0ItemPBase = rf3(pos0ItemP - pCurr)
  const pos0ItemI = loopItemI(Math.floor(rf5(pos0ItemPBase / 100)))
  const pos0ItemHalfI = loopItemI(Math.floor(rf5((pos0ItemPBase + 50) / 100)))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = loopViewI(viewI - pos0ViewI)
  const viewPosPBase = loopViewP(rf3(pos0P + 100 * viewPosI))
  
  const viewP = loopViewP(rf3(100 * viewPosI + pCurr))
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  const first = viewPosI === 0
  const last = viewPosI === viewLastI
  const minusFirst = viewPosI === -1
  const minusLast = viewPosI === viewFirstI
  
  // if (viewPosI === 0) {
  //   console.log({ pos0P, pCurr, viewPosI, viewI, viewItemI })
  // }
  
  return {
    pos0P, pCurr, dir, pos0PBase, pos0PI,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemPBase, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewP, viewI,
    viewItemI,
    first, last, minusFirst, minusLast,
  }
}







export const fixedForwardCarouselMergeProgress: MergeProgressCallback = (props) => {
  const {
    startP, startItemP, deltaP,
    noLoop,
    ...indexProps
  } = props
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps(indexProps)
  
  const _pos0P = rf3(startP + deltaP)
  const pos0PI =Math.floor(rf5(startP / 100))
  const pos0PBase = rf3(Math.floor(pos0PI) * 100)
  const pCurr = rf3(rangeClamp(rf3(_pos0P - pos0PBase), [-100, 100]))
  const pos0P = rf3(pos0PBase + pCurr)
  const overflow = rf3(_pos0P - pos0P)
  
  const _pos0ItemP = rf3(startItemP + deltaP)
  const pos0ItemP = rf3(_pos0ItemP - overflow)
  const pos0ItemPBase = rf3(pos0ItemP - pCurr)
  
  const isNext = Math.abs(pCurr) >= 100
  
  let p = isNext ? rf3(pos0PBase + 100) : pos0PBase
  p = noLoop ? clampViewP(p) : loopViewP(p)
  
  let itemP = isNext ? rf3(pos0ItemPBase + 100) : pos0ItemPBase
  itemP = noLoop ? clampItemP(itemP) : loopItemP(itemP)
  
  return { startP: p, startItemP: itemP, deltaP: 0 }
}