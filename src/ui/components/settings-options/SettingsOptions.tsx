import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import { SvgIconsStyle } from 'src/ui/elements/icons/SvgIcons/SvgIconsStyle.ts'
import row = EmotionCommon.row
import resetH = EmotionCommon.resetH
import center = EmotionCommon.center





export namespace SettingsOptions {
  
  export const Header = styled.h5`
    ${resetH};
    padding: 8px 6px;
    ${center};
    text-align: center;
  `
  export const Container = styled.div`
    flex: 1;
    padding-top: 4px;
    padding-bottom: 4px;
    ${row};
    gap: 0.3em;
    align-items: center;
  `
  export const FlagIcon = styled.img`
    width: 1.333em;
    aspect-ratio: 4/3;
    object-position: center;
    object-fit: cover;
    vertical-align: middle;
  `
  export const icon = (t:AppTheme.Theme)=>css`
    ${SvgIconsStyle.El.icon.thiz()} {
      height: 1.3em;
      width: 1.333em;
      ${SvgIconsStyle.El.icon.props.color.set(ButtonStyle.El0.root.props.color.var())}
    }
  `
  export const iconSmall = (t:AppTheme.Theme)=>css`
    ${icon(t)};
    ${SvgIconsStyle.El.icon.thiz()} {
      height: 1.25em;
    }
  `
}

