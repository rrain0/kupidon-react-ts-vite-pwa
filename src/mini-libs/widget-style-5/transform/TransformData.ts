import { CssAProp } from 'src/mini-libs/widget-style-5/css/prop/CssAProp.ts'


export type TransformData =
  | { elem: string }
  | { state: string }
  | { media: string }
  | { prop: string, value: string, aProp?: CssAProp | undefined }

