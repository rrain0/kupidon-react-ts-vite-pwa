import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6, normal } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
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
            
            <Buttons>
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: big, Color: main</div>
                <ButtonBox css={{ width: 350 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Big.main}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: big, Color: accent</div>
                <ButtonBox css={{ width: 350 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Big.accent}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: big, Color: normal</div>
                <ButtonBox css={{ width: 350 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Big.normal}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: big, Color: danger</div>
                <ButtonBox css={{ width: 350 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Big.danger}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: big, Color: accent2</div>
                <ButtonBox css={{ width: 350 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Big.accent2}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
            </Buttons>
            
            
            <Buttons>
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: normal, Color: main</div>
                <ButtonBox css={{ width: 250 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Normal.main}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: normal, Color: accent</div>
                <ButtonBox css={{ width: 250 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Normal.accent}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: normal, Color: normal</div>
                <ButtonBox css={{ width: 250 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Normal.normal}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: normal, Color: danger</div>
                <ButtonBox css={{ width: 250 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Normal.danger}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: filled, Shape: rect, Size: normal, Color: accent2</div>
                <ButtonBox css={{ width: 250 }}>
                  <Button css={ButtonS6.S.Filled.Rect.Normal.accent2}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
            </Buttons>
            
            
            <Buttons>
              <ButtonDescription>
                <div>Type: text, Shape: rect, Size: big, Color: normal</div>
                <ButtonBox css={{ width: 250 }}>
                  <Button css={ButtonS6.S.Text.Rect.Big.normal}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
              
              <ButtonDescription>
                <div>Type: text, Shape: rect, Size: normal, Color: normal</div>
                <ButtonBox css={{ width: 250 }}>
                  <Button css={ButtonS6.S.Text.Rect.Normal.normal}>Button</Button>
                </ButtonBox>
              </ButtonDescription>
            </Buttons>
          
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
  height: 90px;
  gap: 10px;
`
const ButtonBox = styled.div`
  height: fit-content;
`

