import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-props/themes/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themeIconGradientCss = AppTheme.themeIconGradientCss





const DarkPinkGradientProps = { ...DarkPink,
  
  page: {
    ...DarkPink.page,
    bgcGradient: ['#992c46','#282c34','#282c34'],
    //bgc: ['#992c46','#282c34','#994500'],
  },
  statusBar: {
    ...DarkPink.statusBar,
    bgc: ['#992c46'],
  },
  nav: {
    ...DarkPink.nav,
    bgc: ['#282c34'],
  },
  navButton: {
    ...DarkPink.navButton,
    contentAccent: ['#d92a54'],
  },
  
  inputRadio: {
    ...DarkPink.buttonMain,
    bgcFocus:  ['#d16780'],
  },
}



export const DarkPinkGradient = {
  ...DarkPinkGradientProps,
  name: 'Dark Pink Gradient' as const,
  icon: styled.div(themeIconGradientCss({
    accentColor: DarkPinkGradientProps.buttonAccent.bgc[0],
    bgcColor1:   DarkPinkGradientProps.buttonAccent.bgc[0],
    bgcColor2:   DarkPinkGradientProps.page.bgc[0],
  })),
} satisfies Theme


