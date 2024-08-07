import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightBurgundyProps = { ...Light,
  
  page: { ...Light.page,
    bg:         ['#f5f5f5'],
    bgGradient: ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
    content:     ['#000000'],
  },
  statusBar: { ...Light.statusBar,
    bg: ['#ffffff'],
  },
  nav: { ...Light.nav,
    bg: ['#ffffff'],
  },
  navButton: { ...Light.navButton,
    bgFocus:      ['#f0f0f0'],
    content:       ['#7b7b7b'],
    contentAccent: ['#BB2649'],
  },
  
  containerNormal: { ...Light.containerNormal,
    bg:       ['#ffffff'],
    bg2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
    contentAccent:    ['#ffdde5'],
    contentAccent2:   ['#F75F82'],
    contentAccent3:   ['#BB2649'],
  },
  containerAccent: { ...Light.containerAccent,
    bg:      ['#bbbbbb'],
    bg2:     ['#F75F82'],
    content:  ['#000000'],
    content2: ['#F8F8F8'],
  },
  
  buttonMain: { ...Light.buttonMain,
    bg:       ['#F75F82'],
    bgFocus:  ['#ff537a'],
    content:   ['#ffffff'],
  },
  buttonAccent: { ...Light.buttonAccent,
    bg:           ['#F75F82'],
    content:       ['#ffffff'],
    bgFocus:      ['#ff537a'],
    contentFocus:  ['#ffffff'],
  },
  buttonNormal: { ...Light.buttonNormal,
    bg:           ['#bbbbbb'],
    content:       ['#000000'],
    bgFocus:      ['#dddddd'],
    contentFocus:  ['#000000'],
  },
  buttonSecondary: { ...Light.buttonSecondary,
    bg:       ['transparent'],
    bgFocus:  ['#99999988'],
    content:   ['#bbbbbb'],
  },
  inputRadio: { ...Light.inputRadio,
    bgFocus:  ['#7b7b7b'],
  },
  buttonTransparent: { ...Light.buttonTransparent,
    bgFocus: ['#00000011'],
  },
  
  iconGradient: { ...Light.iconGradient,
    content:       ['#BB2649', '#F75F82'],
  },
  
  input: { ...Light.input,
    bg:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:      ['#ffced2'], //['#ff8787'],
  },
  
  rangePicker: { ...Light.rangePicker,
    trackBg:      ['#ffdde5'],
    barBg:        ['#F75F82'],
    handleBg:     ['#F8F8F8'],
  },
  
  elementDisabled: { ...Light.elementDisabled,
    bg:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...Light.elementDanger,
    bg:      ['#7b7b7b'],
    bgFocus: ['#999999'],
    content:  ['#ffffff'],
  },
  elementError: { ...Light.elementError,
    bg:      ['#ffced2'],
  },
  
  ripple: { ...Light.ripple,
    content:              ['#ffffff'],
    contentOnTransparent: ['#666666'],
  },
  
  photos: { ...Light.photos,
    bg:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffbaba'],
  },
  
  bottomSheet: { ...Light.bottomSheet,
    bg:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...Light.toast,
    bg:                  ['#ffffff'],
    content:              ['#757575'],
    content2:             ['#b2b2b2'],
    content3:             ['#000000'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:     ['#e0e0e0'],
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
    bgColor1:   LightBurgundyProps.containerNormal.contentAccent2[0],
    bgColor2:   LightBurgundyProps.page.bg[0],
  })),
} satisfies Theme

