import styled from '@emotion/styled'
import { CssU } from '@util/css/CssU.ts'
import React, { CSSProperties } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ReactU } from 'src/util/react/ReactU'
import { TypeU } from 'src/util/common/TypeU'
import Children = ReactU.Children
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle
import col = EmotionCommon.col
import full = EmotionCommon.full



const colSmWMax = 518


export type PageContentLayoutProps = Pu<{
  col: boolean
  colSm: boolean
  full: boolean
  
  noInsetsForFilledBars: boolean
  noInsetsForTransBars: boolean
  noInsets: boolean
  
  classNameForInner: string
  styleForInner: CSSProperties
}> & ClassStyle & Children

export const PageContentLayout = React.memo((props: PageContentLayoutProps) => {
  const {
    className, style, children,
    
    col, colSm, full,
    
    noInsetsForFilledBars,
    noInsetsForTransBars,
    noInsets,
    
    classNameForInner,
    styleForInner,
  } = props
  
  /* const type = (() => {
    if (col) return 'col' as const
    if (colSm) return 'colSm' as const
    if (full) return 'full' as const
    return 'col' as const
  })() */
    
  const pt = CssU.max(!noInsets && !full && '30px', CssU.plus(
    !noInsetsForFilledBars && !noInsets && 'var(--top-bars-inset)',
    !noInsetsForTransBars && !noInsets && !full && 'var(--top-button-bar-height)'
  ))
  const pb = CssU.plus(
    !noInsets && !full && '30px',
    !noInsetsForFilledBars && !noInsets && 'var(--bottom-bars-inset)',
    !noInsetsForTransBars && !noInsets && !full && 'var(--bottom-button-bar-height)'
  )
  
  
  const Col = full ? ContentFull : ContentCol
  const ph = {
    '--pl': '16px',
    '--pr': '16px',
    paddingLeft: 'var(--pl)',
    paddingRight: 'var(--pr)',
  }
  const pv = {
    '--pt': pt,
    '--pb': pb,
    paddingTop: 'var(--pt)',
    paddingBottom: 'var(--pb)',
  }
  
  return (
    <Col
      data-display-name='PageContentLayout'
      className={className}
      style={{
        ...col && { ...ph, ...pv },
        ...full && pv,
        ...style,
      }}
    >
      {colSm && (
        <ColSm
          data-display-name='ColInner'
          className={classNameForInner}
          style={{
            ...pv, ...ph,
            ...styleForInner,
          }}
        >
          {children}
        </ColSm>
      )}
      {!colSm && children}
    </Col>
  )
})
PageContentLayout.displayName = 'PageContentLayout'
export default PageContentLayout





const ContentCol = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  height: fit-content;
  ${col};
  gap: 10px;
`

const ColSm = styled.div`
  position: relative;
  width: 100%;
  max-width: ${colSmWMax}px;
  min-width: 0;
  height: fit-content;
  align-self: center;
  ${col};
  align-items: stretch;
`

const ContentFull = styled.div`
  position: relative;
  ${full};
`





