import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS'
import { PieProgressStyle } from 'src/ui/0-elements/PieProgress/PieProgressStyle'
import abs = EmotionCommon.abs
import center = EmotionCommon.center


export const imPlaceholderBoxS = (t: AppTheme.Theme) => css`
  ${abs};
  //pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  background: ${t.photos.bg[0]};
  ${center};
`

export const imPlaceholderIcS = (t: AppTheme.Theme) => css`
  ${SvgIconS.El.icon.thiz()} {
    ${SvgIconS.El.icon.props.color.set(t.photos.ct[0])}
    ${SvgIconS.El.icon.props.size.set('30%')}
  }
`

export const imSmallPlaceholderIcS = (t: AppTheme.Theme) => css`
  ${imPlaceholderIcS(t)};
  ${SvgIconS.El.icon.thiz()} {
    ${SvgIconS.El.icon.props.size.set('50%')}
  }
`

export const imPieProgressS = (t: AppTheme.Theme) => css`
  ${PieProgressStyle.El.thiz.pieProgress} {
    ${PieProgressStyle.Prop.prop.progressColor}: transparent;
    ${PieProgressStyle.Prop.prop.restColor}:     ${t.photos.ct[0]};
    height: 30%;
    aspect-ratio: 1;
  }
`

export const imSmallPieProgressS = (t: AppTheme.Theme) => css`
  ${imPieProgressS(t)};
  ${PieProgressStyle.El.thiz.pieProgress} {
    height: 50%;
  }
`

export const imPieProgressAccentS = (t: AppTheme.Theme) => css`
  ${imPieProgressS(t)};
  ${PieProgressStyle.El.thiz.pieProgress} {
    ${PieProgressStyle.Prop.prop.restColor}: ${t.photos.bg[0]};
  }
`
