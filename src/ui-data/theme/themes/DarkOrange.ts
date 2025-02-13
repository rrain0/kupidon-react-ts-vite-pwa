import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkPinkProps } from 'src/ui-data/theme/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkOrangeProps: ThemeProps = { ...DarkPinkProps,
  
  statusBar: { ...DarkPinkProps.statusBar,
    bg: '#dd8f2f',
  },
  nav: { ...DarkPinkProps.nav,
    bg: '#282c34',
  },
  navButton: { ...DarkPinkProps.navButton,
    cta: '#dd7b39',
  },
  
  boxAccent: { ...DarkPinkProps.boxAccent,
    bg:     ['#dd7b39'],
  },
  
  buttonMain: { ...DarkPinkProps.buttonMain,
    bg:      ['#ff935e'],
    ct:      ['#000000'],
    bgFc:    '#ff802a',
    ctFc:    '#000000',
  },
  buttonAccent: { ...DarkPinkProps.buttonAccent,
    bg:           ['#dd8f2f'],
    ct:       ['#000000'],
    bgFc:      '#f3b238',
    ctFc:  '#000000',
  },
  inputRadio: { ...DarkPinkProps.inputRadio,
    bgFc:  '#d9816f',
  },
  
  input: { ...DarkPinkProps.input,
    borderGrad:      ['#ef7b7d', '#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheetHandle: { ...DarkPinkProps.bottomSheetHandle,
    bg: '#ff935e',
  },
}



export const DarkOrange = {
  ...DarkOrangeProps,
  type: 'dark',
  name: 'Dark Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkOrangeProps.buttonAccent.bg[0],
    bgColor1:   DarkOrangeProps.buttonAccent.bg[0],
    bgColor2:   DarkOrangeProps.page.bg,
  })),
} satisfies Theme
