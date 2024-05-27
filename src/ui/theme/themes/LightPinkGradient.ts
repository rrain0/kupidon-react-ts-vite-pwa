import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { LightPink } from 'src/ui/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconGradientCss = AppTheme.themeIconGradientCss




const LightPinkGradientProps = { ...LightPink,
  
  page: { ...LightPink.page,
    bgcGradient: ['#ffaeba','#f0f0f0','#f0f0f0'],
    //bgc: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  statusBar: { ...LightPink.statusBar,
    bgc: ['#ffaeba'],
  },
  
  inputRadio: { ...LightPink.buttonMain,
    bgcFocus:  ['#f37190'],
  },
}



export const LightPinkGradient = {
  ...LightPinkGradientProps,
  name: 'Light Pink Gradient' as const,
  icon: styled.div(themeIconGradientCss({
    accentColor: LightPinkGradientProps.buttonAccent.bgc[0],
    bgcColor1:   LightPinkGradientProps.buttonAccent.bgc[0],
    bgcColor2:   LightPinkGradientProps.containerNormal.bgc2[0],
  })),
} satisfies Theme
