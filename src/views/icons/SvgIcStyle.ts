import { css } from '@emotion/react'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { CommonStyle } from 'src/views/CommonStyle'
import Theme = AppTheme.Theme
import generatePropVar = CommonStyle.generatePropVar
import generatePropVarDefault = CommonStyle.generatePropVarDefault
import generateElDotClass = CommonStyle.generateElDotClass
import generateElThis = CommonStyle.generateElThis




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