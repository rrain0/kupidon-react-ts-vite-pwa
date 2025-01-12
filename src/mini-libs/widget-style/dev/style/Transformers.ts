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
