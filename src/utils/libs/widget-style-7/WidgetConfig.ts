import {
  GetOrWidgetStyle,
  PrimitiveStyleValue, WidgetStyle,
} from '@libs/widget-style-7/WidgetTransform.ts'




/*
  STATE ORDER (in CSS):
    normal
    :checked / selected
    inFocus (:hover or :active or :focus-visible)
    :hover
    :active
    :focus
    :focus-visible
    :read-only
    :disabled
    locked - это короткий disabled (используется disabled + locked),
             например во время layout transition.
             Здесь кнопку нельзя нажать, но выглядит она как обычно.
    error
*/





export type WidgetElemName = `$${string}`
export type WidgetElemStateName = `:$${string}`
export type WidgetStateName = `:!${string}`
export type WidgetElemPropName = string



export type WidgetStyleReplacer<Props> = (
  (subStyle: GetOrWidgetStyle<Props>) => GetOrWidgetStyle<Props>
)
export type WidgetElemPropReplacer = (
  (propValue: PrimitiveStyleValue) => WidgetStyle
)


export type WidgetStyleReplacers = Record<string, WidgetStyleReplacer<any>>
export type WidgetElemPropReplacers = Record<string, WidgetElemPropReplacer>


export type WidgetSelectorToElemReplacers = (
  Record<WidgetElemName, WidgetStyleReplacer<any>>
)
export type WidgetSelectorToElemStateReplacers = (
  Record<WidgetElemStateName, WidgetStyleReplacer<any>>
)
export type WidgetSelectorToElemPropReplacers = (
  Record<WidgetElemPropName, WidgetElemPropReplacer>
)

export type WidgetState = { elem: string, state: string }
export type WidgetConfigWidgetStates = Record<WidgetStateName, WidgetState>


// TODO S7 - сделать рекурсивный тип, который достанет все имена элементов, их состояний и пропов
/* export type GetWidgetConfigElems<
  ConfElemsTree extends WidgetElemConfig['nodes'],
  Elems extends { [elem: string]: { states: string[], props: string[] } } = { },
> = (
  ConfElemsTree extends
) */


export type WidgetElemConfig = {
  className: string
  states?: undefined | WidgetSelectorToElemStateReplacers
  props?: undefined | WidgetSelectorToElemPropReplacers
  nodes?: undefined | {
    [downSelector: string]: {
      [elemName: WidgetElemName]: WidgetElemConfig
    }
  }
}
export type WidgetElemConfigNodes = WidgetElemConfig['nodes']



export type WidgetElements = {
  [name: WidgetElemName]: WidgetElemConfig
}


export type WidgetConfig = {
  elems: WidgetElements,
  widgetStates?: undefined | WidgetConfigWidgetStates
  anyElemStates?: undefined | WidgetSelectorToElemStateReplacers
  anyElemProps?: undefined | WidgetSelectorToElemPropReplacers
}

