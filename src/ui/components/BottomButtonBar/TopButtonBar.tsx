import { Global } from '@emotion/react'
import React, {
  ReactNode,
  useImperativeHandle,
  useRef,
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






export type TopButtonBarCustomProps = Pu<{
  children: ReactNode
  leftChildren: ReactNode
  rightChildren: ReactNode
  backBtn: boolean
  settingsBtn: boolean
  refreshBtn: boolean
}>

export type TopButtonBarProps =
  & React.ComponentProps<'div'>
  & TopButtonBarCustomProps

const TopButtonBar = React.memo((props: TopButtonBarProps) => {
  const {
    ref,
    backBtn, leftChildren,
    children, settingsBtn,
    rightChildren, refreshBtn,
    ...restProps
  } = props
  
  const elemRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => elemRef.current!, [])
  
  
  return (
    <>
      
      <Global
        styles={{
          ':root': {
            '--top-button-bar-height': '70px',
          },
        }}
      />
      
      <TopButtonBarFrame
        {...restProps}
        ref={elemRef}
      >
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
      </TopButtonBarFrame>
    
    </>
  )
})
TopButtonBar.displayName = 'TopButtonBar'
export default TopButtonBar



