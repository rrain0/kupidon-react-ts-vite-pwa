import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { LightPinkProps } from 'src/ui-data/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const LightOrangeProps: ThemeProps = { ...LightPinkProps,
  
  statusBar: { ...LightPinkProps.statusBar,
    bg: ['#ffdb99'],
  },
  nav: { ...LightPinkProps.nav,
    bg: ['#ffdb99'],
  },
  navButton: { ...LightPinkProps.navButton,
    bgFocus:      ['#ffffff'],
    contentAccent: ['#ff802a'],
  },
  
  containerAccent: { ...LightPinkProps.containerAccent,
    bg:     ['#fdca6d'],
  },
  
  buttonMain: { ...LightPinkProps.buttonMain,
    bg: ['#ff935e'],
    bgFocus: ['#ff802a'],
  },
  buttonAccent: { ...LightPinkProps.buttonAccent,
    bg:       ['#fbb027'],
    bgFocus:  ['#ffb833'],
  },
  inputRadio: { ...LightPinkProps.inputRadio,
    bgFocus:  ['#ffb833'],
  },
  
  input: { ...LightPinkProps.input,
    border:      ['#ef7b7d', '#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheet: { ...LightPinkProps.bottomSheet,
    handle: ['#ff935e'],
  },
  
}



export const LightOrange = {
  ...LightOrangeProps,
  type: 'light',
  name: 'Light Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightOrangeProps.buttonAccent.bg[0],
    bgColor1:   LightOrangeProps.buttonAccent.bg[0],
    bgColor2:   LightOrangeProps.containerNormal.bg[0],
  })),
} satisfies Theme
