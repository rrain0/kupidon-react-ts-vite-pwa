import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.ts'
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


export const LightWineProps: ThemeProps = { ...Light,
  
  page: { ...Light.page,
    bg:           '#f5f5f5',
    bgGrad:       ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
  },
  statusBar: { ...Light.statusBar,
    bg:           '#f5f5f5',
  },
  nav: { ...Light.nav,
    bg:           '#ffffff',
  },
  navButton: { ...Light.navButton,
    bgFc:         '#f0f0f0',
    ct:           '#7b7b7b',
    cta:          '#BB2649',
  },
  
  
  
  boxAccent: { ...Light.boxAccent,
    bg:           '#cb3357',
    ct:           '#ffffff',
    bgf:          '#e83f66',
    ctf:          '#ffffff',
  },
  boxAccentCt: { ...Light.boxAccentCt,
    bg:           'transparent',
    ct:           '#cb3357',
    bgf:          '#ffedf2',
    ctf:          '#cb3357',
    ctRipple:     '#ffd0db88',
  },
  boxAccent4: { ...Light.boxAccent4,
    bg:          '#BB2649',
    ct:          '#ffffff',
    // cta:    '#ffdde5',
    // cta2:   '#dd2e57',
    // cta3:   '#BB2649',
  },
  boxAccentCt4: { ...Light.boxAccentCt4,
    ct:           '#BB2649',
    ctGrad:       ['#BB2649', '#F75F82'],
    ctf:          '#BB2649',
  },
  boxAccent5: { ...Light.boxAccent5,
    ct:           '#e8204f',
  },
  
  
  
  buttonNormal: { ...Light.buttonNormal,
    bg:            '#bbbbbb',
    bg2:           '#ffdde5',
    ct:            '#000000',
    bgFc:          '#dddddd',
    bgFc2:         '#ffc4d2',
    ctFc:          '#000000',
  },
  buttonMain: { ...Light.buttonMain,
    bg:        '#e8204f',
    ct:        '#ffffff',
    bgFc:      '#f63562',
    ctFc:      '#ffffff',
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
  buttonSecondary: { ...Light.buttonSecondary,
    bg:            'transparent',
    bgFc:          '#99999988',
    ct:            '#bbbbbb',
  },
  
  ripple: { ...Light.ripple },
  
  
  inputRadio: { ...Light.inputRadio,
    bgFc:   '#7b7b7b',
  },
  
  
  
  input: { ...Light.input,
    bg:            '#F8F8F8',
    ct:            '#000000',
    placeholder:   ['#777777'],
    borderGrad:    ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:       ['#ffced2'], //['#ff8787'],
  },
  
  rangePicker: { ...Light.rangePicker,
    trackBg:       ['#ffdde5'],
    barBg:         ['#bb2649'],
    handleBg:      ['#F8F8F8'],
  },
  
  
  
  previewButtonNorm: { ...Light.previewButtonNorm },
  previewButtonMain: { ...Light.previewButtonMain,
    bg:        '#e9456b',
    bgGrad:    ['#D01944', '#F75F82'],
    ct:        '#ffffff',
    ctRipple:  '#bb264966',
  },
  previewFullInfoBox: { ...Light.previewFullInfoBox },
  previewFullInfoBubble: { ...Light.previewFullInfoBubble,
    bgMainGrad: ['#BB2649', '#F75F82'],
  },
  previewPhotosProgress: { ...Light.previewPhotosProgress },
  
  
  
  photos: { ...Light.photos,
    bg:                      '#ffeeee',
    ct:                      '#291f1d',
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:        ['#8B8B8B'],
    highlightFrameAccentBg:  ['#ffbaba'],
  },
  
  bottomSheet: { ...Light.bottomSheet },
  bottomSheetHandle: { ...Light.bottomSheetHandle },
  
  
  scrollbar: { ...Light.scrollbar,
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
    accentColor: LightWineProps.boxAccent.bg,
    bgColor1:    LightWineProps.boxAccent.bg,
    bgColor2:    LightWineProps.page.bg,
  })),
} satisfies Theme

