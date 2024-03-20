/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import ArrowReloadIc = SvgIcons.ArrowReloadIc




const ResetButton =
React.memo(
({text,onClick}: { text: string, onClick: ()=>void }) =>{
  return <Button css={ButtonStyle.smallRectAccent}
    onClick={onClick}
  >
    <ArrowReloadIc css={resetButtonIcon}/>
    <ResetButtonText>
      {text}
    </ResetButtonText>
  </Button>
})
export default ResetButton



const resetButtonIcon = css`
  &.rrainuiIcon {
    height: 1em;
    width: 1em;
    --icon-color: var(--color);
    transform: scale(-1, 1);
  }
`
const ResetButtonText = styled.div`
  white-space: nowrap;
`