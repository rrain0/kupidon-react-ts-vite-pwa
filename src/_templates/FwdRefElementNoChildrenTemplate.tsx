import { css } from '@emotion/react'
import { CssU } from '@util/css/CssU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { TypeU } from 'src/util/common/TypeU.ts'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Pu = TypeU.Pu
import colC = EmotionCommon.colC
import mapToCssCustomProps = ReactU.mapToCssCustomProps
import CssLength = CssU.CssLength



// Old - it just declares
export type MyComponentCssPropsOLD = {
  '--ph': '<length>' // padding horizontal
  '--pv': '<length>' // padding vertical
}


// Use typed css prop names
export const IsWritingFiveDotsCssProps = (cssProps: Pu<{
  ph: CssLength
  pv: CssLength
}> = { }) => mapToCssCustomProps(cssProps)


export type MyComponentExtraProps = Pu<{
  // custom props
  isError: boolean
}>

export type MyComponentProps =
  & Omit<React.ComponentPropsWithRef<'div'>, 'children'>
  & MyComponentExtraProps



const MyComponent = React.memo((props: MyComponentProps) => {
  const {
    isError,
    ...restProps
  } = props
  
  return (
    <div // Frame
      data-display-name='MyComponent'
      css={frameS}
      {...restProps}
    />
  )
})
MyComponent.displayName = 'MyComponent'
//export default MyComponent



const frameS = (t: AppTheme.Theme) => css`
  ${colC};
  width: 100%;
`
