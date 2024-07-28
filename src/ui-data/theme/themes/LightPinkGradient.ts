import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { LightPink } from 'src/ui-data/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconGradientCss = AppTheme.themeIconGradientCss




const LightPinkGradientProps = { ...LightPink,
  
  page: { ...LightPink.page,
    bgGradient: ['#ffaeba','#f0f0f0','#f0f0f0'],
    //bg: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  statusBar: { ...LightPink.statusBar,
    bg: ['#ffaeba'],
  },
  
  inputRadio: { ...LightPink.buttonMain,
    bgFocus:  ['#f37190'],
  },
}



export const LightPinkGradient = {
  ...LightPinkGradientProps,
  name: 'Light Pink Gradient' as const,
  icon: styled.div(themeIconGradientCss({
    accentColor: LightPinkGradientProps.buttonAccent.bg[0],
    bgColor1:   LightPinkGradientProps.buttonAccent.bg[0],
    bgColor2:   LightPinkGradientProps.containerNormal.bg2[0],
  })),
} satisfies Theme
