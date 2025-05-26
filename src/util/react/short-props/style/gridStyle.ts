import {
  GridViewShortProps,
  processGridViewShortProps,
} from 'src/util/react/short-props/props/processGridViewShortProps.ts'


export const gridStyle = <P extends object>(
  gridShortProps: P & GridViewShortProps
) => {
  const { css, gridViewRest } = processGridViewShortProps(gridShortProps)
  return [{ display: 'grid' }, ...css, gridViewRest]
}
