import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Dark, DarkProps } from 'src/ui-data/theme/themes/Dark.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkWineProps: ThemeProps = { ...DarkProps,
  
  page: { ...DarkProps.page,
    bg:         '#18191b',
    bgGrad:     ['#282c34', '#282c34', '#282c34'],
  },
  statusBar: { ...DarkProps.statusBar,
    bg:         '#282c34',
  },
  nav: { ...DarkProps.nav,
    bg:         '#282c34',
  },
  navButton: { ...DarkProps.navButton,
    bgFc:      '#2e3440',
    ct:        ['#7b7b7b'],
    cta:       '#b7405c', // ['#984559']
  },
  
  
  
  boxNormal: { ...DarkProps.boxNormal },
  boxAccent: { ...DarkProps.boxAccent,
    bg:        ['#aaaaaa'],
    bg3:       '#c51841',
    ct:        ['#000000'],
    ct2:       ['#000000'],
    ct3:       '#000000',
    // cta:      '#b7405c', // ['#984559'
    // cta2:     '#b7405c',
    // cta3:     '#BB2649',
  },
  
  
  
  buttonNormal: { ...DarkProps.buttonNormal,
    bg:            ['#999999'],
    ct:            ['#000000'],
    bgFc:          '#7b7b7b',
    ctFc:          '#000000',
  },
  buttonMain: { ...DarkProps.buttonMain,
    bg:      ['#aaaaaa'],
    ct:      ['#000000'],
    bgFc:    '#bbbbbb',
    ctFc:    '#000000',
  },
  buttonAccent: { ...DarkProps.buttonAccent,
    bg:            ['#bdbdbd'],
    ct:            ['#000000'],
    bgFc:          '#7b7b7b',
    ctFc:          '#18191b',
  },
  buttonAccent2: {
    bg:            '#c51841',
    ct:            '#ffffff',
    bgFc:          '#e83f66',
    ctFc:          '#ffffff',
  },
  buttonAccent3: {
    bg:            '#f6839e',
    ct:            '#ffffff',
    bgFc:          '#F59CB1',
    ctFc:          '#ffffff',
  },
  buttonSecondary: { ...DarkProps.buttonSecondary,
    bg:            ['transparent'],
    bgFc:          '#7b7b7b88',
    ct:            ['#999999'],
  },
  
  ripple: { ...DarkProps.ripple },
  
  
  
  inputRadio: { ...DarkProps.inputRadio,
    bgFc:  '#aaaaaa',
  },
  buttonTrans: { ...DarkProps.navButton,
    bgFc:  '#ffffff22',
  },
  
  
  
  gradIcon: { ...DarkProps.gradIcon,
    ctGrad:       ['#BB2649', '#F75F82'],
  },
  
  
  
  input: { ...DarkProps.input,
    bg:            ['#282c34'],
    ct:            ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:       ['#5e252c'],
  },
  
  rangePicker: { ...DarkProps.rangePicker,
    trackBg:      ['#2e343f'],
    barBg:        ['#bdbdbd'],
    handleBg:     ['#000000'],
  },
  
  elementDisabled: { ...DarkProps.elementDisabled,
    bg:     ['#DCDCDC'],
    ct:     ['#555555'],
  },
  elementDanger: { ...DarkProps.elementDanger,
    bg:      ['#bbbbbb'],
    bgFc:    '#cccccc',
    ct:      ['#000000'],
  },
  elementError: { ...DarkProps.elementError,
    bg:      ['#5e252c'],
  },
  
  
  
  previewButtonNorm: { ...DarkProps.previewButtonNorm },
  previewButtonMain: { ...DarkProps.previewButtonMain,
    bgGrad: ['#BB2649', '#F75F82'],
  },
  previewFullInfoBox: { ...DarkProps.previewFullInfoBox },
  previewFullInfoBubble: { ...DarkProps.previewFullInfoBubble,
    bgMainGrad: ['#BB2649', '#F75F82'],
  },
  previewPhotosProgress: { ...DarkProps.previewPhotosProgress },
  
  
  
  photos: { ...DarkProps.photos,
    bg:                     ['#ffeeee'],
    ct:                     ['#291f1d'],
    borderDrag:             ['#1F8DCD'],
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffe1e1'],
  },
  
  bottomSheet: { ...Dark.bottomSheet },
  bottomSheetHandle: { ...Dark.bottomSheetHandle },
  
  toast: { ...DarkProps.toast,
    bg:                   ['#121212'],
    ct:              ['#ffffff'],
    ct2:             ['#b8b8b8'],
    ct3:             '#ffffff',
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:      ['#e0e0e0'],
    accentLoadingCt: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: { ...DarkProps.scrollbar,
    track:       ['#F8F8F822'],
    thumb:       ['#F8F8F844'],
    thumbActive: ['#999999'],
  },
}



export const DarkWine = {
  ...DarkWineProps,
  type: 'dark',
  name: 'Dark Wine' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkWineProps.boxNormal.cta3,
    bgColor1:   DarkWineProps.boxNormal.cta2,
    bgColor2:   DarkWineProps.page.bg,
  })),
} satisfies Theme

