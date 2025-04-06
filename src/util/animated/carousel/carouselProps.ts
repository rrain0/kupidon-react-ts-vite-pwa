import { MathU } from 'src/util/common/MathU.ts'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import mod = MathU.mod
import round3 = MathU.round3
import Sign = TypeU.Sign




export const getItemIProps = (itemI: number, startItemI = 0) => {
  return {
    pos0P: (startItemI + itemI) * 100,
  }
}



export type GetIndexesPropsProps = {
  startViewI: number
  viewsCnt: number
  startItemI: number
  itemsCnt: number
}
export const getIndexesProps = ({
  startViewI, viewsCnt, startItemI, itemsCnt,
}) => {
  const viewFirstI = startViewI
  const viewEndI = viewFirstI + viewsCnt
  const viewLastI = viewEndI - 1
  const viewFirstP = viewFirstI * 100
  const viewEndP = viewEndI * 100
  const viewLastP = viewLastI * 100
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
  
  return {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  }
}




export type GetCarouselProps = {
  startP: number
  startItemP: number
  deltaP: number
  itemsCnt: number
  viewsCnt: number
  startViewI: number
  currViewI?: number | undefined
  startItemI?: number | undefined
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
  
  startP = round3(startP)
  startItemP = round3(startItemP)
  deltaP = round3(deltaP)
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps({ startViewI, viewsCnt, startItemI, itemsCnt })
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = startP + deltaP
  const pCurr = mod(pos0P, 100)
  const dir = Math.sign(deltaP)
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = startItemP + deltaP
  const pos0ItemI = loopItemI(Math.floor(pos0ItemP / 100) + itemFirstI)
  const pos0ItemHalfI = loopItemI(Math.floor((pos0ItemP + 50) / 100))
  
  // xxxxxx - positionViewIxxxxxx - data of position at viewI
  const viewPosI = loopViewI(viewI - pos0ViewI)
  const viewPosP = loopViewP(pos0P + 100 * viewPosI)
  
  const viewP = loopViewP(100 * viewPosI - pCurr)
  
  const viewItemI = loopItemI(pos0ItemI + viewPosI)
  
  //console.log({ pos0P, pCurr, viewPosI, viewI, viewPosP, viewItemI })
  
  return {
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosP,
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
  
  startP = round3(startP)
  startItemP = round3(startItemP)
  deltaP = round3(deltaP)
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps({ startViewI, viewsCnt, startItemI, itemsCnt })
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = clampViewP(loopViewP(startP) + deltaP)
  const pCurr = mod(pos0P, 100)
  const dir = Math.sign(deltaP) as Sign
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = clampItemP(loopItemP(startItemP) + deltaP)
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
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosP,
    viewPBase, viewPCurr, viewP, viewI,
    viewItemI,
  }
}




// TODO
export const getFixedClampedCarouselProps = (props: GetCarouselProps) => {
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
  
  startP = round3(startP)
  startItemP = round3(startItemP)
  deltaP = round3(deltaP)
  
  const {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  } = getIndexesProps({ startViewI, viewsCnt, startItemI, itemsCnt })
  
  viewI += viewFirstI
  
  // pos0xxxxxx - position0xxxxxx - data of first displayed position
  const pos0P = clampViewP(loopViewP(startP) + deltaP)
  const pCurr = mod(pos0P, 100)
  const dir = Math.sign(deltaP) as Sign
  const pos0PBase = pos0P - pCurr
  
  const pos0ViewI = loopViewI(Math.floor(pos0P / 100))
  
  const pos0ItemP = clampItemP(loopItemP(startItemP) + deltaP)
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
    pos0P, pCurr, dir, pos0PBase,
    loopViewI,
    pos0ViewI,
    pos0ItemP, pos0ItemI, pos0ItemHalfI,
    viewPosI, viewPosP,
    viewPBase, viewPCurr, viewP, viewI,
    viewItemI,
  }
}


