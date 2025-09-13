import { Global } from '@emotion/react'
import { cssToPx } from '@utils/css/cssUtils.ts'
import React from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import AcceptAndCancelButtons
  from 'src/components/components/screen-bars/parts/AcceptAndCancelButtons.tsx'
import QuickSettingsButton
  from 'src/components/components/screen-bars/parts/QuickSettingsButton.tsx'
import RefreshButton from 'src/components/components/screen-bars/parts/RefreshButton.tsx'
import { Pu } from '@utils/base/typeUtils.ts'
import { isdef } from '@utils/base/typeUtils.ts'
import { isundef } from '@utils/base/typeUtils.ts'
import { Cb } from '@utils/base/typeUtils.ts'
import modalFloor100 = StyleVals.modalFloor100





export type BottomFloatingBarProps = Pu<{
  h: number | string
  noBarPadding: boolean
  
  children: React.ReactNode
  
  leftChildren: React.ReactNode
  centerChildren: React.ReactNode
  rightChildren: React.ReactNode
  
  settingsButton: boolean
  settingsButtonLeft: boolean
  refreshPageButton: boolean
  
  onAccept: Cb
  onCancel: Cb
}>



const BottomFloatingBar = React.memo((props: BottomFloatingBarProps) => {
  const {
    children,
    rightChildren, centerChildren, leftChildren, 
    refreshPageButton, settingsButtonLeft, settingsButton,
    onAccept, onCancel,
    
    h = (onAccept || onCancel) ? 130 : 70,
    noBarPadding,
  } = props
  
  
  return (
    <>
      
      <Global
        styles={{
          ':root': { '--bottom-floating-bar-h': cssToPx(h) },
        }}
      />
      
      
      <Grid alignEnd fixedBottom z={modalFloor100} noPointer
        pb='var(--bottom-floating-bar-offest-bottom)'
        data-display-name='BottomFloatingBar'
      >
        
        {isdef(children) && (
          <Grid relative justifiedStretch alignEnd noPointer
            h='var(--bottom-floating-bar-h)'
            {...{
              ...!noBarPadding && { p: StyleVals.floatingBarP },
            }}
          >
            {children}
          </Grid>
        )}
        
        {isundef(children) && (
          <Grid justifiedStretch alignEnd noPointer
            h='var(--bottom-floating-bar-h)'
            cols='1fr auto 1fr'
            {...{
              ...!noBarPadding && { p: StyleVals.floatingBarP },
              g: 10,
            }}
          >
            
            <Flex row endStart g={10}>
              <AcceptAndCancelButtons onAccept={onAccept} onCancel={onCancel}/>
              
              {settingsButtonLeft && <QuickSettingsButton/>}
              
              {leftChildren}
            </Flex>
            
            
            <Flex row endCenter g={10}>
              {centerChildren}
              {settingsButton && <QuickSettingsButton/>}
            </Flex>
            
            
            <Flex row endEnd g={10}>
              {rightChildren}
              {refreshPageButton && <RefreshButton/>}
            </Flex>
          
          </Grid>
        )}
        
      </Grid>
      
    </>
  )
})
BottomFloatingBar.displayName = 'BottomFloatingBar'
export default BottomFloatingBar



