import { css } from '@emotion/react'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import { PieProgressCssProps } from 'src/components/elems/PieProgress/PieProgress.tsx'
import absTlwh = EmotionCommon.absTlwh
import flexC = EmotionCommon.flexC



export namespace ImageParts {
  
  export const placeholderBoxS = (t: AppTheme.Theme) => css`
    ${absTlwh};
    //pointer-events: none;
    border-radius: inherit;
    overflow: hidden;
    background-color: ${t.photos.bg};
    ${flexC};
  `
  
  
  export const placeholderIcS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
    iconSz: '30%',
    iconColor: t.photos.ct,
  }]
  export const placeholderIcSmS: AppWidgetStyle = [ImageParts.placeholderIcS, {
    iconSz: '50%',
  }]
  export const placeholderIcSmFullTrans: AppWidgetStyle = t => [
    IconButtonS6.S.trans.round.lg2.secondary, {
      buttonSz: 'full',
      iconSz: '50%',
      iconColor: t.photos.ct,
    },
  ]
  
  
  
  export const documentErrorIcS: AppWidgetStyle = t => [ImageParts.placeholderIcS, {
    icon: { sz: '50%', mr: -2, color: t.errorSec.ct },
  }]
  
  
  
  export const pieProgressS = (t: AppTheme.Theme) => css({
    height: '30%',
    aspectRatio: 1,
    ...PieProgressCssProps.map({
      colorAccent: t.photos.ct,
      color: 'transparent',
    }),
  })
  export const pieProgressSmS = (t: AppTheme.Theme) => [
    ImageParts.pieProgressS(t), css({
      height: 'min(50%, 160px)',
    }),
  ]
  export const pieProgressAccentS = (t: AppTheme.Theme) => [
    ImageParts.pieProgressS(t), css({
      ...PieProgressCssProps.map({ color: t.photos.bg }),
    }),
  ]
  
}

