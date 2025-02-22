import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Dark, DarkProps } from 'src/ui-data/theme/themes/Dark.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkWineProps: ThemeProps = { ...DarkProps,
  
  page: { ...DarkProps.page,
    bg:           '#18191b',
    bgGrad:       ['#282c34', '#282c34', '#282c34'],
  },
  statusBar: { ...DarkProps.statusBar,
    bg:           '#282c34',
  },
  nav: { ...DarkProps.nav,
    bg:           '#282c34',
  },
  navButton: { ...DarkProps.navButton,
    bgFc:         '#2e3440',
    ct:           '#7b7b7b',
    cta:          '#b7405c', // ['#984559']
  },
  
  
  
  boxAccent: { ...Dark.boxAccent,
    bg:           '#a71538',
    ct:           '#ffffff',
    bgf:          '#c1163e',
    ctf:          '#ffffff',
  },
  boxAccentCt: { ...Dark.boxAccentCt,
    bg:           'transparent',
    ct:           '#a71538',
    bgf:          '#ff5c8344',
    ctf:          '#a71538',
    ctRipple:     '#ffd0db55',
  },
  boxAccent4: { ...DarkProps.boxAccent4,
    bg:           '#BB2649',
    ct:           '#ffffff',
    // cta:       '#b7405c', // ['#984559'
    // cta2:      '#b7405c',
    // cta3:      '#BB2649',
  },
  boxAccentCt4: { ...Dark.boxAccentCt4,
    ct:           '#BB2649',
    ctGrad:       ['#BB2649', '#F75F82'],
    ctf:          '#BB2649',
  },
  boxAccent5: { ...Dark.boxAccent5,
    ct:           '#c51841',
  },
  
  
  
  buttonMain: { ...DarkProps.buttonMain,
    bg:           '#aaaaaa',
    ct:           '#000000',
    bgFc:         '#bbbbbb',
    ctFc:         '#000000',
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
    bg:            'transparent',
    bgFc:          '#7b7b7b88',
    ct:            '#999999',
  },
  
  ripple: { ...DarkProps.ripple },
  
  
  
  inputRadio: { ...DarkProps.inputRadio,
    bgFc:  '#aaaaaa',
  },
  
  
  
  input: { ...DarkProps.input,
    bg:            '#282c34',
    ct:            '#cdcdcd',
    placeholder:   ['#7b7b7b'],
    borderGrad:    ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:       ['#5e252c'],
  },
  
  rangePicker: { ...DarkProps.rangePicker,
    trackBg:      ['#2e343f'],
    barBg:        ['#bdbdbd'],
    handleBg:     ['#000000'],
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
    bg:                     '#ffeeee',
    ct:                     '#291f1d',
    borderDrag:             ['#1F8DCD'],
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffe1e1'],
  },
  
  bottomSheet: { ...Dark.bottomSheet },
  bottomSheetHandle: { ...Dark.bottomSheetHandle },
  
  
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
    accentColor: DarkWineProps.boxAccent.bg,
    bgColor1:    DarkWineProps.boxAccent.bg,
    bgColor2:    DarkWineProps.page.bg,
  })),
} satisfies Theme

