import styled from '@emotion/styled'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import themeIconGradientCss = AppTheme.themeIconGradientCss




const LightPinkGradientProps = { ...LightPink,
  page: { ...LightPink.page,
    bgcGradient: ['#ffaeba','#f0f0f0','#f0f0f0'],
    //bgc: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  inputRadio: { ...LightPink.buttonMain,
    bgcFocus:  ['#f37190'],
  },
  card: { ...LightPink.card,
    bgc: ['#f5f5f577'],
  },
  statusBar: { ...LightPink.statusBar,
    bgc: ['#ffaeba'],
  },
  nav: { ...LightPink.nav,
    bgc: ['#f6d6db'],
  }
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
