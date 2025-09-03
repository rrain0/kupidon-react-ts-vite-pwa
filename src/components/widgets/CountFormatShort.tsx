import { StringU } from '@utils/base/StringU.ts'
import React from 'react'
import { TypeU } from '@utils/base/TypeU'
import Pu = TypeU.Pu
import trimDotZerosEnd = StringU.trimDotZerosEnd




export type CountFormatShortProps = {
  children: number
} & Pu<{
  hideZero: boolean
  addPlus: boolean
}>



const CountFormatShort = React.memo((props: CountFormatShortProps) => {
  const { children: cnt, hideZero, addPlus } = props
  const absCnt = Math.abs(cnt)
  
  let uiCnt = (() => {
    if (absCnt >= 1e8) return '∞'
    if (absCnt >= 1e6) return trimDotZerosEnd((absCnt / 1e6).toFixed(1)) + 'M'
    if (absCnt >= 1e3) return trimDotZerosEnd((absCnt / 1e3).toFixed(1)) + 'k'
    if (cnt > 0) return `${cnt}`
    if (cnt === 0) {
      if (!hideZero) return `${cnt}`
    }
    return ''
  })()
  
  if (uiCnt && cnt > 0 && addPlus) uiCnt = `+${uiCnt}`
  if (uiCnt && cnt < 0) uiCnt = `-${uiCnt}`
  
  return uiCnt
})
CountFormatShort.displayName = 'CountFormatShort'
export default CountFormatShort

