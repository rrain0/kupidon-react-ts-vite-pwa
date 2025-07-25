import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import GearIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/GearIc.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import col = EmotionCommon.col
import rowWrap = EmotionCommon.rowWrap



const ButtonsTestPage = React.memo(() => {
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          <div>Common buttons showcase</div>
          
          <BlocksContainer>
            
            {Object.entries(ButtonS6.S).flatMap(([typeName, shapes]) =>
              Object.entries(shapes).flatMap(([shapeName, sizes]) => (
                Object.entries(sizes).map(([sizeName, colors]) => (
                  <Buttons key={typeName + shapeName + sizeName}>
                    <div>Type: {typeName}, Shape: {shapeName}, Size: {sizeName}</div>
                    {Object.entries(colors as object).map(([colorName, style]) => (
                      <ButtonContainer key={colorName}>
                        <div>Color: {colorName}</div>
                        <ButtonBox css={{ width: sizeName.startsWith('lg') ? 350 : 200 }}>
                          <Button css={ButtonS6.t(style)}>Button</Button>
                        </ButtonBox>
                      </ButtonContainer>
                    ))}
                  </Buttons>
                ))
              )),
            )}
            
            {Object.entries(IconButtonS6.S).flatMap(([typeName, shapes]) =>
              Object.entries(shapes).flatMap(([shapeName, sizes]) => (
                Object.entries(sizes).map(([sizeName, colors]) => (
                  <Buttons key={typeName + shapeName + sizeName}>
                    <div>Type: {typeName}, Shape: {shapeName}, Size: {sizeName}</div>
                    {Object.entries(colors as object).map(([colorName, style]) => (
                      <ButtonContainer key={colorName}>
                        <div>Color: {colorName}</div>
                        <ButtonBox css={{ width: 200 }}>
                          <Button css={IconButtonS6.t(style)}><GearIc/></Button>
                        </ButtonBox>
                      </ButtonContainer>
                    ))}
                  </Buttons>
                ))
              )),
            )}
          
          </BlocksContainer>
        
        </PageContentLayout>
      </PageLayout>
      
      
      <BottomFloatingBar settingsButton/>
    
    </>
  )
})
ButtonsTestPage.displayName = 'ButtonsTestPage'
export default ButtonsTestPage



const BlocksContainer = styled.div`
  max-width: 100%;
  ${rowWrap};
  gap: 30px;
`

const Buttons = styled.div`
  max-width: 100%;
  ${col};
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid indianred;
`
const ButtonContainer = styled.div`
  ${col};
  width: 400px;
  max-width: 100%;
  gap: 10px;
`
const ButtonBox = styled.div`
  height: fit-content;
  max-width: 100%;
`
