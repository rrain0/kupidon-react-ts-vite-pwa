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
    const meter = WidgetElem.of({
      className: 'rruiMeterFrame', ...up,
    })
    const meter0 = WidgetElem.of({
      upElem: meter, upSelector: '>', className: 'rruiMeter0',
    })
    const meter1 = WidgetElem.of({
      upElem: meter, upSelector: '>', className: 'rruiMeter1',
    })
    const meter2 = WidgetElem.of({
      upElem: meter, upSelector: '>', className: 'rruiMeter2',
    })
    return { meter, meter0, meter1, meter2 } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = { }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.meter,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
      meter: {
        w: 'ct', h: 'auto',
        ...row, g: 6,
        pointer: false,
      },
      meter0: {
        sz: 8, r: 'round',
        bgColor: '#dddddd',
      },
      meter1: {
        sz: 8, r: 'round',
        bgColor: '#999999',
      },
      meter2: {
        sz: 8, r: 'round',
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
            meter0BgColor: t.boxNormal.ct4b[0],
            meter1BgColor: t.boxNormal.ct3e[0],
            meter2BgColor: t.boxNormal.ct1b[0],
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}


