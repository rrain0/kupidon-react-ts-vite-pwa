import { Global } from '@emotion/react'
import { CssU } from '@util/css/CssU.ts'
import React from 'react'
import { ButtonBarComponents } from 'src/ui/components/BottomButtonBar/parts/ButtonBarParts.tsx'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import BottomButtonBarFrame = ButtonBarComponents.BottomButtonBarFrame
import ButtonsContainer = ButtonBarComponents.ButtonsContainer
import LeftButtonsContainer = ButtonBarComponents.LeftButtonsContainer
import CenterButtonsContainer = ButtonBarComponents.CenterButtonsContainer
import SettingsBtn = ButtonBarComponents.SettingsBtn
import RightButtonsContainer = ButtonBarComponents.RightButtonsContainer
import RefreshBtn = ButtonBarComponents.RefreshPageBtn
import isdef = TypeU.isdef
import isundef = TypeU.isundef
import toPx = CssU.toPx






export type BottomButtonBarProps = React.ComponentProps<'section'> & Pu<{
  h: number | string
  
  children: React.ReactNode
  
  leftChildren: React.ReactNode
  centerChildren: React.ReactNode
  rightChildren: React.ReactNode
  
  backBtn: boolean
  settingsBtn: boolean
  settingsBtnLeft: boolean
  refreshPageBtn: boolean
}>



const BottomButtonBar = React.memo((props: BottomButtonBarProps) => {
  const {
    h = 70,
    backBtn, settingsBtnLeft, leftChildren, settingsBtn,
    children,
    rightChildren, centerChildren, refreshPageBtn,
    ...restProps
  } = props
  
  
  return (
    <>
      
      <Global
        styles={{
          ':root': { '--bottom-button-bar-height': toPx(h) },
        }}
      />
      
      <BottomButtonBarFrame
        data-display-name='BottomButtonButtonBar'
        {...restProps}
      >
        
        {isdef(children) && children}
        
        {isundef(children) && (
          <ButtonsContainer>
          
            <LeftButtonsContainer>
              {settingsBtnLeft && <SettingsBtn/>}
              {leftChildren}
            </LeftButtonsContainer>
            
            
            <CenterButtonsContainer>
              {centerChildren}
              {settingsBtn && <SettingsBtn/>}
            </CenterButtonsContainer>
            
            
            <RightButtonsContainer>
              {rightChildren}
              {refreshPageBtn && <RefreshBtn/>}
            </RightButtonsContainer>
          
          </ButtonsContainer>
        )}
        
      </BottomButtonBarFrame>
    
    </>
  )
})
BottomButtonBar.displayName = 'BottomButtonButtonBar'
export default BottomButtonBar



