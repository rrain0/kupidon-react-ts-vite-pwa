
import { Pu } from '@utils/base/typeUtils.ts'




export const offsetToPageContentPaddings = ({
  t, r, b, l, v, h, a,
}: Pu<{
  t: boolean, r: boolean, b: boolean, l: boolean, h: boolean, v: boolean, a: boolean
}>) => {
  if (v) { t ??= v; b ??= v }
  if (h) { l ??= h; r ??= h }
  if (a) { t ??= a; r ??= a; b ??= a; l ??= a }
  const m = {
    ...t && { marginTop: 'calc(-1 * var(--pt))' },
    ...r && { marginRight: 'calc(-1 * var(--pr))' },
    ...b && { marginBottom: 'calc(-1 * var(--pb))' },
    ...l && { marginLeft: 'calc(-1 * var(--pl))' },
  }
  const p = {
    ...t && { paddingTop: 'var(--pt)' },
    ...r && { paddingRight: 'var(--pr)' },
    ...b && { paddingBottom: 'var(--pb)' },
    ...l && { paddingLeft: 'var(--pl)' },
  }
  return { ...m, ...p }
}

