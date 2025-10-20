import { Theme } from '@emotion/react'
import { Interpolation } from '@emotion/serialize'
import styled from '@emotion/styled'
import { cssMax, cssPlus, cssToPx } from '@utils/css/cssUtils.ts'
import { flexStyle } from '@libs/style-as-short-props/style/flexStyle.ts'
import React, { CSSProperties } from 'react'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import { ReactU } from 'src/utils/react/ReactU'
import Children = ReactU.Children
import { Pu } from '@utils/base/tsUtils.ts'
import ClassStyle = ReactU.ClassStyle
import gridC = EmotionCommon.gridC
import noPointer = EmotionCommon.noPointer



export const colSmWMax = 518


export type PageContentLayoutProps = Pu<{
  col: boolean
  colSm: boolean
  full: boolean
  fullSm: boolean
  modalSm: boolean
  
  grow: number | string | boolean // true => flexGrow: 1
  
  noInsets: boolean
  noInsetsForFilledBars: boolean
  noInsetsForTransBars: boolean
  
  ptDefault: number | string
  pbDefault: number | string
  
  classNameInner: string
  styleInner: CSSProperties
  cssInner: Interpolation<Theme>
}> & ClassStyle & Children

export const PageContentLayout = React.memo((props: PageContentLayoutProps) => {
  const {
    className, style, children,
    classNameInner, styleInner, cssInner,
    
    col, colSm, full, fullSm, modalSm,
    
    grow,
    
    noInsets = modalSm,
    noInsetsForFilledBars = noInsets,
    noInsetsForTransBars = noInsets,
    
    ptDefault, pbDefault,
  } = props
  
  /* const type = (() => {
    if (col) return 'col' as const
    if (colSm) return 'colSm' as const
    if (full) return 'full' as const
    return 'col' as const
  })() */
    
  const pt = cssMax(
    !noInsets && !full && !fullSm && (cssToPx(ptDefault) ?? '30px'),
    cssPlus(
      !noInsetsForFilledBars && 'var(--top-action-bars-h)',
      !noInsetsForTransBars && !full && !fullSm && 'var(--top-floating-bar-h)'
    )
  )
  const pb = cssPlus(
    !noInsets && !full && !fullSm && (cssToPx(pbDefault) ?? '30px'),
    !noInsetsForFilledBars && 'var(--bottom-action-bars-h)',
    !noInsetsForTransBars && !full && !fullSm && 'var(--bottom-floating-bar-h)'
  )
  
  
  const Frame = (() => {
    if (full || fullSm || modalSm) return ContentFull
    if (col || colSm) return ContentCol
    return ContentCol
  })()
  const hasInner = fullSm || colSm || modalSm
  
  const ph = {
    '--pl': !noInsets ? '16px' : '',
    '--pr': !noInsets ? '16px' : '',
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
    <Frame grow={grow}
      data-display-name='PageContentLayout'
      css={[
        col && { ...ph, ...pv },
        full && pv,
        (fullSm || modalSm) && gridC,
        modalSm && noPointer,
      ]}
      className={className}
      style={style}
    >
      
      {hasInner && (() => {
        const Inner = (() => {
          if (fullSm || modalSm) return InnerFullSm
          if (colSm) return InnerColSm
          return InnerColSm
        })()
        return (
          <Inner grow={grow}
            data-display-name='PageContentInner'
            css={[
              colSm && { ...pv, ...ph },
              fullSm && pv,
              modalSm && noPointer,
              cssInner,
            ]}
            className={classNameInner}
            style={styleInner}
          >
            {children}
          </Inner>
        )
      })()}
      
      {!hasInner && children}
      
    </Frame>
  )
})
PageContentLayout.displayName = 'PageContentLayout'
export default PageContentLayout





const ContentCol = styled(Flex)(flexStyle({
  relative: true,
  fullW: true, wMin: 0, h: 'ct',
  col: true, g: 10,
}))

const ContentFull = styled(Flex)(flexStyle({
  relative: true, full: true,
}))



const InnerColSm = styled(Flex)(flexStyle({
  relative: true,
  fullW: true, wMax: colSmWMax, wMin: 0, h: 'fit-content',
  col: true, aligned: true, align: 'stretch',
}))

const InnerFullSm = styled(Flex)(flexStyle({
  relative: true,
  fullW: true, wMax: colSmWMax, wMin: 0, fullH: true,
}))






