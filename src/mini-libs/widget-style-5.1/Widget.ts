


export class WidgetElem {



}




export class Widget {
  
  constructor(
    readonly root: WidgetElem,
    readonly elems: Record<string, WidgetElem>,
  ) { }
  
}

