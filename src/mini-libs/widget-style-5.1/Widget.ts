import { TypeU } from '@util/common/TypeU.ts'
import {
  Elements2,
  ElemTransformer1, AnyPropTransformer1,
  AnyStateTransformer1, WidgetStyle,
} from 'src/mini-libs/widget-style-5.1/transform/WidgetStyleTransform1.ts'
import RecordRo = TypeU.RecordRo




export interface WidgetElem {
  readonly name: string,
  readonly elem: ElemTransformer1,
  // null if this element is root
  readonly upElem?: WidgetElem | undefined,
  readonly upSelector?: string | undefined,
}


export interface Widget {
  readonly rootElem: WidgetElem
  readonly elems: RecordRo<string, WidgetElem>
  // Состояние самого виджета
  readonly state?: RecordRo<string, any> | undefined
}



export const transformWidgetStyle = (widget: Widget, style: WidgetStyle): string => {
  
  return ''
}



export function testWidget51() {
  const elemFrame: WidgetElem = {
    name: 'frame',
    elem: Elements2.frame,
  }
  const elemBox: WidgetElem = {
    name: 'box',
    upElem: elemFrame, upSelector: '>', elem: Elements2.box,
  }
  
  const frameWidget: Widget = {
    rootElem: elemFrame,
    elems: {
      frame: elemFrame,
      box: elemBox,
    },
  }
  
  
  const widgetStyle: WidgetStyle = {
    hoverTypeRadioBg: 'white',
    frameTypeCheckboxBoxSz: '40%',
    frameRadioBg: 'indianred',
    frameRadioBoxHoverFocusBg: 'aquamarine',
    typeRadio: {
      bg: 'black',
      sz: 100,
    },
    type: {
      checkbox: {
        bg: 'red',
        sz: 200,
      },
      radio: {
        bg: 'green',
        sz: 'full',
      },
    },
  }
  console.log('widgetStyle', widgetStyle)
  
  
  const css = transformWidgetStyle(frameWidget, widgetStyle)
  console.log('css\n', css)
}
