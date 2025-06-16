import { ObjectU } from '@util/common/ObjectU.ts'
import { AttachRootElemParams, Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { WidgetElem } from 'src/mini-libs/widget-style-6/WidgetEntity.ts'
import {
  AppStyle,
  AppWidgetStyle, combinePartsToTypeShapeSizeColor,
  WidgetStyle, WidgetStyleObj,
} from 'src/mini-libs/widget-style-6/WidgetStyle.ts'
import { WidgetStyleCommon } from 'src/ui-data/style/WidgetStyleCommon.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import imgCoverCenter = WidgetStyleCommon.imgCoverCenter
import absTrbl = WidgetStyleCommon.absTrbl
import flexC = WidgetStyleCommon.flexC
import ObjectPrefixCapitalizeKeys = ObjectU.ObjectPrefixCapitalizeKeys




export namespace ImgSparkS6 {
  
  
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
    const errIcon = ObjectPrefixCapitalizeKeys('err', SvgIconS6.buildWidgetElems({
      upElem: imgFrame, upSelector: '>',
    }))
    return {
      imgFrame,
      img,
      spark,
      ...errIcon,
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
    export const base: WidgetStyle = [
      { err: SvgIconS6.Parts.base },
      {
        imgFrame: {
          pos: 'rel', w: 'full', h: 'auto', overflow: 'hidden',
          ...flexC,
        },
        img: {
          sz: 'full', ...imgCoverCenter,
        },
        err: {
          icon: { sz: '50%' },
        },
      },
    ]
    
    export namespace Type {
      
      export namespace img {
        export namespace Shape {
          export namespace img {
            //export const baseSize: WidgetStyleObj = { ...base }
            export namespace Size {
              // type: img, shape: img, size: auto
              export const auto: WidgetStyle = [base, {
              
              }]
              // type: img, shape: img, size: full
              export const full: WidgetStyle = [base, {
                imgFrame: { sz: 'full' },
              }]
              // type: img, shape: img, size: full
              export const fullW: WidgetStyle = [base, {
                imgFrame: { w: 'full', h: 'auto' },
              }]
              // type: img, shape: img, size: absTrbl
              export const absTrbl: WidgetStyle = [base, {
                imgFrame: { ...WidgetStyleCommon.absTrbl },
              }]
            }
          }
          export namespace square {
            export const baseSize: WidgetStyle = [base, {
              img: { ratio: 1 },
            }]
            export namespace Size {
              // type: img, shape: img, size: auto
              export const auto: WidgetStyle = [baseSize, {
              
              }]
              // type: img, shape: img, size: full
              export const full: WidgetStyle = [baseSize, {
                imgFrame: { sz: 'full' },
              }]
              // type: img, shape: img, size: full
              export const fullW: WidgetStyle = [baseSize, {
                imgFrame: { w: 'full', h: 'auto' },
              }]
              // type: img, shape: img, size: absTrbl
              export const absTrbl: WidgetStyle = [baseSize, {
                imgFrame: { ...WidgetStyleCommon.absTrbl },
              }]
            }
          }
        }
        
        export const baseColor: AppWidgetStyle = t => ({
          imgFrame: {
            bgColor: t.boxSemitrans.bg,
            color: t.boxSemitrans.ctSec,
          },
          errIcon: {
            color: t.errorSec.ct,
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






