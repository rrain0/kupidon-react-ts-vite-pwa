import { TypeU } from 'src/utils/common/TypeU.ts'
import { CssU } from 'src/utils/css/CssU.ts'
import CssLength = CssU.CssLength
import Pu = TypeU.Pu
import isdef = TypeU.isdef
import toPx = CssU.toPx




export const virtualOffset = ({
  t, r, b, l, v, h, a,
}: Pu<{
  t: CssLength, r: CssLength, b: CssLength, l: CssLength, h: CssLength, v: CssLength, a: CssLength
}>) => {
  if (v) { t ??= v; b ??= v }
  if (h) { r ??= h; l ??= h }
  if (a) { t ??= a; r ??= a; b ??= a; l ??= a }
  t = toPx(t); r = toPx(r); b = toPx(b); l = toPx(l)
  const m = {
    ...isdef(t) && { marginTop: `calc(-1 * ${t})` },
    ...isdef(r) && { marginRight: `calc(-1 * ${r})` },
    ...isdef(b) && { marginBottom: `calc(-1 * ${b})` },
    ...isdef(l) && { marginLeft: `calc(-1 * ${l})` },
  }
  const p = {
    ...isdef(t) && { paddingTop: t },
    ...isdef(r) && { paddingRight: r },
    ...isdef(b) && { paddingBottom: b },
    ...isdef(l) && { paddingLeft: l },
  }
  return { ...m, ...p }
}

