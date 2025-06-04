import { buildWidget } from 'src/mini-libs/widget-style-7/WidgetBuildedConfig.ts'
import {
  WidgetConfig,
  WidgetElements, WidgetElemPropReplacers,
  WidgetStyleReplacers,
} from 'src/mini-libs/widget-style-7/WidgetConfig.ts'
import {
  _wst7TestMatch,
  GetOrWidgetStyle,
  PrimitiveStyleValue, transform, WidgetStyle,
} from 'src/mini-libs/widget-style-7/WidgetTransform.ts'




export function widget7Test() {
  //_wst7TestMatch()
  buttonTest()
}



function buttonTest() {
  
  
  const customElemReplacers = {
    button: subStyle => ({ '&.rruiButton': subStyle }),
    border: subStyle => ({ '&.rruiButton > .rruiBorder': subStyle }),
  } satisfies WidgetStyleReplacers
  
  const elemCustomStateReplacers = {
    dataSelected: subStyle => ({ '[data-selected]': subStyle }),
    inFocus: subStyle => [
      elemCustomStateReplacers.hoverableHover(subStyle),
      { ':active': subStyle },
      { ':focus-visible': subStyle },
    ],
    hoverableHover: subStyle => ({
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': subStyle,
      },
    }),
    dataLocked: subStyle => ({ '[data-locked]': subStyle }),
    dataError: subStyle => ({ '[data-error]': subStyle }),
  } satisfies WidgetStyleReplacers
  
  const customPropReplacers = {
    sz: propValue => {
      if (propValue === 'full') propValue = '100%'
      if (propValue === 'ct') propValue = 'fit-content'
      return {
        width: propValue,
        height: propValue,
      }
    },
    colorAndVarColor: propValue => ({
      color: propValue,
      '--color': propValue,
    }),
  } satisfies WidgetElemPropReplacers
  
  
  // TODO Style - new widget config
  const ButtonS7ElemsConfig = {
    $button: {
      className: 'rruiButton',
      states: {
        ':$selected': elemCustomStateReplacers.dataSelected,
        ':$inFocus': elemCustomStateReplacers.inFocus,
        ':$hover': elemCustomStateReplacers.hoverableHover,
        ':$locked': elemCustomStateReplacers.dataLocked,
        ':$error': elemCustomStateReplacers.dataError,
      },
      props: {
        sz: customPropReplacers.sz,
        color: customPropReplacers.colorAndVarColor,
      },
      nodes: {
        '>': {
          $border: {
            className: 'rruiBorder',
            nodes: {
              '>': {
                $ripple: {
                  className: 'rruiRippleFrame',
                },
              },
            },
          },
        },
      },
    },
  } satisfies WidgetElements
  
  
  const button = ButtonS7ElemsConfig.$button
  
  
  
  const ButtonS7WidgetConfig = {
    elems: ButtonS7ElemsConfig,
    widgetStates: {
      ':!selected': { elem: '$button', state: ':$selected' },
      ':!inFocus': { elem: '$button', state: ':$inFocus' },
      ':!hover': { elem: '$button', state: ':$hover' },
      ':!locked': { elem: '$button', state: ':$locked' },
      ':!error': { elem: '$button', state: ':$selected' },
    },
  } satisfies WidgetConfig
  
  
  
  const builtWidget = buildWidget(ButtonS7WidgetConfig)
  console.log('builtWidget.elems', builtWidget.elems)
  
  
  
  const style = {
    '.c$button:hover:$hover.cc>.cc $border+:!hover{backgroundColor': {
      sz: 143,
      aa: 'bb',
    },
  }
  const testTransform = transform(
    style,
    undefined,
    builtWidget,
  )
  console.log('style', style)
  console.log('testTransform', testTransform)
  
  
}
