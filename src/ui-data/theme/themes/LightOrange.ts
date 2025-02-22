import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightPink } from 'src/ui-data/theme/themes/LightPink.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const LightOrangeProps: ThemeProps = { ...LightPink,
  
  statusBar: { ...LightPink.statusBar,
    bg: '#ffdb99',
  },
  nav: { ...LightPink.nav,
    bg: '#ffdb99',
  },
  navButton: { ...LightPink.navButton,
    bgFc:      '#ffffff',
    cta: '#ff802a',
  },
  
  boxAccent: { ...LightPink.boxAccent,
    bg:       '#fbb027',
    bgf:  '#ffb833',
  },
  boxAccent4: { ...LightPink.boxAccent4,
    bg:     '#fdca6d',
  },
  
  buttonMain: { ...LightPink.buttonMain,
    bg:      '#ff935e',
    bgFc: '#ff802a',
  },
  inputRadio: { ...LightPink.inputRadio,
    bgFc:  '#ffb833',
  },
  
  input: { ...LightPink.input,
    borderGrad:      ['#ef7b7d', '#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheetHandle: { ...LightPink.bottomSheetHandle,
    bg:       '#ff935e',
  },
  
}



export const LightOrange = {
  ...LightOrangeProps,
  type: 'light',
  name: 'Light Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightOrangeProps.boxAccent.bg,
    bgColor1:   LightOrangeProps.boxAccent.bg,
    bgColor2:   LightOrangeProps.boxNormal.bg,
  })),
} satisfies Theme
