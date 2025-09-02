import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { TypeU } from '@utils/common/TypeU.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Pu = TypeU.Pu
import Txt = EmotionCommon.Txt



// TODO Theme
const pastelRainbow = [
  '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff',
  '#d6e6ff', '#d7f9f8', '#ffffea', '#fff0d4', '#fbe0e0', '#e5d4ef',
]



const idToColor = (id: string) => {
  const hash = [...id].reduce((acc, cur) => acc + cur.charCodeAt(0), 0)
  const len = pastelRainbow.length
  return pastelRainbow[hash % len]
}




export type EmptyAvaExtraProps = Pu<{
  id: string
}>

export type EmptyAvaProps =
  & Omit<React.ComponentProps<typeof EmptyAvaView>, 'children'>
  & EmptyAvaExtraProps



const EmptyAva = React.memo((props: EmptyAvaProps) => {
  const {
    id = '',
    ...restProps
  } = props
  
  
  const emptyAvaColor = useMemo(() => idToColor(id), [id])
  
  
  return (
    <EmptyAvaView full center
      data-display-name='EmptyAva'
      css={{ backgroundColor: emptyAvaColor }}
      {...restProps}
    >
      <Flex full center szMax={70}>
        <svg
          width='100%' height='100%'
          viewBox='0 0 100 100'
        >
          <text
            x='50%' y='50%'
            textAnchor='middle' dominantBaseline='middle'
            transform='translate(0,2)'
            fontSize='36'
          >
            🎲
          </text>
        </svg>
      </Flex>
    </EmptyAvaView>
  )
})
EmptyAva.displayName = 'EmptyAva'
export default EmptyAva



const EmptyAvaView = styled(Flex)([Txt.s22, {
  fontSize: '70%',
}])


