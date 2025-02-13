import { AdditionalStates } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import {
  WidgetElem,
} from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import { AttachRootElemParams, Widget, WidgetState } from 'src/mini-libs/widget-style-6/Widget.ts'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { RippleS6 } from 'src/ui/0-elements/Ripple/RippleS6.ts'
import resetButton = WidgetStyleCommon.resetButton
import row = WidgetStyleCommon.row
import abs = WidgetStyleCommon.abs
import Txt = WidgetStyleCommon.Txt




export namespace ButtonS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const button = WidgetElem.of({
      className: 'rruiButton', ...up,
      states: {
        selected: AdditionalStates.selected,
        locked: AdditionalStates.locked,
      },
    })
    const border = WidgetElem.of({
      upElem: button, upSelector: '>', className: 'rruiBorder',
    })
    const rippleElems = RippleS6.buildWidgetElems({ upElem: border, upSelector: '>' })
    return {
      button,
      border,
      ...rippleElems,
    } as const
  }
  
  export function buildWidgetStates(elems: ReturnType<typeof buildWidgetElems>) {
    return {
      selected: WidgetState.of([elems.button, elems.button.ss!.selected]),
      inFocus: WidgetState.of([elems.button, CommonStates.inFocus]),
      disabled: WidgetState.of([elems.button, CommonStates.disabled]),
      locked: WidgetState.of([elems.button, elems.button.ss!.locked]),
      error: WidgetState.of([elems.button, CommonStates.error]),
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = buildWidgetStates(WidgetElems)
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
    
    export const base: WidgetStyle = [
      {
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
      },
      RippleS6.Parts.base,
    ]
    
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
                  ...Txt.s14,
                },
              }]
              // type: filled, shape: rect, size: lg
              export const lg: WidgetStyle = [base, {
                button: {
                  w: 'full', hMin: 50, r: 15, p: [8, 10],
                  ...Txt.s18WideLh150,
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
                  ...Txt.s15Thin,
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
                  ...Txt.s15Thin,
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonBgColor: t.buttonNormal.bg[0],
          buttonColor: t.buttonNormal.ct[0],
          rippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFc,
            buttonColor: t.buttonNormal.ctFc,
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
              buttonBgColor: t.buttonNormal.bgFc,
              buttonColor: t.buttonNormal.ctFc,
            },
          }]
          // type: filled, color: normal2
          export const normal2: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonNormal.bg2,
            buttonColor: t.buttonNormal.ct[0],
            inFocus: {
              buttonBgColor: t.buttonNormal.bgFc2,
              buttonColor: t.buttonNormal.ctFc,
            },
          }]
          // type: filled, color: normal3
          export const normal3: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonNormal.bg3,
            buttonColor:   t.buttonNormal.ct3,
            inFocus: {
              buttonBgColor: t.buttonNormal.bg3Fc,
              buttonColor: t.buttonNormal.ct3Fc,
            },
          }]
          // type: filled, color: normal4
          export const normal4: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxNormal4.bg,
            buttonColor:   t.boxNormal4.ct,
            rippleColor: t.ripple.ctOnLight,
            buttonBoxShadow: `0px 4px 15px 0px ${t.boxNormal4.shadow}`,
            inFocus: {
              buttonBgColor: t.boxNormal4.bgf,
              buttonColor:   t.boxNormal4.ctf,
              buttonBoxShadow: 'none',
            },
          }]
          // type: filled, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.buttonAccent.bg[0],
            buttonColor: t.buttonAccent.ct[0],
            inFocus: {
              buttonBgColor: t.buttonAccent.bgFc,
              buttonColor: t.buttonAccent.ctFc,
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
              buttonBgColor: t.buttonMain.bgFc,
              buttonColor: t.buttonMain.ctFc,
            },
          }]
          // type: filled, color: danger
          export const danger: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxDanger.bg,
            buttonColor: t.boxDanger.ct,
            inFocus: {
              buttonBgColor: t.boxDanger.bgf,
              buttonColor: t.boxDanger.ctf,
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
                  ...Txt.s15Thin,
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
                  ...Txt.s15Thin,
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
          rippleColor: t.ripple.ctOnTrans,
          inFocus: {
            buttonBgColor: t.buttonNormal.bgFc,
            buttonColor: t.buttonNormal.ctFc,
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
              buttonBgColor: t.buttonNormal.bgFc,
              buttonColor: t.buttonNormal.ctFc,
            },
          }]
          // type: outlined, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.buttonAccent.bg[0],
            borderBdColor: t.buttonAccent.bg[0],
            inFocus: {
              buttonBgColor: t.buttonAccent.bgFc,
              buttonColor: t.buttonAccent.ctFc,
              borderBdColor: t.buttonAccent.bgFc,
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
                  ...Txt.s16Thin,
                },
              }]
              // type: text, shape: rect, size: lg
              export const lg: WidgetStyle = [base, {
                button: {
                  w: 'full', hMin: 50, r: 15, p: [8, 6],
                  ...Txt.s18WideLh150,
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
                  ...Txt.s18LhNorm,
                },
              }]
              // type: text, shape: rounded, size: md2
              export const md2: WidgetStyle = [md, {
                button: {
                  pH: 16,
                  ...Txt.s16LhNorm,
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
                  ...Txt.s16LhNorm,
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonColor: t.page.ct2,
          rippleColor: t.ripple.ctOnTrans,
          inFocus: {
            buttonBgColor: t.buttonTrans.bgFc,
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
            rippleColor: t.ripple.ctOnTrans,
            inFocus: {
              buttonBgColor: t.buttonTrans.bgFc,
            },
          }]
          // type: text, color: normal2
          export const normal2: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.buttonNormal.bg[0],
            rippleColor: t.ripple.ctOnTrans,
            inFocus: {
              buttonBgColor: t.buttonTrans.bgFc,
            },
          }]
        }
      }
    }
    
  }
  
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


