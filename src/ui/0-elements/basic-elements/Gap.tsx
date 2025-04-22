import styled from '@emotion/styled'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu



export const Gap = styled.div<Pu<{ w: number, h: number }>>(p => ({
  ...p.w && { width: p.w },
  ...p.h && { height: p.h },
}))
Gap.displayName = 'Gap'