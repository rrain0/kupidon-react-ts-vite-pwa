import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import notundef = TypeU.notundef



export const Gap = styled.div<Pu<{ w: number, h: number }>>(p => ({
  ...notundef(p.w) && { width: p.w },
  ...notundef(p.h) && { height: p.h },
}))
Gap.displayName = 'Gap'