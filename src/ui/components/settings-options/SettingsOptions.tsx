import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle.ts'
import { SvgIcStyle } from 'src/ui/elements/icons/SvgIcStyle.ts'
import row = EmotionCommon.row
import resetH = EmotionCommon.resetH





export namespace SettingsOptions {
  
  export const Header = styled.h5`
    ${resetH};
    padding: 8px 6px;
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
    ${SvgIcStyle.El.thiz.icon} {
      height: 1.3em;
      width: 1.333em;
      ${SvgIcStyle.Prop.prop.color}: ${ButtonStyle.Prop.color.sel()};
    }
  `
  export const iconSmall = (t:AppTheme.Theme)=>css`
    ${icon(t)};
    ${SvgIcStyle.El.thiz.icon} {
      height: 1.25em;
    }
  `
}

