import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, {
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react'
import { ButtonBarComponents } from 'src/ui/components/BottomButtonBar/components.tsx'
import { ReactU } from 'src/util/common/ReactU.ts'
import { TypeU } from '@util/common/TypeU.ts'
import PartialUndef = TypeU.PartialUndef
import ButtonsContainer = ButtonBarComponents.ButtonsContainer
import LeftButtonsContainer = ButtonBarComponents.LeftButtonsContainer
import BackBtn = ButtonBarComponents.BackBtn
import CenterButtonsContainer = ButtonBarComponents.CenterButtonsContainer
import SettingsBtn = ButtonBarComponents.SettingsBtn
import RightButtonsContainer = ButtonBarComponents.RightButtonsContainer
import RefreshBtn = ButtonBarComponents.RefreshPageBtn
import TopButtonBarFrame = ButtonBarComponents.TopButtonBarFrame






export type TopButtonBarCustomProps = PartialUndef<{
  children: ReactNode
  leftChildren: ReactNode
  rightChildren: ReactNode
  backBtn: boolean
  settingsBtn: boolean
  refreshBtn: boolean
}>
export type ForwardRefProps = React.JSX.IntrinsicElements['section']
type RefElement = HTMLDivElement

export type TopButtonBarProps = TopButtonBarCustomProps & ForwardRefProps
const TopButtonBar =
React.memo(
React.forwardRef<RefElement, TopButtonBarProps>(
(props, forwardedRef)=>{
  
  const elemRef = useRef<RefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  return <>
    
    <Global
      styles={css`
        :root{
          --top-button-bar-height: 70px;
        }
      `}
    />
    
    <TopButtonBarFrame
      {...props}
      ref={elemRef}
    >
      <ButtonsContainer>
        
        <LeftButtonsContainer>
          {props.backBtn && <BackBtn/>}
          {props.leftChildren}
        </LeftButtonsContainer>
        
        
        <CenterButtonsContainer>
          
          {props.children}
          
          {props.settingsBtn && <SettingsBtn/>}
          
        </CenterButtonsContainer>
        
        
        <RightButtonsContainer>
          {props.rightChildren}
          {props.refreshBtn && <RefreshBtn/>}
        </RightButtonsContainer>
        
      </ButtonsContainer>
    </TopButtonBarFrame>
    
  </>
}))
export default TopButtonBar



