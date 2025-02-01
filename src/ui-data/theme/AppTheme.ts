import { css } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'




export namespace AppTheme {
  
  export type Type = 'light' | 'dark'
  
  
  
  /*
  background => bg
  content => ct
  
  backgroundAccent => bga / bgAcc
  contentAccent => cta / ctAcc
  
  backgroundFocus => bgf / bgFc
  contentFocus => ctf / ctFc
  
  backgroundGradient => bgGrad
  contentGradient => ctGrad
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
      bgGradient:  string[]
      ct1:         string
      ct2:         string
      ct3:         string
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
      bg3:        string[]
      
      ct:         string[]
      ct1a:       string[]
      ct1b:       string[]
      ct2:        string[]
      ct2b:       string[]
      ct2c:       string
      ct3:        string[]
      ct3d:       string[]
      ct3e:       string[]
      ct4:        string[]
      ct4b:       string[]
      ct5:        string
      ct6:        string
      
      cta:        string[]
      cta2:       string
      cta3:       string[]
      
      shadow:     string[]
    },
    boxAccent: {
      bg:         string[]
      bg3:        string
      ct:         string[]
      ct2:        string[]
      ct3:        string
    },
    
    
    
    // main button (submit button)
    buttonMain: {
      bg:            string[]
      ct:            string[]
      bgFocus:       string[]
      ctFc:          string
    }
    // just a colorful button that drags some attention
    buttonAccent: {
      bg:            string[]
      ct:            string[]
      bgFocus:       string[]
      ctFocus:       string[]
    }
    buttonAccent2: {
      bg:            string
      ct:            string
      bgFc:          string
      ctFc:          string
    }
    // normal button
    buttonNormal: {
      bg:            string[]
      bg2:           string
      ct:            string[]
      bgFocus:       string[]
      bgFocus2:      string
      ctFocus:       string[]
    }
    // button that almost invisible
    buttonSecondary: {
      bg:        string[]
      bgFocus:   string[]
      ct:        string[]
    }
    
    
    
    // radio input color
    inputRadio: {
      bgFocus:   string[]
    }
    // transparent icon button
    buttonTransparent: {
      bgFocus:   string[],
    }
    navButton: {
      bgFocus:   string[]
      ct:        string[]
      cta:       string[]
    }
    
    iconGradient: {
      ct:   string[]
    }
    
    
    
    // input, dataField, textarea, radioInput, radioGroup
    input: {
      bg:            string[]
      ct:       string[]
      placeholder:   string[]
      border:        string[]
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
      bgFocus:         string[]
      ctFocus:         string
    }
    // element with error
    elementError: {
      bg:              string[]
    },
    
    ripple: {
      ct:                string
      ctOnTransparent:   string
    }
    
    
    
    boxTransparent: {
      bg: string,
      ct: string,
    },
    
    boxPink: {
      bg: [string, string]
      ct: string,
    }
    boxWithPink: {
      bg:       string
      ct:       string
      ctRipple: string
      
      bgFocus:  [string, string]
      ctFocus:  string
    },
    
    boxWine: {
      bg: [string, string]
      ct: string,
    }
    boxWithWine: {
      bg:       string
      ct:       string
      ctRipple: string
      
      bgFocus: [string, string]
      ctFocus: string
    },
    
    boxViolet: {
      bg: [string, string]
      ct: string
    }
    boxWithViolet: {
      bg:       string
      ct:       string
      ctRipple: string
      
      bgFocus: [string, string]
      ctFocus:  string
    },
    
    boxBlue: {
      bg:  [string, string]
      ct:  string
    }
    boxWithBlue: {
      bg:       string
      ct:       string
      ctRipple: string
      
      bgFocus: [string, string]
      ctFocus: string
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
      ctAcc:       string
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
      bg:    string[]
      handle: string[]
    }
    
    toast: {
      bg:                   string[]
      ct:                   string[]
      ct2:                  string[]
      ct3:                  string[]
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
  export const themeIconGradientCss = (props: ThemeIconCssProps) => css`
    ${themeIconCss(props)};
    background: linear-gradient(
      to right,
      ${props.bgColor1} 0% 35%,
      ${props.bgColor2} 75% 100%
    );
  `
  
  
}


