import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightPink } from 'src/ui-data/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themegradIconCss = AppTheme.themegradIconCss
import ThemeProps = AppTheme.ThemeProps




export const LightPinkGradientProps: ThemeProps = { ...LightPink,
  
  page: { ...LightPink.page,
    bgGrad: ['#ffaeba', '#f0f0f0', '#f0f0f0'],
    //bg: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  statusBar: { ...LightPink.statusBar,
    bg: '#ffaeba',
  },
  
  inputRadio: { ...LightPink.buttonMain,
    bgFc:  '#f37190',
  },
}



export const LightPinkGradient = {
  ...LightPinkGradientProps,
  type: 'light',
  name: 'Light Pink Gradient' as const,
  icon: styled.div(themegradIconCss({
    accentColor: LightPinkGradientProps.boxAccent.bg,
    bgColor1:    LightPinkGradientProps.boxAccent.bg,
    bgColor2:    LightPinkGradientProps.boxNormal.bg2,
  })),
} satisfies Theme
