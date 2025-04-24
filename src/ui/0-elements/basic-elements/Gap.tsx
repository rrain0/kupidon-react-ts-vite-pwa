import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import isdef = TypeU.isdef



export const Gap = styled.div<Pu<{ w: number, h: number }>>(p => ({
  ...isdef(p.w) && { width: p.w },
  ...isdef(p.h) && { height: p.h },
}))
Gap.displayName = 'Gap'