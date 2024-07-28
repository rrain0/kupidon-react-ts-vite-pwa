import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { LightPink } from 'src/ui-data/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightOrangeProps = { ...LightPink,
  
  statusBar: { ...LightPink.statusBar,
    bg: ['#ffdb99'],
  },
  nav: { ...LightPink.nav,
    bg: ['#ffdb99'],
  },
  navButton: { ...LightPink.navButton,
    bgFocus:      ['#ffffff'],
    contentAccent: ['#ff802a'],
  },
  
  containerAccent: { ...LightPink.containerAccent,
    bg:     ['#fdca6d'],
  },
  
  buttonMain: { ...LightPink.buttonMain,
    bg: ['#ff935e'],
    bgFocus: ['#ff802a'],
  },
  buttonAccent: { ...LightPink.buttonAccent,
    bg:       ['#fbb027'],
    bgFocus:  ['#ffb833'],
  },
  inputRadio: { ...LightPink.inputRadio,
    bgFocus:  ['#ffb833'],
  },
  
  input: { ...LightPink.input,
    border:      ['#ef7b7d','#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheet: { ...LightPink.bottomSheet,
    handle: ['#ff935e'],
  },
  
}



export const LightOrange = {
  ...LightOrangeProps,
  name: 'Light Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightOrangeProps.buttonAccent.bg[0],
    bgColor1:   LightOrangeProps.buttonAccent.bg[0],
    bgColor2:   LightOrangeProps.containerNormal.bg[0],
  })),
} satisfies Theme
