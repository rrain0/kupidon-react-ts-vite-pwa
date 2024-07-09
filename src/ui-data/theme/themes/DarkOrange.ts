import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkOrangeProps = { ...DarkPink,
  
  statusBar: { ...DarkPink.statusBar,
    bgc: ['#dd8f2f'],
  },
  nav: { ...DarkPink.nav,
    bgc: ['#282c34'],
  },
  navButton: { ...DarkPink.navButton,
    contentAccent: ['#dd7b39'],
  },
  
  containerAccent: { ...DarkPink.containerAccent,
    bgc:     ['#dd7b39'],
  },
  
  buttonMain: { ...DarkPink.buttonMain,
    bgc: ['#ff935e'],
    bgcFocus: ['#ff802a'],
    content:  ['#000000'],
  },
  buttonAccent: { ...DarkPink.buttonAccent,
    bgc:           ['#dd8f2f'],
    content:       ['#000000'],
    bgcFocus:      ['#f3b238'],
    contentFocus:  ['#000000'],
  },
  inputRadio: { ...DarkPink.inputRadio,
    bgcFocus:  ['#d9816f'],
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
    accentColor: DarkOrangeProps.buttonAccent.bgc[0],
    bgcColor1:   DarkOrangeProps.buttonAccent.bgc[0],
    bgcColor2:   DarkOrangeProps.page.bgc[0],
  })),
} satisfies Theme
