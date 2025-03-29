import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




export const Light = {
  type: 'light',
  name: 'Light Grey' as const,
  icon: (
    <div
      css={themeIconCss({
        accentColor: '#333333',
        bgColor1:    '#f5f5f5',
        bgColor2:    '#f5f5f5',
      })}
    />
  ),
  
  
  
  page: {
    bg:          '#f5f5f5',
    bgGrad:      ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
    ct:          '#000000',
    ct2:         '#000000',
    ct3:         '#232020',
    ctSec:       '#858585',
    ctSec2:      '#7b7b7b',
  },
  statusBar: {
    bg: '#f5f5f5',
  },
  nav: {
    bg: '#ffffff',
  },
  navButton: {
    bgFc:        '#f0f0f0',
    ct:          '#7b7b7b',
    cta:         '#333333',
  },
  
  
  
  boxDefault: {
    bg:           '#ffffff',
    bg2:          '#f0f0f0',
    
    ct:           '#000000',
    ct2:          '#1b1919',
    ct3:          '#444444',
    ct4:          '#5b5b5b',
    ct5:          '#7b7b7b',
    ct6:          '#838383',
    ct7:          '#999999',
    
    ctSec:        '#858585',
    ctSec4:       '#d1d1d1',
    ctSec5:       '#dddddd',
    ctSec6:       '#e3e3e3',
    
    cta2:         '#cbcad0',
    bga4:         '#bbbbbb',
    cta4:         '#000000',
  },
  boxNormal: {
    bg:            '#bbbbbb',
    ct:            '#000000',
    bgFc:          '#dddddd',
    ctFc:          '#000000',
  },
  boxNormalCt: {
    bg:            'transparent',
    ct:            '#bbbbbb',
    bgf:           '#00000008',
    ctf:           '#bbbbbb',
  },
  boxNormal2: {
    bg:           '#dddddd',
    ct:           '#000000',
    bgf:          '#dddddd',
    ctf:          '#000000',
  },
  boxNormal3: {
    bg:           '#b5b5b5',
    ct:           '#ffffff',
    bgf:          '#c5c5c5',
    ctf:          '#ffffff',
  },
  boxNormal4: {
    bg:           '#ffffff',
    ct:           '#232020',
    shadow:       '#A4A4A426',
    bgf:          '#ffffff',
    ctf:          '#232020',
  },
  boxSecondary: {
    bg:           '#E0E0E0',
    ct:           '#ABABAB',
  },
  boxAccent: {
    bg:           '#333333',
    ct:           '#ffffff',
    bgf:          '#000000',
    ctf:          '#ffffff',
  },
  boxAccentCt: {
    bg:           'transparent',
    ct:           '#333333',
    bgf:          '#00000018',
    ctf:          '#333333',
    ctRipple:     '#00000022',
  },
  boxAccent2: {
    bg:            '#bbbbbb',
    ct:            '#000000',
    bgFc:          '#999999',
    ctFc:          '#000000',
  },
  boxAccent3: {
    bg:            '#bbbbbb',
    ct:            '#000000',
    bgFc:          '#999999',
    ctFc:          '#000000',
  },
  boxAccent4: {
    bg:           '#bbbbbb',
    ct:           '#000000',
  },
  boxAccentCt4: {
    bg:           '#ffffff',
    ct:           '#1F1F1F',
    ctGrad:       ['#1F1F1F', '#6D6D6D'],
    shadow:       '#A4A4A426',
    bgf:          '#ffffff',
    ctf:          '#1F1F1F',
  },
  boxAccent5: {
    ct:           '#aaaaaa',
  },
  boxMain: {
    bg:            '#7b7b7b',
    ct:            '#F8F8F8',
    bgFc:          '#aaaaaa',
    ctFc:          '#F8F8F8',
  },
  boxDanger: {
    bg:           '#ffffff',
    ct:           '#e74c3c',
    bgf:          '#ffe7e7',
    ctf:          '#e74c3c',
  },
  boxDisabled: {
    bg:           '#DCDCDC88',
    ct:           '#55555588',
  },
  boxTransNormal: {
    bg:           'transparent',
    ct:           '#000000',
    bgf:          '#00000011',
    ctf:          '#000000',
  },
  boxTransSec: {
    bg:           'transparent',
    ct:           '#bbbbbb',
    bgf:          '#00000011',
    ctf:          '#bbbbbb',
  },
  boxTransSec2: {
    bg:           'transparent',
    ct:           '#848484',
  },
  boxSemitrans: {
    bg:           '#c4cdde99', // '#dce4f299'
    ct:           '#291f1d',
    ctSec:        '#ffffff',
  },
  boxWhite: {
    bg:           '#ffffff',
    ct:           '#000000',
    ct2:          '#27192F',
  },
  
  
  
  
  
  
  ripple: {
    ct:              '#ffffff55',
    ctOnLight:       '#282c3422',
    ctOnTrans:       '#66666633',
  },
  error: {
    ct:        '#e74c3c',
  },
  errorSec: {
    ct:        '#c17169',
  },
  shadow: {
    bg:        '#00000026',
    bg2:       '#7B7B7B26',
  },
  
  
  
  inputRadio: {
    bgFc:      '#7b7b7b',
  },
  
  
  
  input: {
    bg:            '#F8F8F8',
    ct:            '#000000',
    placeholder:   ['#777777'],
    borderGrad:    ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:       ['#ffced2'],
  },
  
  rangePicker: {
    trackBg:      ['#d1d1d1'],
    barBg:        ['#333333'],
    handleBg:     ['#F8F8F8'],
  },
  
  
  
  
  
  previewButtonNorm: {
    bg:        '#ffffff',
    ct:        '#1F1F1F',
    ctGrad:    ['#1F1F1F', '#3C3C3C', '#6D6D6D'],
    bgFc:      '#bbbbbb',
    ctFc:      '#1F1F1F',
    ctRipple:  '#1F1F1F66',
  },
  previewButtonMain: {
    bg:        '#3C3C3C',
    bgGrad:    ['#1F1F1F', '#6D6D6D'],
    ct:        '#ffffff',
    ctRipple:  '#1F1F1F66',
  },
  previewOverlayInfoBox: {
    bg:        'transparent',
    ct:        '#ffffff',
    bgFadeGrad: ['transparent', '#000000aa'],
    ctGrad:    ['#F1F1F1FF', '#8B8B8B00'],
  },
  previewFullInfoBox: {
    bg:         '#ffffff',
    ct:         '#232020',
    ct2:        '#B0B0B0',
  },
  previewFullInfoBubble: {
    bg:         '#F5F5F5',
    ct:         '#232020',
    ct2:        '#6A6A6A',
    bgMainGrad: ['#1F1F1F', '#6D6D6D'],
    ctMain:     '#ffffff',
  },
  previewPhotosProgress: {
    bg:          '#00000066',
    ct:          '#D9D9D999',
    cta:       '#FFFFFF',
  },
  previewOverlayInfoMatchIndicator: {
    bg:         '#8D8D8D99',
    ct:         '#ffffff',
    shadow:     '#00000026',
  },
  
  
  
  photos: {
    bg:                      '#ffeeee',
    ct:                      '#291f1d',
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:        ['#8B8B8B'],
    highlightFrameAccentBg:  ['#000000'],
  },
  
  bottomSheet: {
    bg:        '#ffffff',
    ct:        '#000000',
  },
  bottomSheetHandle: {
    bg:        '#8b8b8b',
    bgFc:      '#000000',
  },
  
  
  toast: {
    bg:                   '#ffffff',
    ct:                   '#757575',
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
  scrollbar: {
    track:       ['#25283622'],
    thumb:       ['#25283644'],
    thumbActive: ['#999999'],
  },
  
} satisfies Theme

