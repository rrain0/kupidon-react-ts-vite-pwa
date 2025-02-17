import { css } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'




export namespace AppTheme {
  
  export type Type = 'light' | 'dark'
  
  
  
  /*
  bg => background
  ct => content
  any 'bg###' must be paired with 'ct###'
  bg3 / ct3
  bgFc3 / ctFc3
  bgFc3a / ctFc3a
  
  'XXXa' / 'XXXAcc' => 'XXXAccent'
  bga / bgAcc => backgroundAccent
  cta / ctAcc => contentAccent
  
  'XXXf' / 'XXXFc' => 'XXXAccent'
  bgf / bgFc => backgroundFocus
  ctf / ctFc => contentFocus
  
  'XXXs' / 'XXXSec' => 'XXXSecondary'
  bgs / bgSec => backgroundSecondary
  cts / ctSec => contentSecondary
  
  'XXXTrans' => 'XXXTransparent'
  'XXXGrad' => 'XXXGradient'
  any gradient must be named 'XXXGrad'
  
  */
  export interface ThemeProps {
    
    // окружение
    // ambience?: {}
    element?: {
      //highlight?: {}
      //primary?: {}
      //secondary?: {}
      //normal?: {}
    }
    
    page: {
      bg:          string
      bgGrad:      string[]
      ct1:         string
      ct2:         string
      ct2a:        string
      ct3:         string
      ctSec:       string
      ctSec2:      string
    }
    statusBar: {
      bg: string
    }
    nav: {
      bg: string
    }
    
    
    
    boxNormal: {
      bg:         string[]
      bg2:        string[]
      bg3:        string
      
      ct:         string[]
      ct1a:       string[]
      ct1b:       string[]
      ct2:        string[]
      ct2b:       string[]
      ct2c:       string
      ct3:        string
      ct3d:       string[]
      ct3e:       string[]
      ct4:        string[]
      ct4b:       string[]
      ct5:        string
      ct6:        string
      
      ctSec:      string
      
      cta:        string
      cta2:       string
      cta3:       string
      
      shadow:     string[]
    },
    boxNormal4: {
      bg:         string
      ct:         string
      shadow:     string
      
      bgf:        string
      ctf:        string
    },
    boxSec: {
      bg:         string
      ct:         string
    },
    boxAccent: {
      bg:         string[]
      bg3:        string
      ct:         string[]
      ct2:        string[]
      ct3:        string
    },
    boxAccent4: {
      bg:         string
      ct:         string
      ctGrad:     [string, string],
      shadow:     string,
      
      bgf:        string
      ctf:        string
    },
    boxDanger: {
      bg:           string
      ct:           string
      bgf:          string
      ctf:          string
    },
    boxTrans: {
      bg:         string
      ct:         string
      ctSec:      string
    },
    boxWhite: {
      bg:           string
      ct:           string
      ct2:          string
    },
    
    
    
    // normal button
    buttonNormal: {
      bg:            string[]
      ct:            string[]
      bgFc:          string
      ctFc:          string
      
      bg2:           string
      bgFc2:         string
      
      bg3:           string
      ct3:           string
      bgFc3:         string,
      ctFc3:         string,
    }
    // main button (submit button)
    buttonMain: {
      bg:            string[]
      ct:            string[]
      bgFc:          string
      ctFc:          string
    }
    // just a colorful button that drags some attention
    buttonAccent: {
      bg:            string[]
      ct:            string[]
      bgFc:          string
      ctFc:          string
    }
    buttonAccent2: {
      bg:            string
      ct:            string
      bgFc:          string
      ctFc:          string
    }
    buttonAccent3: {
      bg:            string
      ct:            string
      bgFc:          string
      ctFc:          string
    }
    // button that almost invisible
    buttonSecondary: {
      bg:        string[]
      bgFc:      string
      ct:        string[]
    }
    
    
    
    // radio input color
    inputRadio: {
      bgFc:      string
    }
    // transparent icon button
    buttonTrans: {
      bgFc:      string,
    }
    navButton: {
      bgFc:      string
      ct:        string[]
      cta:       string
    }
    
    gradIcon: {
      ctGrad:   [string, string]
    }
    
    
    
    // input, dataField, textarea, radioInput, radioGroup
    input: {
      bg:            string[]
      ct:            string[]
      placeholder:   string[]
      borderGrad:    [string, string]
      borderHover:   string[]
      bgError:       string[]
    }
    
    rangePicker: {
      trackBg:      string[]
      barBg:        string[]
      handleBg:     string[]
    }
    
    // disabledButton
    elementDisabled: {
      bg:              string[]
      ct:              string[]
    }
    // dangerButton
    elementDanger: {
      bg:              string[]
      ct:              string[]
      bgFc:            string
      ctFc:            string
    }
    // element with error
    elementError: {
      bg:              string[]
    },
    
    ripple: {
      ct:              string
      ctOnLight:       string
      ctOnTrans:       string
    }
    
    
    
    // Profile preview button normal
    previewButtonNorm: {
      bg:        string
      ct:        string
      ctGrad:    [string, string, string]
      bgFc:      string
      ctFc:      string
      ctRipple:  string
    }
    // Profile preview button main
    previewButtonMain: {
      bg:        string
      bgGrad:    [string, string]
      ct:        string
      ctRipple:  string
    }
    // Profile preview container for Name & AboutMe displayed upon photo
    previewOverlayInfoBox: {
      bg:         string
      ct:         string
      bgFadeGrad: [string, string]
      ctGrad:     [string, string]
    }
    // Profile preview full info container
    previewFullInfoBox: {
      bg:         string
      ct:         string
      ct2:        string
    }
    // Profile preview full info bubble
    previewFullInfoBubble: {
      bg:         string
      ct:         string
      ct2:        string
      bgMainGrad: [string, string]
      ctMain:     string
    }
    // Profile preview photos progress indicator
    previewPhotosProgress: {
      bg:          string
      ct:          string
      cta:       string
    }
    previewOverlayInfoMatchIndicator: {
      bg:         string
      ct:         string
      shadow:     string
    }
    
    
    photos: {
      bg:                      string[]
      ct:                      string[]
      borderDrag:              string[]
      highlightFrameBg:        string[]
      highlightFrameAccentBg:  string[]
    }
    
    bottomSheet: {
      bg:        string
      ct:        string
    }
    bottomSheetHandle: {
      bg:        string
      bgFc:      string
    }
    
    toast: {
      bg:                   string[]
      ct:                   string[]
      ct2:                  string[]
      ct3:                  string
      accentNormal:         string[]
      accentLoadingBg:      string[]
      accentLoadingCt:      string[]
      accentInfo:           string[]
      accentOk:             string[]
      accentWarn:           string[]
      accentDanger:         string[]
    }
    scrollbar: {
      track:       string[]
      thumb:       string[]
      thumbActive: string[]
    }
  }
  
  
  export interface Theme extends ThemeProps {
    type: Type
    name: string
    icon: StyledComponent<any>
  }
  
  
  
  export type ThemeIconCssProps = {
    accentColor: string,
    bgColor1:    string,
    bgColor2:    string,
  }
  export const themeIconCss = (props: ThemeIconCssProps) => css`
    height: 100%;
    aspect-ratio: 1;
    border-radius: 999999px;
    border: 3.5px solid;
    border-color: ${props.accentColor};
    background: linear-gradient(
      to right,
      ${props.bgColor1} 0% 50%,
      ${props.bgColor2} 50% 100%
    );
  `
  export const themegradIconCss = (props: ThemeIconCssProps) => css`
    ${themeIconCss(props)};
    background: linear-gradient(
      to right,
      ${props.bgColor1} 0% 35%,
      ${props.bgColor2} 75% 100%
    );
  `
  
  
}


