import { ObjectU } from '@util/common/ObjectU.ts'
import {
  WidgetElem,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { AttachRootElemParams, Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import resetButton = WidgetStyleCommon.resetButton
import row = WidgetStyleCommon.row
import abs = WidgetStyleCommon.abs
import Txt = WidgetStyleCommon.Txt
import ObjectPrefixCapitalizeKeys = ObjectU.ObjectPrefixCapitalizeKeys




export namespace ButtonS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const button = WidgetElem.of({
      ...up, className: 'rruiButton',
    })
    const border = WidgetElem.of({
      upElem: button, upSelector: '>', className: 'rruiBorder',
    })
    const rippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    return {
      button,
      border,
      ...ObjectPrefixCapitalizeKeys('ripple', rippleElems),
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = {
    inFocus: WidgetState.of([WidgetElems.button, CommonStates.inFocus]),
    disabled: WidgetState.of([WidgetElems.button, CommonStates.disabled]),
    error: WidgetState.of([WidgetElems.button, CommonStates.error]),
  }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.button,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  
  export namespace Parts {
    
    export const base = {
      button: [resetButton, {
        pos: 'rel',
        ...row,
        alignItems: 'center',
        justifyContent: 'center',
        overflowWrap: 'anywhere',
        overflow: 'hidden',
        transition:
          'background linear 300ms,' +
          'color linear 300ms,' +
          'border-color linear 300ms',
      }],
      border: {
        ...abs,
        pointerEvents: 'none',
        r: 'inherit',
      },
      ripple: RippleS6.Parts.base,
    } satisfies WidgetStyleObj
    
    export namespace Type {
      
      export namespace filled {
        
        export namespace Shape {
          export namespace rect {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: filled, shape: rect, size: md
              export const md: WidgetStyle = [base, {
                button: {
                  w: 'full', hMin: 34, r: 10, p: [8, 14],
                  ...Txt.md14,
                },
              }]
              // type: filled, shape: rect, size: lg
              export const lg: WidgetStyle = [base, {
                button: {
                  w: 'full', hMin: 50, r: 15, p: [8, 6],
                  ...Txt.lg18Lh150,
                },
              }]
            }
            
          }
          export namespace rounded {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: filled, shape: rounded, size: md
              export const md: WidgetStyle = [base, {
                button: {
                  wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
                  ...Txt.md15Thin,
                },
              }]
              // type: filled, shape: rounded, size: md2
              export const md2: WidgetStyle = [md, {
                buttonPh: 16,
              }]
              // type: filled, shape: rounded, size: sm
              export const sm: WidgetStyle = [base, {
                button: {
                  w: 'ct', hMin: 30, r: 'round', p: [4, 16],
                  ...Txt.md15Thin,
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonBgColor: t.buttonNormal.bg[0],
          buttonColor: t.buttonNormal.ct[0],
          rippleRippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFocus[0],
            buttonColor: t.buttonNormal.ctFocus[0],
          },
          disabled: {
            buttonBgColor: t.elementDisabled.bg[0],
            buttonColor: t.elementDisabled.ct[0],
          },
        })
        export namespace Color {
          // type: filled, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonNormal.bg[0],
            buttonColor: t.buttonNormal.ct[0],
            inFocus: {
              buttonBgColor: t.buttonNormal.bgFocus[0],
              buttonColor: t.buttonNormal.ctFocus[0],
            },
          }]
          // type: filled, color: normal2
          export const normal2: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonNormal.bg2,
            buttonColor: t.buttonNormal.ct[0],
            inFocus: {
              buttonBgColor: t.buttonNormal.bgFocus2,
              buttonColor: t.buttonNormal.ctFocus[0],
            },
          }]
          // type: filled, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonAccent.bg[0],
            buttonColor: t.buttonAccent.ct[0],
            inFocus: {
              buttonBgColor: t.buttonAccent.bgFocus[0],
              buttonColor: t.buttonAccent.ctFocus[0],
            },
          }]
          // type: filled, color: accent2
          export const accent2: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonAccent2.bg,
            buttonColor: t.buttonAccent2.ct,
            inFocus: {
              buttonBgColor: t.buttonAccent2.bgFc,
              buttonColor: t.buttonAccent2.ctFc,
            },
          }]
          // type: filled, color: accent3
          export const accent3: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonAccent3.bg,
            buttonColor: t.buttonAccent3.ct,
            inFocus: {
              buttonBgColor: t.buttonAccent3.bgFc,
              buttonColor: t.buttonAccent3.ctFc,
            },
          }]
          // type: filled, color: main
          export const main: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonMain.bg[0],
            buttonColor: t.buttonMain.ct[0],
            inFocus: {
              buttonBgColor: t.buttonMain.bgFocus[0],
              buttonColor: t.buttonMain.ctFc,
            },
          }]
          // type: filled, color: danger
          export const danger: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.elementDanger.bg[0],
            buttonColor: t.elementDanger.ct[0],
            inFocus: {
              buttonBgColor: t.elementDanger.bgFocus[0],
              buttonColor: t.elementDanger.ctFocus,
            },
          }]
        }
      }
      
      // TODO Style - on hover change only border and text color, not bg color
      export namespace outlined {
        export namespace Shape {
          export namespace rounded {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: outlined, shape: rounded, size: md
              export const md: WidgetStyle = [base, {
                button: {
                  wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
                  ...Txt.md15Thin,
                },
                border: {
                  bd: '1px solid',
                },
                hover: {
                  borderBd: null,
                },
              }]
              // type: outlined, shape: rounded, size: sm
              export const sm: WidgetStyle = [base, {
                button: {
                  w: 'ct', hMin: 30, r: 'round', p: [4, 16],
                  ...Txt.md15Thin,
                },
                border: {
                  bd: '1px solid',
                },
                hover: {
                  borderBd: null,
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonColor: t.buttonNormal.bg[0],
          borderBdColor: t.buttonNormal.bg[0],
          rippleRippleColor: t.ripple.ctOnTransparent,
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFocus[0],
            buttonColor: t.buttonNormal.ctFocus[0],
          },
          disabled: {
            buttonBgColor: t.elementDisabled.bg[0],
            buttonColor: t.elementDisabled.ct[0],
          },
        })
        export namespace Color {
          // type: outlined, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.buttonNormal.bg[0],
            borderBdColor: t.buttonNormal.bg[0],
            inFocus: {
              buttonBgColor: t.buttonNormal.bgFocus[0],
              buttonColor: t.buttonNormal.ctFocus[0],
            },
          }]
          // type: outlined, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.buttonAccent.bg[0],
            borderBdColor: t.buttonAccent.bg[0],
            inFocus: {
              buttonBgColor: t.buttonAccent.bgFocus[0],
              buttonColor: t.buttonAccent.ctFocus[0],
              borderBdColor: t.buttonAccent.bgFocus[0],
            },
          }]
        }
      }
      
      export namespace text {
        export namespace Shape {
          export namespace rect {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: text, shape: rect, size: md
              export const md: WidgetStyle = [base, {
                button: {
                  w: 'auto', hMin: 30, r: 10, p: [4, 6], g: 4,
                  ...Txt.md16,
                },
              }]
              // type: text, shape: rect, size: lg
              export const lg: WidgetStyle = [base, {
                button: {
                  w: 'full', hMin: 50, r: 15, p: [8, 6],
                  ...Txt.lg18Lh150,
                },
                buttonBg: null,
              }]
            }
          }
          export namespace rounded {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: text, shape: rounded, size: md
              export const md: WidgetStyle = [base, {
                button: {
                  wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
                  ...Txt.lg18,
                },
              }]
              // type: text, shape: rounded, size: md2
              export const md2: WidgetStyle = [md, {
                button: {
                  pH: 16,
                  ...Txt.lg16,
                },
              }]
              // type: text, shape: rounded, size: md2Uppercase
              export const md2Uppercase: WidgetStyle = [md2, {
                button: {
                  textTransform: 'uppercase',
                },
              }]
              // type: text, shape: rounded, size: sm
              export const sm: WidgetStyle = [base, {
                button: {
                  w: 'ct', hMin: 30, r: 'round', p: [4, 16],
                  ...Txt.lg16,
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonColor: t.page.ct2,
          rippleRippleColor: t.ripple.ctOnTransparent,
          inFocus: {
            buttonBgColor: t.buttonTransparent.bgFocus[0],
          },
          disabled: {
            buttonBgColor: t.elementDisabled.bg[0],
            buttonColor: t.elementDisabled.ct[0],
          },
        })
        export namespace Color {
          // type: text, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.page.ct2,
            rippleRippleColor: t.ripple.ctOnTransparent,
            inFocus: {
              buttonBgColor: t.buttonTransparent.bgFocus[0],
            },
          }]
          // type: text, color: normal2
          export const normal2: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.buttonNormal.bg[0],
            rippleRippleColor: t.ripple.ctOnTransparent,
            inFocus: {
              buttonBgColor: t.buttonTransparent.bgFocus[0],
            },
          }]
        }
      }
    }
    
  }
  
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


