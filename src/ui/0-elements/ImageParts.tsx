import { css } from '@emotion/react'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { PieProgressStyle } from 'src/ui/0-elements/PieProgress/PieProgressStyle.ts'
import abs = EmotionCommon.abs
import flexC = EmotionCommon.flexC



export namespace ImageParts {
  
  export const placeholderBoxS = (t: AppTheme.Theme) => css`
    ${abs};
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
  
  
  
  export const pieProgressS = (t: AppTheme.Theme) => css`
    ${PieProgressStyle.El.thiz.pieProgress} {
      ${PieProgressStyle.Prop.prop.progressColor}: transparent;
      ${PieProgressStyle.Prop.prop.restColor}:     ${t.photos.ct};
      height: 30%;
      aspect-ratio: 1;
    }
  `
  export const pieProgressSmS = (t: AppTheme.Theme) => css`
    ${ImageParts.pieProgressS(t)};
    ${PieProgressStyle.El.thiz.pieProgress} {
      height: min(50%, 160px);
    }
  `
  export const pieProgressAccentS = (t: AppTheme.Theme) => css`
    ${ImageParts.pieProgressS(t)};
    ${PieProgressStyle.El.thiz.pieProgress} {
      ${PieProgressStyle.Prop.prop.restColor}: ${t.photos.bg};
    }
  `
  
}

