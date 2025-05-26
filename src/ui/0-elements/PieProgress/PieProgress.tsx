import styled from '@emotion/styled'
import { CssU } from '@util/css/CssU.ts'
import { ReactU } from '@util/react/ReactU.ts'
import React from 'react'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import { TypeU } from 'src/util/common/TypeU.ts'
import Pu = TypeU.Pu
import CssColor = CssU.CssColor
import createCssCustomPropsMapper = ReactU.createCssCustomPropsMapper





export const PieProgressCssProps = createCssCustomPropsMapper<Pu<{
  colorAccent: CssColor
  color: CssColor
}>>()


export type PieProgressProps = React.ComponentProps<typeof PieProgressView> & Pu<{
  progress: number // 0..100
}>


const PieProgress = React.memo((props: PieProgressProps) => {
  const {
    progress = 0,
    style,
    ...restProps
  } = props
  
  return (
    <PieProgressView
      data-display-name='PieProgress'
      style={{ '--rotation': `${progress / 100}turn`, ...style }}
      {...restProps}
    />
  )
})
PieProgress.displayName = 'PieProgress'
export default PieProgress



const PieProgressView = styled(Flex)`
  @property --rotation {
    syntax: '<angle>';
    initial-value: 0turn;
    inherits: false;
  }
  
  border-radius: 999999px;
  transition: --rotation 1000ms ease;
  background-image: conic-gradient(
    var(${PieProgressCssProps.get('colorAccent')}) 0turn var(--rotation),
    var(${PieProgressCssProps.get('color')}) var(--rotation) 1turn
  );
  
  ${PieProgressCssProps.map({
    colorAccent: 'transparent',
    color: 'white',
  })}
`




