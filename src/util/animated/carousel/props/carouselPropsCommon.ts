import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Setter = TypeU.Setter





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





export type GetIndexesPropsProps = {
  startViewI: number
  viewsCnt: number
  startItemI: number
  itemsCnt: number
}
export const getIndexesProps = ({
  startViewI, viewsCnt, startItemI, itemsCnt,
}: GetIndexesPropsProps) => {
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





export type MergeProgressProps = {
  startViewI: number
  viewsCnt: number
  startItemI: number
  itemsCnt: number
  startP: number
  startItemP: number
  deltaP: number
  setStartProgress: Setter<number>
  setStartItemProgress: Setter<number>
  setDeltaProgress: Setter<number>
  noLoop?: boolean | undefined
}
export type MergeProgressCallback = (props: MergeProgressProps) => void