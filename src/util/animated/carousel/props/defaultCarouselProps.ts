import { MathU } from 'src/util/common/MathU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import mod = MathU.mod
import rf3 = MathU.rf3
import Sign = TypeU.Sign
import { GetCarouselProps, getIndexesProps, MergeProgressCallback } from './carouselPropsCommon'
import rf5 = MathU.rf5




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
  
  startP = rf3(startP)
  startItemP = rf3(startItemP)
  deltaP = rf3(deltaP)
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = rf3(startP + deltaP)
  const dir = Math.sign(deltaP)
  const pCurr = rf3(mod(pos0P, 100))
  const pos0PBase = rf3(pos0P - pCurr)
  
  const pos0ViewI = loopViewI(Math.floor(rf5(pos0P / 100)))
  
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
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosPBase,
    viewP, viewI,
    viewItemI,
    first, last, minusFirst, minusLast,
  }
}


let lastLog


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
  
  startP = rf3(startP)
  startItemP = rf3(startItemP)
  deltaP = rf3(deltaP)
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = clampViewP(rf3(loopViewP(startP) + deltaP))
  const dir = Math.sign(deltaP) as Sign
  const pCurr = rf3(mod(pos0P, 100))
  const pos0PBase = rf3(pos0P - pCurr)
  
  const pos0ViewI = loopViewI(Math.floor(rf5(pos0P / 100)))
  
  const pos0ItemP = clampItemP(loopItemP(startItemP) + deltaP)
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
  
  // if (viewPosI === 0) {
  //   //console.log({ pos0P, pCurr, viewPosI, viewI, viewItemI })
  //   const log = `pos0P ${pos0P} pCurr ${pCurr} viewPosI ${viewPosI} viewI ${viewI} viewItemI ${viewItemI}`
  //   if (log !== lastLog) {
  //     lastLog = log
  //     console.log(log)
  //   }
  // }
  
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


