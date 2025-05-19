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
import absTrbl = WidgetStyleCommon.absTrbl
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
    
    const bord = WidgetElem.of({
      upElem: button, upSelector: '>', className: 'rruiBorder',
    })
    const rippleElems = RippleS6.buildWidgetElems({ upElem: bord, upSelector: '>' })
    
    const buttonCont = WidgetElem.of({
      upElem: button, upSelector: '>', className: 'rruiButtonContent',
    })
    
    return {
      button,
      bord,
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
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          overflowWrap: 'anywhere',
          overflow: 'hidden',
          transition:
            'background linear 300ms,' +
            'color linear 300ms',
        }],
        bord: {
          ...absTrbl,
          pointerEvents: 'none',
          r: 'inherit',
          transition: 'border-color linear 300ms',
          opacity: 0.999, // fix to position ripple behind (block??) content
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
                  ...Txt.s15,
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
                  ...Txt.s15,
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonBgColor: t.boxNormal.bg,
          buttonColor: t.boxNormal.ct,
          rippleColor: t.ripple.ct,
          inFocus: {
            buttonBgColor: t.boxNormal.bgFc,
            buttonColor: t.boxNormal.ctFc,
          },
          disabled: {
            buttonBgColor: t.boxDisabled.bg,
            buttonColor: t.boxDisabled.ct,
          },
        })
        export namespace Color {
          // type: filled, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxNormal.bg,
            buttonColor: t.boxNormal.ct,
            inFocus: {
              buttonBgColor: t.boxNormal.bgFc,
              buttonColor: t.boxNormal.ctFc,
            },
          }]
          // type: filled, color: normal2
          export const normal2: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxNormal2.bg,
            buttonColor: t.boxNormal2.ct,
            inFocus: {
              buttonBgColor: t.boxNormal2.bgf,
              buttonColor: t.boxNormal2.ctf,
            },
          }]
          // type: filled, color: normal3
          export const normal3: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxNormal3.bg,
            buttonColor:   t.boxNormal3.ct,
            inFocus: {
              buttonBgColor: t.boxNormal3.bgf,
              buttonColor: t.boxNormal3.ctf,
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
            buttonBgColor: t.boxAccent.bg,
            buttonColor: t.boxAccent.ct,
            inFocus: {
              buttonBgColor: t.boxAccent.bgf,
              buttonColor: t.boxAccent.ctf,
            },
          }]
          // type: filled, color: accent2
          export const accent2: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxAccent2.bg,
            buttonColor: t.boxAccent2.ct,
            inFocus: {
              buttonBgColor: t.boxAccent2.bgFc,
              buttonColor: t.boxAccent2.ctFc,
            },
          }]
          // type: filled, color: accent3
          export const accent3: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxAccent3.bg,
            buttonColor: t.boxAccent3.ct,
            inFocus: {
              buttonBgColor: t.boxAccent3.bgFc,
              buttonColor: t.boxAccent3.ctFc,
            },
          }]
          // type: filled, color: accent4
          export const accent4: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxAccentCt4.bg,
            buttonColor: t.boxAccentCt4.ct,
            rippleColor: t.ripple.ctOnLight,
            buttonBoxShadow: `0px 4px 15px 0px ${t.boxNormal4.shadow}`,
            inFocus: {
              buttonBgColor: t.boxAccentCt4.bgf,
              buttonColor: t.boxAccentCt4.ctf,
              buttonBoxShadow: 'none',
            },
          }]
          
          // type: filled, color: main
          export const main: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxMain.bg,
            buttonColor: t.boxMain.ct,
            inFocus: {
              buttonBgColor: t.boxMain.bgFc,
              buttonColor: t.boxMain.ctFc,
            },
          }]
          // type: filled, color: main2
          export const main2: AppWidgetStyle = t => [baseColor, {
            buttonBg: `linear-gradient(to bottom,
              ${t.boxMain2.bgGrad[0]}, ${t.boxMain2.bgGrad[1]}, ${t.boxMain2.bgGrad[2]}
            )`,
            buttonBackgroundSize: '100% 200%',
            buttonBackgroundPosition: '0 100%',
            buttonColor: t.boxMain2.ct,
            buttonTransition: 'background-position 200ms ease-in-out',
            inFocus: {
              buttonBackgroundPosition: '0 0',
              buttonColor: t.boxMain2.ctFc,
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
      
      export namespace outlined {
        export namespace Shape {
          export namespace rounded {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: outlined, shape: rounded, size: md
              export const md: WidgetStyle = [base, {
                button: {
                  wMin: 90, w: 'ct', hMin: 40, r: 'round', p: [8, 20], g: '0.6em',
                  ...Txt.s15Bold,
                },
                bord: {
                  bd: '2px solid',
                },
              }]
              // type: outlined, shape: rounded, size: sm
              export const sm: WidgetStyle = [base, {
                button: {
                  w: 'ct', hMin: 30, r: 'round', p: [4, 16],
                  ...Txt.s15Bold,
                },
                bord: {
                  bd: '2px solid',
                },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonBgColor: t.boxNormalCt.bg,
          buttonColor: t.boxNormalCt.ct,
          bordBdColor: t.boxNormalCt.ct,
          rippleColor: t.ripple.ctOnTrans,
          inFocus: {
            buttonBgColor: t.boxNormalCt.bgf,
            buttonColor: t.boxNormalCt.ctf,
          },
          disabled: {
            buttonBgColor: t.boxDisabled.bg,
            buttonColor: t.boxDisabled.ct,
          },
        })
        export namespace Color {
          // type: outlined, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxNormalCt.bg,
            buttonColor: t.boxNormalCt.ct,
            bordBdColor: t.boxNormalCt.ct,
            inFocus: {
              buttonBgColor: t.boxNormalCt.bgf,
              buttonColor: t.boxNormalCt.ctf,
            },
          }]
          // type: outlined, color: accent
          export const accent: AppWidgetStyle = t => [baseColor, {
            buttonBgColor: t.boxAccentCt.bg,
            buttonColor: t.boxAccentCt.ct,
            bordBdColor: t.boxAccentCt.ct,
            rippleColor: t.boxAccentCt.ctRipple,
            inFocus: {
              buttonBgColor: t.boxAccentCt.bgf,
              buttonColor: t.boxAccentCt.ctf,
              bordBdColor: t.boxAccentCt.ctf,
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
          buttonColor: t.boxTransNormal.ct,
          rippleColor: t.ripple.ctOnTrans,
          inFocus: {
            buttonBgColor: t.boxTransNormal.bgf,
          },
          disabled: {
            buttonBgColor: t.boxDisabled.bg,
            buttonColor: t.boxDisabled.ct,
          },
        })
        export namespace Color {
          // type: text, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.boxTransNormal.ct,
            rippleColor: t.ripple.ctOnTrans,
            inFocus: {
              buttonBgColor: t.boxTransNormal.bgf,
            },
          }]
          // type: text, color: secondary
          export const secondary: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.boxTransSec.ct,
            rippleColor: t.ripple.ctOnTrans,
            inFocus: {
              buttonBgColor: t.boxTransSec.bgf,
            },
          }]
        }
      }
      
      export namespace link {
        export namespace Shape {
          export namespace rect {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: link, shape: rect, size: smFit
              export const smFit: WidgetStyle = [base, {
                button: {
                  sz: 'ct', g: 3,
                  ...Txt.s15Bold,
                  overflow: 'visible',
                },
                rippleFrameR: 6,
                bordAb: -2,
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          buttonColor: t.boxTransNormal.ct,
          rippleColor: t.ripple.ctOnTrans,
          inFocus: {
            bordBdb: `2px solid ${t.boxTransNormal.ct}`,
          },
        })
        export namespace Color {
          // type: link, color: secondary2
          export const secondary2: AppWidgetStyle = t => [baseColor, {
            buttonColor: t.boxTransSec2.ct,
            rippleColor: t.ripple.ctOnTrans,
            inFocus: {
              bordBdb: `2px solid ${t.boxTransSec2.ct}`,
            },
          }]
        }
      }
    }
    
  }
  
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


