import { Global } from '@emotion/react'
import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { ButtonBarComponents } from 'src/ui/components/BottomButtonBar/components.tsx'
import { TypeU } from '@util/common/TypeU.ts'
import Pu = TypeU.Pu
import BottomButtonBarFrame = ButtonBarComponents.BottomButtonBarFrame
import ButtonsContainer = ButtonBarComponents.ButtonsContainer
import LeftButtonsContainer = ButtonBarComponents.LeftButtonsContainer
import BackBtn0 = ButtonBarComponents.BackBtn0
import CenterButtonsContainer = ButtonBarComponents.CenterButtonsContainer
import SettingsBtn = ButtonBarComponents.SettingsBtn
import RightButtonsContainer = ButtonBarComponents.RightButtonsContainer
import RefreshBtn = ButtonBarComponents.RefreshPageBtn






export type BottomButtonBarProps =
  & React.JSX.IntrinsicElements['section']
  & Pu<{
    children: React.ReactNode
    leftChildren: React.ReactNode
    rightChildren: React.ReactNode
    backBtn: boolean
    settingsBtn: boolean
    settingsBtnLeft: boolean
    refreshPageBtn: boolean
  }>



const BottomButtonBar = React.memo((props: BottomButtonBarProps) => {
  const {
    ref,
    backBtn, settingsBtnLeft, leftChildren,
    children, settingsBtn,
    rightChildren, refreshPageBtn,
    ...restProps
  } = props
  
  const thisRef = useRef<HTMLTableSectionElement>(null)
  useImperativeHandle(ref, () => thisRef.current!, [])
  
  
  return (
    <>
      
      <Global
        styles={{
          ':root': {
            '--bottom-button-bar-height': '70px',
          },
        }}
      />
      
      <BottomButtonBarFrame
        {...restProps}
        ref={thisRef}
      >
        <ButtonsContainer>
          
          <LeftButtonsContainer>
            {backBtn && <BackBtn0/>}
            {settingsBtnLeft && <SettingsBtn/>}
            {leftChildren}
          </LeftButtonsContainer>
          
          
          <CenterButtonsContainer>
            {children}
            {settingsBtn && <SettingsBtn/>}
          </CenterButtonsContainer>
          
          
          <RightButtonsContainer>
            {rightChildren}
            {refreshPageBtn && <RefreshBtn/>}
          </RightButtonsContainer>
        
        </ButtonsContainer>
      </BottomButtonBarFrame>
    
    </>
  )
})
export default BottomButtonBar



