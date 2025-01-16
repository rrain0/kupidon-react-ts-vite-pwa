import { WidgetElem } from 'src/mini-libs/widget-style-5.1/WidgetElem.ts'


export class Widget {
  
  constructor(
    readonly root: WidgetElem,
    readonly elems: Record<string, WidgetElem>,
  ) { }
  
}

