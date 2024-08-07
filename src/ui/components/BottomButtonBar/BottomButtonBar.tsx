import { css, Global } from '@emotion/react'
import React, {
  useImperativeHandle,
  useRef,
} from 'react'
import { ButtonBarComponents } from 'src/ui/components/BottomButtonBar/components.tsx'
import { TypeU } from '@util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import BottomButtonBarFrame = ButtonBarComponents.BottomButtonBarFrame
import ButtonsContainer = ButtonBarComponents.ButtonsContainer
import LeftButtonsContainer = ButtonBarComponents.LeftButtonsContainer
import BackBtn = ButtonBarComponents.BackBtn
import CenterButtonsContainer = ButtonBarComponents.CenterButtonsContainer
import SettingsBtn = ButtonBarComponents.SettingsBtn
import RightButtonsContainer = ButtonBarComponents.RightButtonsContainer
import RefreshBtn = ButtonBarComponents.RefreshPageBtn






export type BottomButtonBarProps = React.JSX.IntrinsicElements['section']
  & PartialUndef<{
    children: React.ReactNode
    leftChildren: React.ReactNode
    rightChildren: React.ReactNode
    backBtn: boolean
    settingsBtn: boolean
    settingsBtnLeft: boolean
    refreshPageBtn: boolean
  }>



const BottomButtonBar =
React.memo(
React.forwardRef<HTMLTableSectionElement, BottomButtonBarProps>(
(props, forwardedRef) => {
  
  const thisRef = useRef<HTMLTableSectionElement>(null)
  useImperativeHandle(forwardedRef, ()=>thisRef.current!,[])
  
  
  return <>
    
    <Global
      styles={css`
        :root{
          --bottom-button-bar-height: 70px;
        }
      `}
    />
    
    <BottomButtonBarFrame
      {...props}
      ref={thisRef}
    >
      <ButtonsContainer>
        
        <LeftButtonsContainer>
          {props.backBtn && <BackBtn/>}
          {props.settingsBtnLeft && <SettingsBtn/>}
          {props.leftChildren}
        </LeftButtonsContainer>
        
        
        <CenterButtonsContainer>
          {props.children}
          {props.settingsBtn && <SettingsBtn/>}
        </CenterButtonsContainer>
        
        
        <RightButtonsContainer>
          {props.rightChildren}
          {props.refreshPageBtn && <RefreshBtn/>}
        </RightButtonsContainer>
        
      </ButtonsContainer>
    </BottomButtonBarFrame>
    
  </>
}))
export default BottomButtonBar



