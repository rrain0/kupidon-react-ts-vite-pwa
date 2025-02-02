import { Widget } from 'src/mini-libs/widget-style-6/Widget.ts'
import { CommonStates } from 'src/mini-libs/widget-style-6/WidgetCommonEntities.ts'
import { AdditionalProps } from 'src/mini-libs/widget-style-6/WidgetEntities.ts'
import { AppStyle, AppWidgetStyle, WidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle.ts'




export namespace EmptyS6 {
  
  const WidgetStates = CommonStates
  namespace WidgetProps {
    export const color = AdditionalProps.colorAndVarColor
  }
  
  export const W = Widget.of({
    rootElem: undefined,
    elems: { },
    states: WidgetStates,
    props: WidgetProps,
  })
  
  export const t0 = (style: WidgetStyle) => () => W.t(undefined, style)
  export const t = (style: AppWidgetStyle): AppStyle => t => W.t(t, style)
  
}