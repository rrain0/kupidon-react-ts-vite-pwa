import {
  GridViewShortProps,
  processGridViewShortProps,
} from 'src/utils/react/short-props/props/processGridViewShortProps.ts'


export const gridStyle = <P extends object>(
  gridShortProps: P & GridViewShortProps
) => {
  const { css, gridViewRest } = processGridViewShortProps(gridShortProps)
  return [{ display: 'grid' }, ...css, gridViewRest]
}
