import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import row = WidgetStyleCommon.row



export namespace SelectMeterS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const meterFrame = WidgetElem.of({
      className: 'rruiMeterFrame', ...up,
    })
    const meter = WidgetElem.of({
      upElem: meterFrame, upSelector: '>', className: 'rruiMeter',
    })
    const meter0 = WidgetElem.of({
      upElem: meterFrame, upSelector: '>', className: 'rruiMeter0',
    })
    const meter1 = WidgetElem.of({
      upElem: meterFrame, upSelector: '>', className: 'rruiMeter1',
    })
    const meter2 = WidgetElem.of({
      upElem: meterFrame, upSelector: '>', className: 'rruiMeter2',
    })
    return { meterFrame, meter, meter0, meter1, meter2 } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = { }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.meterFrame,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
      meterFrame: {
        w: 'ct', h: 'auto',
        ...row, g: 6,
        pointer: false,
      },
      meter: {
        sz: 8, r: 'round',
      },
      meter0: {
        bgColor: '#dddddd',
      },
      meter1: {
        bgColor: '#999999',
      },
      meter2: {
        bgColor: '#444444',
      },
    }
    
    export namespace Type {
      
      export namespace row {
        export namespace Shape {
          export namespace round {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: row, shape: round, size: md
              export const md: WidgetStyle = [base, { }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({ })
        export namespace Color {
          // type: row, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
            meter0BgColor: t.boxNormal.ctSec5,
            meter1BgColor: t.boxNormal.ct7,
            meter2BgColor: t.boxNormal.ct3,
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


