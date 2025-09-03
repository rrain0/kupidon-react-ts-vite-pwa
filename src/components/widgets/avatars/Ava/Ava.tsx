import styled from '@emotion/styled'
import { flexStyle } from '@libs/short-propsed/style/flexStyle.ts'
import React from 'react'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import AvaContent, { AvaContentProps } from 'src/components/widgets/avatars/Ava/AvaContent.tsx'







export type AvaProps =
  & Omit<React.ComponentProps<typeof Flex>, 'children'>
  & AvaContentProps



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
