import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightPinkProps } from 'src/ui-data/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const LightOrangeProps: ThemeProps = { ...LightPinkProps,
  
  statusBar: { ...LightPinkProps.statusBar,
    bg: '#ffdb99',
  },
  nav: { ...LightPinkProps.nav,
    bg: '#ffdb99',
  },
  navButton: { ...LightPinkProps.navButton,
    bgFc:      ['#ffffff'],
    cta: '#ff802a',
  },
  
  boxAccent: { ...LightPinkProps.boxAccent,
    bg:     ['#fdca6d'],
  },
  
  buttonMain: { ...LightPinkProps.buttonMain,
    bg:      ['#ff935e'],
    bgFc: ['#ff802a'],
  },
  buttonAccent: { ...LightPinkProps.buttonAccent,
    bg:       ['#fbb027'],
    bgFc:  ['#ffb833'],
  },
  inputRadio: { ...LightPinkProps.inputRadio,
    bgFc:  ['#ffb833'],
  },
  
  input: { ...LightPinkProps.input,
    border:      ['#ef7b7d', '#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheetHandle: { ...LightPinkProps.bottomSheetHandle,
    bg:       '#ff935e',
  },
  
}



export const LightOrange = {
  ...LightOrangeProps,
  type: 'light',
  name: 'Light Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightOrangeProps.buttonAccent.bg[0],
    bgColor1:   LightOrangeProps.buttonAccent.bg[0],
    bgColor2:   LightOrangeProps.boxNormal.bg[0],
  })),
} satisfies Theme
