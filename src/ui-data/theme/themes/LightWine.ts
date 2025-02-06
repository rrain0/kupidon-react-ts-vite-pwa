import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightProps } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps


/*
const colors = {
  accent:        '#BB2649',
  accentLight10: '#F75F82',
  accentLight20: '#ffdde5',
} as const
*/


export const LightWineProps: ThemeProps = { ...LightProps,
  
  page: { ...LightProps.page,
    bg:         '#f5f5f5',
    bgGrad: ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
  },
  statusBar: { ...LightProps.statusBar,
    bg: '#f5f5f5',
  },
  nav: { ...LightProps.nav,
    bg: '#ffffff',
  },
  navButton: { ...LightProps.navButton,
    bgFc:  ['#f0f0f0'],
    ct:       ['#7b7b7b'],
    cta:      '#BB2649',
  },
  
  
  
  boxNormal: { ...LightProps.boxNormal },
  boxAccent: { ...LightProps.boxAccent,
    bg:        ['#bbbbbb'],
    bg3:       '#e8204f',
    ct:        ['#000000'],
    ct2:       ['#F8F8F8'],
    ct3:       '#ffffff',
    // cta:    '#ffdde5',
    // cta2:   '#dd2e57',
    // cta3:   '#BB2649',
  },
  
  
  
  buttonNormal: { ...LightProps.buttonNormal,
    bg:            ['#bbbbbb'],
    bg2:           '#ffdde5',
    ct:            ['#000000'],
    bgFc:          ['#dddddd'],
    bgFc2:         '#ffc4d2',
    ctFc:          '#000000',
  },
  buttonMain: { ...LightProps.buttonMain,
    bg:        ['#e8204f'],
    ct:        ['#ffffff'],
    bgFc:   ['#f63562'],
    ctFc:      '#ffffff',
  },
  buttonAccent: { ...LightProps.buttonAccent,
    bg:            ['#cb3357'],
    ct:            ['#ffffff'],
    bgFc:          ['#e83f66'],
    ctFc:          '#ffffff',
  },
  buttonAccent2: {
    bg:            '#bb2649',
    ct:            '#ffffff',
    bgFc:          '#e83f66',
    ctFc:          '#ffffff',
  },
  buttonAccent3: {
    bg:            '#F59CB1',
    ct:            '#ffffff',
    bgFc:          '#f6839e',
    ctFc:          '#ffffff',
  },
  buttonSecondary: { ...LightProps.buttonSecondary,
    bg:            ['transparent'],
    bgFc:       ['#99999988'],
    ct:            ['#bbbbbb'],
  },
  
  ripple: { ...LightProps.ripple },
  
  
  inputRadio: { ...LightProps.inputRadio,
    bgFc:   ['#7b7b7b'],
  },
  buttonTrans: { ...LightProps.buttonTrans,
    bgFc:   ['#00000011'],
  },
  
  
  
  gradIcon: { ...LightProps.gradIcon,
    ct:       ['#BB2649', '#F75F82'],
  },
  
  
  
  input: { ...LightProps.input,
    bg:            ['#F8F8F8'],
    ct:            ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:       ['#ffced2'], //['#ff8787'],
  },
  
  rangePicker: { ...LightProps.rangePicker,
    trackBg:       ['#ffdde5'],
    barBg:         ['#bb2649'],
    handleBg:      ['#F8F8F8'],
  },
  
  elementDisabled: { ...LightProps.elementDisabled,
    bg:       ['#DCDCDC'],
    ct:  ['#555555'],
  },
  elementDanger: { ...LightProps.elementDanger,
    bg:       ['#7b7b7b'],
    bgFc:  ['#999999'],
    ct:  ['#ffffff'],
  },
  elementError: { ...LightProps.elementError,
    bg:       ['#ffced2'],
  },
  
  
  
  previewButtonNorm: { ...LightProps.previewButtonNorm },
  previewButtonMain: { ...LightProps.previewButtonMain,
    bg:        '#e9456b',
    bgGrad:    ['#D01944', '#F75F82'],
    ct:        '#ffffff',
    ctRipple:  '#bb264966',
  },
  previewFullInfoBox: { ...LightProps.previewFullInfoBox },
  previewFullInfoBubble: { ...LightProps.previewFullInfoBubble,
    bgMainGrad: ['#BB2649', '#F75F82'],
  },
  previewPhotosProgress: { ...LightProps.previewPhotosProgress },
  
  
  
  photos: { ...LightProps.photos,
    bg:                      ['#ffeeee'],
    ct:                      ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:        ['#8B8B8B'],
    highlightFrameAccentBg:  ['#ffbaba'],
  },
  
  bottomSheet: { ...LightProps.bottomSheet },
  bottomSheetHandle: { ...LightProps.bottomSheetHandle },
  
  toast: { ...LightProps.toast,
    bg:                   ['#ffffff'],
    ct:                   ['#757575'],
    ct2:                  ['#b2b2b2'],
    ct3:                  '#000000',
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:      ['#e0e0e0'],
    accentLoadingCt:      ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: { ...LightProps.scrollbar,
    track:       ['#25283622'],
    thumb:       ['#25283644'],
    thumbActive: ['#999999'],
  },
}



export const LightWine = {
  ...LightWineProps,
  type: 'light',
  name: 'Light Wine' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightWineProps.boxNormal.cta3,
    bgColor1:   LightWineProps.boxNormal.cta2,
    bgColor2:   LightWineProps.page.bg,
  })),
} satisfies Theme

