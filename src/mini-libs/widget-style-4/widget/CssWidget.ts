import { ObjectU } from '@util/common/ObjectU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { CssAttr } from 'src/mini-libs/widget-style-4/css/CssAttr.ts'
import { CssAttrEnum } from 'src/mini-libs/widget-style-4/css/CssAttrEnum.ts'
import { CssPseudos } from 'src/mini-libs/widget-style-4/css/CssPseudo.ts'
import { CssState } from 'src/mini-libs/widget-style-4/css/CssState.ts'
import RecordRo = TypeU.RecordRo
import { CssWidgetElem } from './CssWidgetElem'
import { CssProp } from '../css/CssProp'
import { CssElem } from '../css/CssElem'
import ObjectValuesType = ObjectU.ObjectValuesType
import ObjectKeysType = ObjectU.ObjectKeysType



export class CssWidget<const in out Es extends RecordRo<string, CssWidgetElem<any, any>>> {
  
  constructor(
    // root element object
    readonly root: NoInfer<ObjectValuesType<Es>>,
    // elements table: name -> element
    readonly elements: Es,
    // TODO shortcut states mapping: state -> element & state
    //readonly states!: Record<string, { elem: Elem, state: string }>,
  ) { }
  
  
  static ofRoot<
    const NewE extends string,
    const NewSs extends RecordRo<string, CssState>,
    const NewPs extends RecordRo<string, CssProp>,
  >(
    elementName: NewE,
    element: CssElem<NewSs, NewPs>
  ): CssWidget<RecordRo<NewE, CssWidgetElem<NewSs, NewPs>>> {
    const root = new CssWidgetElem(elementName, element)
    return new CssWidget<RecordRo<NewE, CssWidgetElem<NewSs, NewPs>>>(
      root,
      { [elementName]: root } as RecordRo<NewE, CssWidgetElem<NewSs, NewPs>>,
    )
  }
  
  
  add<
    const NewE extends Exclude<string, ObjectKeysType<Es>>,
    const NewSs extends RecordRo<string, CssState>,
    const NewPs extends RecordRo<string, CssProp>,
  >(
    up: ObjectKeysType<Es>,
    selector: string,
    elementName: NewE,
    element: CssElem<NewSs, NewPs>
  ): CssWidget<Es & RecordRo<NewE, CssWidgetElem<NewSs, NewPs>>> {
    const elem = new CssWidgetElem(elementName, element, this.elements[up], selector)
    return new CssWidget<Es & RecordRo<NewE, CssWidgetElem<NewSs, NewPs>>>(
      this.root as any,
      { ...this.elements, [elementName]: elem } as any,
    )
  }
  
  
}



interface Elem {}

const generateWidget = (root: Elem, prefix: string) => {

}



// Examples
{
  const btn = new CssElem('rrainuiButton', {
    normal: CssPseudos.empty,
    hover: CssPseudos.hover,
    variant: new CssAttrEnum('variant', ['filled', 'outlined']),
    withBorder: new CssAttr('withBorder'),
  }, { })
  const border = new CssElem('rrainuiBorder', { }, { })
  
  const btnWidget = CssWidget
    .ofRoot('button', btn)
    .add('button', '>', 'border', border)
  
  // &.rrainuiButton:hover[variant=filled][withBorder]
  const btnHoverFilledWithBorderThisSelector = btnWidget.elements.button.element.useStateThis({
    hover: true,
    variant: 'filled',
    withBorder: true,
  })
  
  //console.log('CssElem btnHoverFilledWithBorderThisSelector', btnHoverFilledWithBorderThisSelector)
  
  // TODO if state empty, it accepts anyval
  /* const a = btnWidget.elements.border.element.useStateThis({
    hover1: true,
    variant: 'filled',
    withBorder: true,
    aaaaa: true,
  }) */
}



