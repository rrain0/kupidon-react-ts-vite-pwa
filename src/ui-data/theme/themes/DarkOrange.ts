import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkOrangeProps = { ...DarkPink,
  
  statusBar: { ...DarkPink.statusBar,
    bg: ['#dd8f2f'],
  },
  nav: { ...DarkPink.nav,
    bg: ['#282c34'],
  },
  navButton: { ...DarkPink.navButton,
    contentAccent: ['#dd7b39'],
  },
  
  containerAccent: { ...DarkPink.containerAccent,
    bg:     ['#dd7b39'],
  },
  
  buttonMain: { ...DarkPink.buttonMain,
    bg: ['#ff935e'],
    bgFocus: ['#ff802a'],
    content:  ['#000000'],
  },
  buttonAccent: { ...DarkPink.buttonAccent,
    bg:           ['#dd8f2f'],
    content:       ['#000000'],
    bgFocus:      ['#f3b238'],
    contentFocus:  ['#000000'],
  },
  inputRadio: { ...DarkPink.inputRadio,
    bgFocus:  ['#d9816f'],
  },
  
  input: { ...DarkPink.input,
    border:      ['#ef7b7d','#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheet: { ...DarkPink.bottomSheet,
    handle: ['#ff935e'],
  },
}



export const DarkOrange = {
  ...DarkOrangeProps,
  name: 'Dark Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkOrangeProps.buttonAccent.bg[0],
    bgColor1:   DarkOrangeProps.buttonAccent.bg[0],
    bgColor2:   DarkOrangeProps.page.bg[0],
  })),
} satisfies Theme
