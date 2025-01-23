import { StringU } from '@util/common/StringU.ts'
import { RippleStyle } from 'src/_old0/ui/0-elements/Ripple0/RippleStyle.ts'
import { CssAttrs } from 'src/mini-libs/widget-style-4/css/CssAttr.ts'
import { CssElem } from 'src/mini-libs/widget-style-4/css/CssElem.ts'
import { CssProp, CssProps } from 'src/mini-libs/widget-style-4/css/CssProp.ts'
import { CssPropEnum } from 'src/mini-libs/widget-style-4/css/CssPropEnum.ts'
import { CssPseudos } from 'src/mini-libs/widget-style-4/css/CssPseudo.ts'
import { CssWidget } from 'src/mini-libs/widget-style-4/widget/CssWidget.ts'
import capitalize = StringU.capitalize



export namespace ButtonS6 {
  
  
  export const buildButtonWidget = (rootConfig?: {
    widget: CssWidget<any>,
    upElementName: string,
    upSelector: string,
    widgetName: string,
  }): CssWidget<any> => {
    
    const button = new CssElem('rruibutton', {
      normal: CssPseudos.empty,
      hover: CssPseudos.hover,
      active: CssPseudos.active,
      focus: CssPseudos.focus,
      focusVisible: CssPseudos.focusVisible,
      readOnly: CssPseudos.readOnly,
      disabled: CssPseudos.disabled,
      error: CssAttrs.dataError,
    }, {
      color: CssProps.color,
    })
    const border = new CssElem('rruiBorder', { }, { })
    const ripple = new CssElem(RippleStyle.El0.frameClassName, { }, {
      mode: new CssPropEnum(RippleStyle.Prop.mode, ['center', 'cursor']),
      color: new CssProp(RippleStyle.Prop.color),
    })
    
    const withPrefix = (str: string) => {
      if (!rootConfig?.widgetName) return str
      return `${rootConfig.widgetName}${capitalize(str)}`
    }
    
    const buttonWidget = (
      rootConfig
        ? rootConfig.widget.add(
          rootConfig.upElementName,
          rootConfig.upSelector,
          // @ts-ignore
          withPrefix('button'),
          button,
        )
        : CssWidget.ofRoot('button', button)
    )
      // @ts-ignore
      .add(withPrefix('button'), '>', withPrefix('border'), border)
      // @ts-ignore
      .add(withPrefix('border'), '>', withPrefix('ripple'), ripple)
    
    return buttonWidget
  }
  
  export const W = buildButtonWidget()
  
  
}


