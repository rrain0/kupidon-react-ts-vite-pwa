import styled from '@emotion/styled'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { DarkPink } from 'src/utils/theme/themes/DarkPink'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkOrangeProps = { ...DarkPink,
  containerAccent: { ...DarkPink.containerAccent,
    bgc:     ['#dd7b39'],
  },
  
  buttonMain: { ...DarkPink.buttonMain,
    bgc: ['#ff935e'],
    bgcFocus: ['#ff802a'],
    content:  ['#000000'],
  },
  buttonAccent: { ...DarkPink.buttonAccent,
    bgc:       ['#dd8f2f'],
    bgcFocus:  ['#f3b238'],
    content:  ['#000000'],
  },
  inputRadio: { ...DarkPink.inputRadio,
    bgcFocus:  ['#d9816f'],
  },
  buttonNav: { ...DarkPink.buttonNav,
    contentAccent: ['#dd7b39'],
  },
  
  input: { ...DarkPink.input,
    border:      ['#ef7b7d','#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheet: { ...DarkPink.bottomSheet,
    handle: ['#ff935e'],
  },
  
  statusBar: { ...DarkPink.statusBar,
    bgc: ['#dd8f2f'],
  },
  nav: { ...DarkPink.nav,
    bgc: ['#282c34'],
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
