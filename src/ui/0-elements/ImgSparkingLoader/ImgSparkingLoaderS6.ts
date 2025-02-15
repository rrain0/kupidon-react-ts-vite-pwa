import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import imgCoverCenter = WidgetStyleCommon.imgCoverCenter




export namespace ImgSparkingLoaderS6 {
  
  export function buildWidgetElems(up?: AttachRootElemParams) {
    const imgFrame = WidgetElem.of({
      className: 'rruiImageSparkingLoaderFrame', ...up,
    })
    const img = WidgetElem.of({
      upElem: imgFrame, upSelector: '>', className: 'rruiImg',
    })
    const spark = WidgetElem.of({
      upElem: imgFrame, upSelector: '>', className: 'rruiSparkingLine',
    })
    return {
      imgFrame,
      img,
      spark,
    } as const
  }
  
  const WidgetElems = buildWidgetElems()
  const WidgetStates = { }
  const WidgetProps = { }
  
  export const W = Widget.of({
    rootElem: WidgetElems.imgFrame,
    elems: WidgetElems,
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
  
  export namespace Parts {
    export const base: WidgetStyle = {
      imgFrame: {
        pos: 'rel', w: 'full', h: 'auto', overflow: 'hidden',
      },
      img: {
        sz: 'full', ...imgCoverCenter,
      },
    }
    
    export namespace Type {
      
      export namespace img {
        export namespace Shape {
          export namespace img {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: img, shape: img, size: auto
              export const auto: WidgetStyle = [base, {
              
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          imgFrame: {
            bgColor: t.boxTrans.bg,
            color: t.boxTrans.ctSec,
          },
        })
        export namespace Color {
          // type: img, color: normal
          export const normal: AppWidgetStyle = t => [baseColor, {
          
          }]
        }
      }
      
    }
  }
  
  export const S = combinePartsToTypeShapeSizeColor(Parts)
  
}






