import { MathU } from 'src/util/common/MathU.ts'
import { RangeU } from 'src/util/common/RangeU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import Setter = TypeU.Setter
import rf3 = MathU.rf3





export type GetCarouselProps = {
  startP: number
  startItemP: number
  deltaP: number
  itemsCnt: number
  viewsCnt: number
  viewFirstI: number
  currViewI?: number | undefined
  //itemFirstI?: number | undefined
}





export type GetIndexesPropsProps = {
  viewFirstI: number
  viewsCnt: number
  //itemFirstI: number
  itemsCnt: number
}
export const getIndexesProps = ({
  viewFirstI, viewsCnt, /* itemFirstI, */ itemsCnt,
}: GetIndexesPropsProps) => {
  const viewEndI = viewFirstI + viewsCnt
  const viewLastI = viewEndI - 1
  const viewFirstP = viewFirstI * 100
  const viewEndP = viewEndI * 100
  const viewLastP = viewLastI * 100
  const loopViewI = (v: number) => rf3(RangeU.loop(v, [viewFirstI, viewEndI]))
  const loopViewP = (v: number) => rf3(RangeU.loop(v, [viewFirstP, viewEndP]))
  const clampViewP = (v: number) => rf3(RangeU.clamp(v, [viewFirstP, viewLastP]))
  
  const itemFirstI = 0
  const itemEndI = itemsCnt <= 0 ? 1 : itemsCnt
  const itemLastI = itemEndI - 1
  const itemFirstP = itemFirstI * 100
  const itemEndP = itemEndI * 100
  const itemLastP = itemLastI * 100
  const loopItemI = (v: number) => rf3(RangeU.loop(v, [0, itemEndI]))
  const loopItemP = (v: number) => rf3(RangeU.loop(v, [0, itemEndP]))
  const clampItemP = (v: number) => rf3(RangeU.clamp(v, [0, itemLastP]))
  
  return {
    viewFirstI, viewEndI, viewLastI, viewFirstP, viewEndP, viewLastP,
    loopViewI, loopViewP, clampViewP,
    itemFirstI, itemEndI, itemLastI, itemFirstP, itemEndP, itemLastP,
    loopItemI, loopItemP, clampItemP,
  }
}





export type MergeProgressProps = {
  viewFirstI: number
  viewsCnt: number
  //itemFirstI: number
  itemsCnt: number
  startP: number
  startItemP: number
  deltaP: number
  noLoop?: boolean | undefined
}
export type MergeProgressResult = {
  startP: number
  startItemP: number
  deltaP: number
}
export type MergeProgressCallback = (props: MergeProgressProps) => MergeProgressResult