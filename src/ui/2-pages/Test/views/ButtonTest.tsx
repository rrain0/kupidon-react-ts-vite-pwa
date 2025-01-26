import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import col = EmotionCommon.col
import rowWrap = EmotionCommon.rowWrap



const ButtonTest = React.memo(() => {
  
  return (
    <>
      
      <Pages.SimplePage>
        <Pages.ContentFill>
          
          
          <div>Buttons showcase</div>
          
          <BlocksContainer>
            {Object.entries(ButtonS6.S).flatMap(([typeName, shapes]) =>
              Object.entries(shapes).flatMap(([shapeName, sizes]) => (
                Object.entries(sizes).map(([sizeName, colors]) => (
                  <Buttons key={typeName + shapeName + sizeName}>
                    {Object.entries(colors as object).map(([colorName, style]) => (
                      <ButtonDescription key={colorName}>
                        <div>Type: {typeName}, Shape: {shapeName}</div>
                        <div>Size: {sizeName}, Color: {colorName}</div>
                        <ButtonBox css={{ width: sizeName === 'Big' ? 350 : 200 }}>
                          <Button css={style}>Button</Button>
                        </ButtonBox>
                      </ButtonDescription>
                    ))}
                  </Buttons>
                ))
              ))
            )}
          </BlocksContainer>
        
        </Pages.ContentFill>
      </Pages.SimplePage>
      
      
      <BottomButtonBar settingsBtn />
    
    </>
  )
})
export default ButtonTest

const BlocksContainer = styled.div`
  ${rowWrap};
  gap: 30px;
`

const Buttons = styled.div`
  ${col};
  gap: 10px;
`
const ButtonDescription = styled.div`
  ${col};
  width: 400px;
  gap: 10px;
`
const ButtonBox = styled.div`
  height: fit-content;
`

