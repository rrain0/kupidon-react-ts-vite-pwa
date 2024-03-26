import { css } from '@emotion/react'
import { AppTheme } from 'src/ui/theme/AppTheme.ts'
import { ElementStyle } from 'src/ui/elements/ElementStyle.ts'
import Theme = AppTheme.Theme
import generatePropVar = ElementStyle.generatePropVar
import generatePropVarDefault = ElementStyle.generatePropVarDefault
import generateElDotClass = ElementStyle.generateElDotClass
import generateElThis = ElementStyle.generateElThis




export namespace SvgIcStyle {
  
  export namespace El {
    export const clazz = {
      icon: 'rrainuiIcon',
    } as const
    export const dotClazz = generateElDotClass(clazz)
    export const el = {
      icon: dotClazz.icon,
    } as const
    export const thiz = generateElThis(el)
  }
  export namespace Prop {
    export const prop = {
      size:        '--icon-size',
      color:       '--icon-color',
      accentColor: '--icon-accent-color',
    } as const
    export const varr = generatePropVar(prop)
    export const vard = generatePropVarDefault(prop)
  }
  
  
  
  
  export const normal = (t:Theme)=>css`
    ${El.thiz.icon} {
      ${Prop.prop.size}: auto;
      ${Prop.prop.color}: 'black';
    }
  `
  
  
}