import { CssAProp } from 'src/mini-libs/widget-style-5/css/prop/CssAProp.ts'


export type ElemTransformData = { elem: string }
export type PseudoTransformData = { pseudo: string, value?: string | undefined }
export type AttrTransformData = { state: string, value?: string | undefined }
export type MediaTransformData = { media: string }
export type PropTransformData = { prop: string, value: string, aProp?: CssAProp | undefined }

export type TransformData =
  | ElemTransformData
  | PseudoTransformData
  | AttrTransformData
  | MediaTransformData
  | PropTransformData

