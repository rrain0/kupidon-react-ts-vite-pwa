import { MathU } from 'src/util/common/MathU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import mod = MathU.mod
import round3 = MathU.round3
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
  
  startP = round3(startP)
  startItemP = round3(startItemP)
  deltaP = round3(deltaP)
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = startP + deltaP
  const dir = Math.sign(deltaP)
  const pCurr = mod(pos0P, 100)
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = startItemP + deltaP
  const pos0ItemI = loopItemI(Math.floor(pos0ItemP / 100) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor((pos0ItemP + 50) / 100))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = loopViewI(viewI - pos0ViewI)
  const viewPosPBase = loopViewP(pos0P + 100 * viewPosI)
  
  const viewP = loopViewP(100 * viewPosI - pCurr)
  
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
  
  startP = round3(startP)
  startItemP = round3(startItemP)
  deltaP = round3(deltaP)
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = clampViewP(loopViewP(startP) + deltaP)
  const dir = Math.sign(deltaP) as Sign
  const pCurr = mod(pos0P, 100)
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = clampItemP(loopItemP(startItemP) + deltaP)
  const pos0ItemI = loopItemI(Math.floor(pos0ItemP / 100) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor((pos0ItemP + 50) / 100))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = viewI - pos0ViewI
  const viewPosPBase = pos0P + 100 * viewPosI
  
  const viewPBase = 100 * viewPosI
  const viewPCurr = pCurr
  const viewP = viewPBase - viewPCurr
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosPBase, viewItemI })
  
  return {
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewPBase, viewPCurr, viewP, viewI,
    viewItemI,
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
  
  let p = startP + deltaP
  p = noLoop ? clampViewP(p) : loopViewP(p)
  p = round3(p)
  setStartProgress(p)
  
  let itemP = startItemP + deltaP
  itemP = noLoop ? clampItemP(itemP) : loopItemP(itemP)
  itemP = round3(itemP)
  setStartItemProgress(itemP)
  
  setDeltaProgress(0)
}


