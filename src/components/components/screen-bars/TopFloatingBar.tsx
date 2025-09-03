import { Global } from '@emotion/react'
import { CssU } from '@utils/css/CssU.ts'
import React, { ReactNode } from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Flex from '@libs/short-propsed/components/Flex.tsx'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import { TypeU } from '@utils/base/TypeU.ts'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import Pu = TypeU.Pu
import isdef = TypeU.isdef
import isundef = TypeU.isundef
import toPx = CssU.toPx
import modalFloor100 = StyleVals.modalFloor100



export type TopFloatingBarProps = Pu<{
  h: number | string
  noBarPadding: boolean
  
  children: ReactNode
  
  leftChildren: ReactNode
  centerChildren: React.ReactNode
  rightChildren: ReactNode
  
  backButton: boolean
}>



const TopFloatingBar = React.memo((props: TopFloatingBarProps) => {
  const {
    children,
    leftChildren, centerChildren, rightChildren,
    backButton,
    
    h = 70,
    noBarPadding,
  } = props
  
  
  return (
    <>
      
      <Global
        styles={{
          ':root': { '--top-floating-bar-h': toPx(h) },
        }}
      />
      
      <Grid alignStart fixedTop z={modalFloor100} noPointer
        pt='var(--top-floating-bar-offest-top)'
        data-display-name='TopFloatingBar'
      >
        
        {isdef(children) && (
          <Grid justifiedStretch alignStart noPointer
            h='var(--top-floating-bar-h)'
            {...{
              ...!noBarPadding && { p: StyleVals.floatingBarP },
            }}
          >
            {children}
          </Grid>
        )}
        
        {isundef(children) && (
          <Grid justifiedStretch alignStart noPointer
            h='var(--top-floating-bar-h)'
            cols='1fr auto 1fr'
            {...{
              ...!noBarPadding && { p: StyleVals.floatingBarP },
              g: 10,
            }}
          >
          
            <Flex row startStart g={10}>
              {backButton && <BackButton/>}
              {leftChildren}
            </Flex>
            
            
            <Flex row startCenter g={10}>
              {centerChildren}
            </Flex>
            
            
            <Flex row startEnd g={10}>
              {rightChildren}
            </Flex>
            
          </Grid>
        )}
        
      </Grid>
    
    </>
  )
})
TopFloatingBar.displayName = 'TopFloatingBar'
export default TopFloatingBar



