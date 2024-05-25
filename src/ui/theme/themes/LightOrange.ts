import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { LightPink } from 'src/ui/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightOrangeProps = { ...LightPink,
  statusBar: { ...LightPink.statusBar,
    bgc: ['#ffdb99'],
  },
  nav: { ...LightPink.nav,
    bgc: ['#ffdb99'],
  },
  
  containerAccent: { ...LightPink.containerAccent,
    bgc:     ['#fdca6d'],
  },
  
  buttonMain: { ...LightPink.buttonMain,
    bgc: ['#ff935e'],
    bgcFocus: ['#ff802a'],
  },
  buttonAccent: { ...LightPink.buttonAccent,
    bgc:       ['#fbb027'],
    bgcFocus:  ['#ffb833'],
  },
  inputRadio: { ...LightPink.inputRadio,
    bgcFocus:  ['#ffb833'],
  },
  buttonNav: { ...LightPink.buttonNav,
    bgcFocus:      ['#ffffff'],
    contentAccent: ['#ff802a'],
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
    accentColor: LightOrangeProps.buttonAccent.bgc[0],
    bgcColor1:   LightOrangeProps.buttonAccent.bgc[0],
    bgcColor2:   LightOrangeProps.containerNormal.bgc[0],
  })),
} satisfies Theme
