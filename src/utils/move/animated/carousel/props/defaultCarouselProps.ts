import { rf3, rf5, mod } from 'src/utils/base/math/mathUtils.ts'
import { Sign } from 'src/utils/base/typeUtils.ts'
import {
  GetCarouselProps, getIndexesProps, MergeProgressCallback
} from 'src/utils/move/animated/carousel/props/carouselPropsCommon.ts'





// Default - Карусель, где за раз можно пролистнуть хоть сколько элементов

/*
 Одна вьюха отображает один item, даже когда перемещается в другой position index,
 пока текущий item должен быть виден.
 */




export const getItemIProps = (itemI: number/* , itemFirstI = 0 */) => {
  return {
    pos0P: (/* itemFirstI + */ itemI) * 100,
  }
}





export const getLoopedCarouselProps = (props: GetCarouselProps) => {
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
  const pos0P = rf3(startP + deltaP)
  const pos0PI = Math.floor(rf5(pos0P / 100))
  const dir = Math.sign(deltaP)
  const pCurr = rf3(mod(pos0P, 100))
  const pos0PBase = rf3(pos0P - pCurr)
  
  const pos0ViewI = loopViewI(pos0PI)
  
  const pos0ItemP = rf3(startItemP + deltaP)
  const pos0ItemI = loopItemI(rf3(Math.floor(rf5(pos0ItemP / 100)) + itemFirstI))
  const pos0ItemHalfI = loopItemI(Math.floor(rf5((pos0ItemP + 50) / 100)))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = loopViewI(viewI - pos0ViewI)
  const viewPosPBase = loopViewP(rf3(pos0P + 100 * viewPosI))
  
  const viewP = loopViewP(rf3(100 * viewPosI - pCurr))
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  const first = viewPosI === 0
  const last = viewPosI === viewLastI
  const minusFirst = viewPosI === -1
  const minusLast = viewPosI === viewFirstI
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosPBase, viewItemI })
  
  return {
    pos0P, pCurr, dir, pos0PBase, pos0PI,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewP, viewI,
    viewItemI,
    first, last, minusFirst, minusLast,
  }
}



export const getClampedCarouselProps = (props: GetCarouselProps) => {
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
  const pos0P = clampViewP(rf3(loopViewP(startP) + deltaP))
  const pos0PI = Math.floor(rf5(pos0P / 100))
  const dir = Math.sign(deltaP) as Sign
  const pCurr = rf3(mod(pos0P, 100))
  const pos0PBase = rf3(pos0P - pCurr)
  
  const pos0ViewI = loopViewI(pos0PI)
  
  const pos0ItemP = clampItemP(rf3(loopItemP(startItemP) + deltaP))
  const pos0ItemI = loopItemI(Math.floor(rf5(pos0ItemP / 100)) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor(rf5((pos0ItemP + 50) / 100)))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = viewI - pos0ViewI
  const viewPosPBase = rf3(pos0P + 100 * viewPosI)
  
  const viewPBase = 100 * viewPosI
  const viewP = rf3(viewPBase - pCurr)
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  const first = viewPosI === 0
  const last = viewPosI === viewLastI
  const minusFirst = viewPosI === -1
  const minusLast = viewPosI === viewFirstI
  
  if (viewPosI === 0) {
    //noRepeatLog({ pos0P, pCurr, viewPosI, viewI, viewItemI })
  }
  
  return {
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewPBase, viewP, viewI,
    viewItemI,
    first, last, minusFirst, minusLast,
  }
}








export const defaultCarouselMergeProgress: MergeProgressCallback = (props) => {
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
  
  let p = rf3(startP + deltaP)
  p = noLoop ? clampViewP(p) : loopViewP(p)
  
  let itemP = rf3(startItemP + deltaP)
  itemP = noLoop ? clampItemP(itemP) : loopItemP(itemP)
  
  return { startP: p, startItemP: itemP, deltaP: 0 }
}


