import styled from '@emotion/styled'
import { flexStyle } from '@util/react/short-props/style/flexStyle.ts'
import React from 'react'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import AvaContent from 'src/ui/1-widgets/avatars/Ava/AvaContent.tsx'






export type AvaExtraProps = {
  id: string
  ava?: string | undefined
  online?: boolean | undefined
  mutualSympathy?: boolean | undefined
  shadow?: boolean | undefined
}

export type AvaProps =
  & Omit<React.ComponentProps<typeof Flex>, 'children'>
  & AvaExtraProps



const Ava = React.memo((props: AvaProps) => {
  const {
    id, ava, online, mutualSympathy, shadow,
    ...restProps
  } = props
  
  const avaProps = { id, ava, online, mutualSympathy, shadow }
  
  return (
    <AvaContainer center
      data-display-name='Ava'
      {...restProps}
    >
      <AvaContent {...avaProps}/>
    </AvaContainer>
  )
})
Ava.displayName = 'Ava'
export default Ava




const AvaContainer = styled(Flex)(flexStyle({
  relative: true, ratio: 1,
}))
