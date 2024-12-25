import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightPinkProps } from 'src/ui-data/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconGradientCss = AppTheme.themeIconGradientCss
import ThemeProps = AppTheme.ThemeProps




export const LightPinkGradientProps: ThemeProps = { ...LightPinkProps,
  
  page: { ...LightPinkProps.page,
    bgGradient: ['#ffaeba', '#f0f0f0', '#f0f0f0'],
    //bg: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  statusBar: { ...LightPinkProps.statusBar,
    bg: ['#ffaeba'],
  },
  
  inputRadio: { ...LightPinkProps.buttonMain,
    bgFocus:  ['#f37190'],
  },
}



export const LightPinkGradient = {
  ...LightPinkGradientProps,
  type: 'light',
  name: 'Light Pink Gradient' as const,
  icon: styled.div(themeIconGradientCss({
    accentColor: LightPinkGradientProps.buttonAccent.bg[0],
    bgColor1:   LightPinkGradientProps.buttonAccent.bg[0],
    bgColor2:   LightPinkGradientProps.boxNormal.bg2[0],
  })),
} satisfies Theme
