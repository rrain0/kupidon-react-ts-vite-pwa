import { css } from '@emotion/react'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon'
import { AppTheme } from 'src/ui-data/theme/AppTheme'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/style/SvgIconS'
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
    ${SvgIconS.El.icon.props.color.set(t.photos.content[0])}
    ${SvgIconS.El.icon.props.size.set('30%')}
  }
`

