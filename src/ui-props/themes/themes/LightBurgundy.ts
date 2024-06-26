import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { Light } from 'src/ui-props/themes/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightBurgundyProps = { ...Light,
  
  page: { ...Light.page,
    bgc:         ['#f5f5f5'],
    bgcGradient: ['#f5f5f5','#f5f5f5','#f5f5f5'],
    content:     ['#000000'],
  },
  statusBar: { ...Light.statusBar,
    bgc: ['#ffffff'],
  },
  nav: { ...Light.nav,
    bgc: ['#ffffff'],
  },
  navButton: { ...Light.navButton,
    bgcFocus:      ['#f0f0f0'],
    content:       ['#7b7b7b'],
    contentAccent: ['#BB2649'],
  },
  
  containerNormal: { ...Light.containerNormal,
    bgc:       ['#ffffff'],
    bgc2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
    contentAccent:    ['#ffdde5'],
    contentAccent2:   ['#F75F82'],
    contentAccent3:   ['#BB2649'],
  },
  containerAccent: { ...Light.containerAccent,
    bgc:      ['#bbbbbb'],
    bgc2:     ['#F75F82'],
    content:  ['#000000'],
    content2: ['#F8F8F8'],
  },
  
  buttonMain: { ...Light.buttonMain,
    bgc:       ['#F75F82'],
    bgcFocus:  ['#ff537a'],
    content:   ['#ffffff'],
  },
  buttonAccent: { ...Light.buttonAccent,
    bgc:           ['#F75F82'],
    content:       ['#ffffff'],
    bgcFocus:      ['#ff537a'],
    contentFocus:  ['#ffffff'],
  },
  buttonNormal: { ...Light.buttonNormal,
    bgc:           ['#bbbbbb'],
    content:       ['#000000'],
    bgcFocus:      ['#dddddd'],
    contentFocus:  ['#000000'],
  },
  buttonSecondary: { ...Light.buttonSecondary,
    bgc:       ['transparent'],
    bgcFocus:  ['#99999988'],
    content:   ['#bbbbbb'],
  },
  inputRadio: { ...Light.inputRadio,
    bgcFocus:  ['#7b7b7b']
  },
  buttonTransparent: { ...Light.buttonTransparent,
    bgcFocus: ['#00000011'],
  },
  
  iconGradient: { ...Light.iconGradient,
    content:       ['#BB2649', '#F75F82'],
  },
  
  input: { ...Light.input,
    bgc:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#ffced2'], //['#ff8787'],
  },
  
  rangePicker: { ...Light.rangePicker,
    trackBgc:      ['#ffdde5'],
    barBgc:        ['#F75F82'],
    handleBgc:     ['#F8F8F8'],
  },
  
  elementDisabled: { ...Light.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...Light.elementDanger,
    bgc:      ['#7b7b7b'],
    bgcFocus: ['#999999'],
    content:  ['#ffffff'],
  },
  elementError: { ...Light.elementError,
    bgc:      ['#ffced2'],
  },
  
  ripple: { ...Light.ripple,
    content:              ['#ffffff'],
    contentOnTransparent: ['#00000088'],
  },
  
  photos: { ...Light.photos,
    bgc:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#ffbaba'],
  },
  
  bottomSheet: { ...Light.bottomSheet,
    bgc:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...Light.toast,
    bgc:                  ['#ffffff'],
    content:              ['#757575'],
    content2:             ['#b2b2b2'],
    content3:             ['#000000'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBgc:     ['#e0e0e0'],
    accentLoadingContent: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: { ...Light.scrollbar,
    track:       ['#25283622'],
    thumb:       ['#25283644'],
    thumbActive: ['#999999'],
  },
}



export const LightBurgundy = {
  ...LightBurgundyProps,
  type: 'light',
  name: 'Light Burgundy' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightBurgundyProps.containerNormal.contentAccent3[0],
    bgcColor1:   LightBurgundyProps.containerNormal.contentAccent2[0],
    bgcColor2:   LightBurgundyProps.page.bgc[0],
  })),
} satisfies Theme

