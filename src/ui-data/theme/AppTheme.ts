import { css } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'




export namespace AppTheme {
  
  export type Type = 'light' | 'dark'
  
  
  
  /*
  background => bg
  content => c / ct
  contentAccent => ca / cta
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
      bg:          string[]
      bgGradient:  string[]
      content1:    string[]
      content2:    string[]
      content3:    string[]
    }
    statusBar: {
      bg: string[]
    }
    nav: {
      bg: string[]
    }
    
    boxNormal: {
      bg:              string[]
      bg2:             string[]
      bg3:             string[]
      
      content:         string[]
      content1a:       string[]
      content1b:       string[]
      content2:        string[]
      content2b:       string[]
      c2c:             string
      content3:        string[]
      content3d:       string[]
      content3e:       string[]
      content4:        string[]
      content4b:       string[]
      c5:              string
      c6:              string
      
      contentAccent:   string[]
      cta2:  string
      contentAccent3:  string[]
      
      shadow:          string[]
    },
    boxAccent: {
      bg:       string[]
      bg3:      string
      content:  string[]
      content2: string[]
      c3:       string
    },
    
    // main button (submit button)
    buttonMain: {
      bg:       string[]
      bgFocus:  string[]
      content:  string[]
    }
    // just a colorful button that drags some attention
    buttonAccent: {
      bg:            string[]
      bg2:           string[]
      content:       string[]
      ct2:           string
      bgFocus:       string[]
      contentFocus:  string[]
    }
    // normal button
    buttonNormal: {
      bg:            string[]
      bg2:           string
      content:       string[]
      bgFocus:       string[]
      bgFocus2:      string
      contentFocus:  string[]
    }
    // button that almost invisible
    buttonSecondary: {
      bg:        string[]
      bgFocus:   string[]
      content:   string[]
    }
    // radio input color
    inputRadio: {
      bgFocus: string[]
    }
    // transparent icon button
    buttonTransparent: {
      bgFocus: string[],
    }
    navButton: {
      bgFocus:       string[]
      content:       string[]
      contentAccent: string[]
    }
    
    iconGradient: {
      content:       string[]
    }
    
    // input, dataField, textarea, radioInput, radioGroup
    input: {
      bg:            string[]
      content:       string[]
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
      bg:      string[]
      content: string[]
    }
    // dangerButton
    elementDanger: {
      bg:       string[]
      bgFocus:  string[]
      content:  string[]
    }
    // element with error
    elementError: {
      bg:      string[]
    },
    
    ripple: {
      content:              string[]
      contentOnTransparent: string[]
    }
    
    
    
    boxTransparent: {
      bg: string,
      c:  string,
    },
    
    boxPink: {
      bg: [string, string]
      ct:  string,
    }
    boxWithPink: {
      bg:  string
      ct:   string
      
      bgFocus: [string, string]
      ctFocus:  string
    },
    
    boxWine: {
      bg: [string, string]
      ct:  string,
    }
    boxWithWine: {
      bg:  string
      ct:   string
      
      bgFocus: [string, string]
      ctFocus:  string
    },
    
    boxViolet: {
      bg: [string, string]
      c:  string
    }
    boxWithViolet: {
      bg:  string
      c:   string
      
      bgFocus: [string, string]
      cFocus:  string
    },
    
    boxBlue: {
      bg:  [string, string]
      c:   string
    }
    boxWithBlue: {
      bg:  string
      c:   string
      
      bgFocus: [string, string]
      cFocus:  string
    }
    
    
    photos: {
      bg:                      string[]
      content:                 string[]
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
      content:              string[]
      content2:             string[]
      content3:             string[]
      accentNormal:         string[]
      accentLoadingBg:      string[]
      accentLoadingContent: string[]
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


