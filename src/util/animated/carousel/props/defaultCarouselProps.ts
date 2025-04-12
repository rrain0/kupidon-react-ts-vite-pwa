import { MathU } from 'src/util/common/MathU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import mod = MathU.mod
import rf3 = MathU.rf3
import Sign = TypeU.Sign
import { GetCarouselProps, getIndexesProps, MergeProgressCallback } from './carouselPropsCommon'




// Default - Карусель, где за раз можно пролистнуть хоть сколько элементов




export const getItemIProps = (itemI: number, startItemI = 0) => {
  return {
    pos0P: (startItemI + itemI) * 100,
  }
}





export const getLoopedCarouselProps = (props: GetCarouselProps) => {
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
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = rf3(startP + deltaP)
  const dir = Math.sign(deltaP)
  const pCurr = rf3(mod(pos0P, 100))
  const pos0PBase = rf3(pos0P - pCurr)
  
  const pos0ViewI = loopViewI(Math.floor(rf3(pos0P / 100)))
  
  const pos0ItemP = rf3(startItemP + deltaP)
  const pos0ItemI = loopItemI(rf3(Math.floor(rf3(pos0ItemP / 100)) + itemFirstI))
  const pos0ItemHalfI = loopItemI(Math.floor(rf3((pos0ItemP + 50) / 100)))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = loopViewI(viewI - pos0ViewI)
  const viewPosPBase = loopViewP(rf3(pos0P + 100 * viewPosI))
  
  const viewP = loopViewP(rf3(100 * viewPosI - pCurr))
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  const first = viewPosI === 0
  const last = viewPosI === viewLastI
  const end = viewPosI === viewFirstI
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosPBase, viewItemI })
  
  return {
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewP, viewI,
    viewItemI,
    first, last, end,
  }
}





export const getClampedCarouselProps = (props: GetCarouselProps) => {
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
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = clampViewP(rf3(loopViewP(startP) + deltaP))
  const dir = Math.sign(deltaP) as Sign
  const pCurr = rf3(mod(pos0P, 100))
  const pos0PBase = rf3(pos0P - pCurr)
  
  const pos0ViewI = loopViewI(Math.floor(rf3(pos0P / 100)))
  
  const pos0ItemP = clampItemP(loopItemP(startItemP) + deltaP)
  const pos0ItemI = loopItemI(Math.floor(rf3(pos0ItemP / 100)) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor(rf3((pos0ItemP + 50) / 100)))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = viewI - pos0ViewI
  const viewPosPBase = rf3(pos0P + 100 * viewPosI)
  
  const viewPBase = 100 * viewPosI
  const viewPCurr = pCurr
  const viewP = rf3(viewPBase - viewPCurr)
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  const first = viewPosI === 0
  const last = viewPosI === viewLastI
  const end = viewPosI === viewFirstI
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosPBase, viewItemI })
  
  return {
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewPBase, viewPCurr, viewP, viewI,
    viewItemI,
    first, last, end,
  }
}








export const defaultCarouselMergeProgress: MergeProgressCallback = (props) => {
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
  
  let p = rf3(startP + deltaP)
  p = noLoop ? clampViewP(p) : loopViewP(p)
  setStartProgress(p)
  
  let itemP = rf3(startItemP + deltaP)
  itemP = noLoop ? clampItemP(itemP) : loopItemP(itemP)
  setStartItemProgress(itemP)
  
  setDeltaProgress(0)
}


