import { Global } from '@emotion/react'
import React, {
  ReactNode,
} from 'react'
import { ButtonBarComponents } from 'src/ui/components/BottomButtonBar/parts/ButtonBarParts.tsx'
import { TypeU } from '@util/common/TypeU.ts'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import Pu = TypeU.Pu
import ButtonsContainer = ButtonBarComponents.ButtonsContainer
import LeftButtonsContainer = ButtonBarComponents.LeftButtonsContainer
import CenterButtonsContainer = ButtonBarComponents.CenterButtonsContainer
import SettingsBtn = ButtonBarComponents.SettingsBtn
import RightButtonsContainer = ButtonBarComponents.RightButtonsContainer
import RefreshBtn = ButtonBarComponents.RefreshPageBtn
import TopButtonBarFrame = ButtonBarComponents.TopButtonBarFrame
import isdef = TypeU.isdef
import isundef = TypeU.isundef






export type TopButtonBarProps = React.ComponentProps<'section'> & Pu<{
  children: ReactNode
  leftChildren: ReactNode
  rightChildren: ReactNode
  backBtn: boolean
  settingsBtn: boolean
  refreshBtn: boolean
}>



const TopButtonBar = React.memo((props: TopButtonBarProps) => {
  const {
    backBtn, settingsBtn,
    children,
    leftChildren, rightChildren, refreshBtn,
    ...restProps
  } = props
  
  
  return (
    <>
      
      <Global
        styles={{
          ':root': { '--top-button-bar-height': '70px' },
        }}
      />
      
      <TopButtonBarFrame
        data-display-name='TopButtonBar'
        {...restProps}
      >
        
        {isdef(children) && children}
        
        {isundef(children) && (
          <ButtonsContainer>
          
            <LeftButtonsContainer>
              {backBtn && <BackBtn/>}
              {leftChildren}
            </LeftButtonsContainer>
            
            
            <CenterButtonsContainer>
              
              {children}
              
              {settingsBtn && <SettingsBtn/>}
            
            </CenterButtonsContainer>
            
            
            <RightButtonsContainer>
              {rightChildren}
              {refreshBtn && <RefreshBtn/>}
            </RightButtonsContainer>
          
          </ButtonsContainer>
        )}
        
      </TopButtonBarFrame>
    
    </>
  )
})
TopButtonBar.displayName = 'TopButtonBar'
export default TopButtonBar



