import { CssAttr } from 'src/mini-libs/widget-style-5/css/attr/CssAttr.ts'
import { CssEnumAttr } from 'src/mini-libs/widget-style-5/css/attr/CssEnumAttr.ts'
import { CssPseudoClass } from 'src/mini-libs/widget-style-5/css/pseudo-class/CssPseudoClass.ts'


export type CssState = CssPseudoClass | CssAttr | CssEnumAttr


export type ElemStateValue = undefined | '' | true | string

