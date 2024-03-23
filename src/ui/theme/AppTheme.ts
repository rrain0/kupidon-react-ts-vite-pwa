import { css } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'




export namespace AppTheme {
  
  export type Type = 'light'|'dark'
  
  
  
  
  export interface Theme {
    type: Type
    name: string
    icon: StyledComponent<any>
    
    // окружение
    // ambience?: {}
    element?: {
      //highlight?: {}
      //primary?: {}
      //secondary?: {}
      //normal?: {}
    }
    containerNormal: {
      bgc:       string[]
      bgc2:      string[]
      content:   string[]
      content2:  string[]
      content3:  string[]
    },
    containerAccent: {
      bgc:     string[]
      content: string[]
    },
    
    // main button (submit button)
    buttonMain: {
      bgc:      string[]
      bgcFocus: string[]
      content:  string[]
    }
    // just colorful button that drags some attention
    buttonAccent: {
      bgc:       string[]
      bgcFocus:  string[]
      content:   string[]
      content2:  string[]
    }
    buttonSecondary: {
      bgc:       string[]
      bgcFocus:  string[]
      content:   string[]
    }
    // radio input color
    inputRadio: {
      bgcFocus: string[]
    }
    // transparent icon button
    buttonTransparent: {
      bgcFocus: string[],
    }
    buttonNav: {
      bgcFocus:      string[]
      content:       string[]
      contentAccent: string[]
    }
    
    // input, dataField, textarea, radioInput, radioGroup
    input: {
      bgc:           string[]
      content:       string[]
      placeholder:   string[]
      border:        string[]
      borderHover:   string[]
      bgcError:      string[]
    }
    
    // disabledButton
    elementDisabled: {
      bgc:     string[]
      content: string[]
    }
    // dangerButton
    elementDanger: {
      bgc:      string[]
      bgcFocus: string[]
      content:  string[]
    }
    // element with error
    elementError: {
      bgc:      string[]
    },
    
    ripple: {
      content:              string[]
      contentOnTransparent: string[]
    }
    
    photos: {
      bgc:                     string[]
      content:                 string[]
      borderDrag:              string[]
      highlightFrameBgc:       string[]
      highlightFrameAccentBgc: string[]
    }
    
    bottomSheet: {
      bgc:    string[]
      handle: string[]
    }
    
    card: {
      bgc: string[]
    }
    page: {
      bgc:         string[]
      bgcGradient: string[]
      content1:    string[]
      content2:    string[]
      content3:    string[]
    }
    
    statusBar: {
      bgc: string[]
    }
    nav: {
      bgc: string[]
    }
    
    toast: {
      bgc:                  string[]
      content:              string[]
      content2:             string[]
      content3:             string[]
      accentNormal:         string[]
      accentLoadingBgc:     string[]
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
  
  
  
  export type ThemeIconCssProps = {
    accentColor: string,
    bgcColor1: string,
    bgcColor2: string,
  }
  export const themeIconCss = (props: ThemeIconCssProps)=>css`
    height: 100%;
    aspect-ratio: 1;
    border-radius: 999999px;
    border: 3.5px solid;
    border-color: ${props.accentColor};
    background: linear-gradient(
      to right,
      ${props.bgcColor1} 0% 50%,
      ${props.bgcColor2} 50% 100%
    );
  `
  export const themeIconGradientCss = (props: ThemeIconCssProps)=>css`
    ${themeIconCss(props)};
    background: linear-gradient(
      to right,
      ${props.bgcColor1} 0% 35%,
      ${props.bgcColor2} 75% 100%
    );
  `
  
  
}


