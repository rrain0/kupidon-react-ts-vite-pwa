


export const offsetToPageContentPaddings = ({
  t = false, r = false, b = false, l = false, h = false, v = false,
}) => {
  const m = {
    ...(t || v) && { marginTop: 'calc(-1 * var(--pt))' },
    ...(r || h) && { marginRight: 'calc(-1 * var(--pr))' },
    ...(b || v) && { marginBottom: 'calc(-1 * var(--pb))' },
    ...(l || h) && { marginLeft: 'calc(-1 * var(--pl))' },
  }
  const p = {
    ...(t || v) && { paddingTop: 'var(--pt)' },
    ...(r || h) && { paddingRight: 'var(--pr)' },
    ...(b || v) && { paddingBottom: 'var(--pb)' },
    ...(l || h) && { paddingLeft: 'var(--pl)' },
  }
  return { ...m, ...p }
}

