import { css } from '@emotion/react'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { WidgetStyle } from 'src/mini-libs/widget-style/WidgetStyle0.ts'
import generatePropVar = WidgetStyle.generatePropVar
import generatePropVarDefault = WidgetStyle.generatePropVarDefault
import generateElDotClass = WidgetStyle.generateElDotClass
import generateElThis = WidgetStyle.generateElThis




export namespace PieProgressStyle {
  
  
  export namespace El {
    export const clazz = {
      pieProgress: 'rrainuiPieProgress',
    } as const
    
    export const dotClazz = generateElDotClass(clazz)
    
    const elMain = {
      pieProgress: dotClazz.pieProgress,
    } as const
    export const el = {
      ...elMain,
    } as const
    
    export const thiz = generateElThis(el)
  }
  export namespace Prop {
    export const prop = {
      progressColor: '--progress-color',
      restColor:     '--rest-color',
    } as const
    export const varr = generatePropVar(prop)
    export const vard = generatePropVarDefault(prop)
  }
  
  
  
  export const defolt = css`
    ${El.thiz.pieProgress}{
      ${Prop.prop.progressColor}: transparent;
      ${Prop.prop.restColor}:     white;
    }
  `
  
  
  
}