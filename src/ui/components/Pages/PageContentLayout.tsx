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






export type PageContentLayoutProps = Pu<{
  col: boolean
  colSm: boolean
  
  noInsetsForFilledBars: boolean
  noInsetsForTransBars: boolean
  noInsets: boolean
  
  innerClassName: string
  innerStyle: CSSProperties
}> & ClassStyle & Children

export const PageContentLayout = React.memo((props: PageContentLayoutProps) => {
  const {
    className,
    style,
    children,
    
    col,
    colSm,
    
    noInsetsForFilledBars,
    noInsetsForTransBars,
    noInsets,
    
    innerClassName,
    innerStyle,
  } = props
    
  const pt = CssU.max(!noInsets && '30px', CssU.plus(
    !noInsetsForFilledBars && !noInsets && 'var(--top-bars-inset)',
    !noInsetsForTransBars && !noInsets && 'var(--top-button-bar-height)'
  ))
  const pb = CssU.plus(
    !noInsets && '30px',
    !noInsetsForFilledBars && !noInsets && 'var(--bottom-bars-inset)',
    !noInsetsForTransBars && !noInsets && 'var(--bottom-button-bar-height)'
  )
  
  return (
    <ContentCol
      data-display-name="PageContentLayout"
      className={className}
      style={{
        paddingTop: pt,
        paddingBottom: pb,
        ...style,
      }}
    >
      {(() => {
        const Col2 = colSm ? ColSm : React.Fragment
        return (
          <Col2
            className={innerClassName}
            style={innerStyle}
          >
            {children}
          </Col2>
        )
      })()}
    </ContentCol>
  )
})
PageContentLayout.displayName = 'PageContentLayout'
export default PageContentLayout





const ContentCol = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  height: fit-content;
  padding-left: 16px;
  padding-right: 16px;
  ${col};
  gap: 10px;
`

const ColSm = styled(ContentCol)`
  position: relative;
  width: 100%;
  max-width: 550px;
  min-width: 0;
  height: fit-content;
  align-self: center;
  align-items: stretch;
`





