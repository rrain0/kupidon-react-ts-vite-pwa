import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
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
    ${SvgIconS.El.icon.thiz()} {
      height: 1.3em;
      width: 1.333em;
      ${SvgIconS.El.icon.props.color.set(ButtonS.El00.root.props.color.var())}
    }
  `
  export const iconSmall = (t:AppTheme.Theme)=>css`
    ${icon(t)};
    ${SvgIconS.El.icon.thiz()} {
      height: 1.25em;
    }
  `
}

