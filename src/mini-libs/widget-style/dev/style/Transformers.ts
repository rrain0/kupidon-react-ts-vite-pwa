import { TypeU } from '@util/common/TypeU.ts'
import { Transformers } from 'src/mini-libs/widget-style/dev/style/WidgetStyle.ts'
import isnumber = TypeU.isnumber


const hoverableMedia = '(hover: hover) and (pointer: fine)'


// todo think about merging media & selector
const simpleTransformers = {
  width: d => {
    const p = { ...d.at(-1)! }
    p.prop = 'width'
    if (isnumber(p.value)) p.value = `${p.value}px`
    if (p.value === 'full') p.value = '100%'
    return [[...d.slice(0, -1), p]]
  },
  height: d => {
    const p = { ...d.at(-1)! }
    p.prop = 'height'
    if (isnumber(p.value)) p.value = `${p.value}px`
    if (p.value === 'full') p.value = '100%'
    return [[...d.slice(0, -1), p]]
  },
  background: d => {
    const p = { ...d.at(-1)! }
    p.prop = 'background'
    if (p.value === null) p.value = 'none'
    return [[...d.slice(0, -1), p]]
  },
  
  hover: d => {
    // todo - must not check here
    const i = d.findIndex(it => it.state === 'hover')
    if (i === -1) return [d]
    return [d.toSpliced(i, 1, { ...d[i], media: hoverableMedia })]
  },
} satisfies Transformers

const complexTransformers = {
  // width: <value>; height: <value>;
  size: d => {
    const w = simpleTransformers.width(d)
    const h = simpleTransformers.height(d)
    return [...w, ...h] as const
  },
} satisfies Transformers

export const transformers = {
  width: simpleTransformers.width,
  w: simpleTransformers.width,
  height: simpleTransformers.height,
  h: simpleTransformers.height,
  background: simpleTransformers.background,
  bg: simpleTransformers.background,
  size: complexTransformers.size,
  sz: complexTransformers.size,
  hover: simpleTransformers.hover,
} satisfies Transformers





/*
export type Transformer = (data: TransformData0) => TransformData0[]

export type Transformers = Record<string, Transformer>

const hoverableMedia = '(hover: hover) and (pointer: fine)'
// todo think about merging media & selector
export const simpleTransformers = {
  width: d => {
    if (d.prop) return [d]
    d.prop = 'width'
    if (isnumber(d.value)) d.value = `${d.value}px`
    if (d.value === 'full') d.value = '100%'
    return [d]
  },
  height: d => {
    if (d.prop) return [d]
    d.prop = 'height'
    if (isnumber(d.value)) d.value = `${d.value}px`
    if (d.value === 'full') d.value = '100%'
    return [d]
  },
  background: d => {
    if (d.prop) return [d]
    d.prop = 'background'
    if (d.value === null) d.value = 'none'
    return [d] as const
  },
  hover: d => {
    d.media = hoverableMedia
    d.selector = d.selector + ':hover'
    return [d] as const
  },
  active: d => {
    d.selector = d.selector + ':active'
    return [d] as const
  },
  focus: d => {
    d.selector = d.selector + ':focus'
    return [d] as const
  },
  focusVisible: d => {
    d.selector = d.selector + ':focus-visible'
    return [d] as const
  },
  error: d => {
    d.selector = d.selector + '[data-error]'
    return [d] as const
  },
} satisfies Transformers

export const complexTransformers = {
  // width: <value>; height: <value>;
  size: d => {
    const w = simpleTransformers.width({ ...d })
    const h = simpleTransformers.height({ ...d })
    return [...w, ...h] as const
  },
  // :where(:active,:focus,:focus-visible)
  anyFocus: d => {
    const a = simpleTransformers.active({ ...d })
    const f = simpleTransformers.focus({ ...d })
    const fv = simpleTransformers.focusVisible({ ...d })
    return [...a, ...f, ...fv] as const
  },
  // :where(:hover,:focus-visible)
  inFocus: d => {
    const h = simpleTransformers.hover({ ...d })
    const fv = simpleTransformers.focusVisible({ ...d })
    return [...h, ...fv] as const
  },
  
} satisfies Transformers

export const elementTransformers = {
  frame: d => {
    d.selector = d.selector + '.frame'
    return [d] as const
  },
  box: d => {
    d.selector = d.selector + ' > .box'
    return [d] as const
  },
} satisfies Transformers

export const transformers: Transformers = {
  width: simpleTransformers.width,
  w: simpleTransformers.width,
  height: simpleTransformers.height,
  h: simpleTransformers.height,
  background: simpleTransformers.background,
  bg: simpleTransformers.background,
  size: complexTransformers.size,
  sz: complexTransformers.size,
  hover: simpleTransformers.hover,
  hov: simpleTransformers.hover,
  error: simpleTransformers.error,
  err: simpleTransformers.error,
  anyFocus: complexTransformers.anyFocus,
  anyFc: complexTransformers.anyFocus,
  inFocus: complexTransformers.inFocus,
  inFc: complexTransformers.inFocus,
  
  frame: elementTransformers.frame,
  ['']: elementTransformers.frame,
  box: elementTransformers.box,
}
*/


