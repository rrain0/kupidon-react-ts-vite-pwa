import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import isdef = TypeU.isdef
import mapBool = TypeU.mapBool



const Gap = styled.div<Pu<{
  w: number | string
  h: number | string
  wMin: number | string
  hMin: number | string
  grow: number | string | boolean
}>>(p => ({
  width: p.w,
  height: p.h,
  minWidth: p.wMin,
  minHeight: p.hMin,
  flexGrow: mapBool(p.grow, 1),
}))
Gap.displayName = 'Gap'
export default Gap