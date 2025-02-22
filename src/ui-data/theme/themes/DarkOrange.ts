import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkOrangeProps: ThemeProps = { ...DarkPink,
  
  statusBar: { ...DarkPink.statusBar,
    bg: '#dd8f2f',
  },
  nav: { ...DarkPink.nav,
    bg: '#282c34',
  },
  navButton: { ...DarkPink.navButton,
    cta: '#dd7b39',
  },
  
  boxAccent: { ...DarkPink.boxAccent,
    bg:           '#dd8f2f',
    ct:       '#000000',
    bgf:      '#f3b238',
    ctf:  '#000000',
  },
  boxAccent4: { ...DarkPink.boxAccent4,
    bg:     '#dd7b39',
  },
  
  buttonMain: { ...DarkPink.buttonMain,
    bg:      '#ff935e',
    ct:      '#000000',
    bgFc:    '#ff802a',
    ctFc:    '#000000',
  },
  inputRadio: { ...DarkPink.inputRadio,
    bgFc:  '#d9816f',
  },
  
  input: { ...DarkPink.input,
    borderGrad:      ['#ef7b7d', '#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheetHandle: { ...DarkPink.bottomSheetHandle,
    bg: '#ff935e',
  },
}



export const DarkOrange = {
  ...DarkOrangeProps,
  type: 'dark',
  name: 'Dark Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkOrangeProps.boxAccent.bg,
    bgColor1:    DarkOrangeProps.boxAccent.bg,
    bgColor2:    DarkOrangeProps.page.bg,
  })),
} satisfies Theme
