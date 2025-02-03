import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon'
import { ReactU } from 'src/util/react/ReactU'
import Children = ReactU.Children
import flexC = EmotionCommon.flexC



export type SelectItemTextProps = Children

const SelectItemText = React.memo(
  (props: SelectItemTextProps) => {
    
    const {
      children,
    } = props
    
    return (
      <TextBox>
        <Text>{children}</Text>
      </TextBox>
    )
  }
)
export default SelectItemText




const TextBox = styled.div`
  width: 100%;
  min-height: 100%;
  ${flexC};
`
const Text = styled.div`
  align-self: center;
  //background: #ffff0022;
  overflow-wrap: anywhere;
`
