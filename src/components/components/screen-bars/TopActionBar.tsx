import { Global } from '@emotion/react'
import { cssToPx } from '@utils/css/cssUtils.ts'
import React, { ReactNode } from 'react'
import { StyleVals } from 'src/styles/StyleVals.ts'
import Grid from '@libs/short-propsed/components/Grid.tsx'
import { Pu } from '@utils/base/tsUtils.ts'
import modalFloor100 = StyleVals.modalFloor100




export type TopActionBarProps = Pu<{
  h: number | string
  children: ReactNode
}>



const TopActionBar = React.memo((props: TopActionBarProps) => {
  const {
    children,
    h = 70,
  } = props
  
  
  return (
    <>
      
      <Global
        styles={{
          ':root': { '--top-action-bar-h': cssToPx(h) },
        }}
      />
      
      <Grid alignStart fixedTop z={modalFloor100} noPointer
        pt='var(--top-action-bar-offest-top)'
        data-display-name='TopActionBar'
      >
        
        <Grid justifiedStretch alignStart noPointer
          h='var(--top-action-bar-h)'
        >
          {children}
        </Grid>
        
      </Grid>
    
    </>
  )
})
TopActionBar.displayName = 'TopActionBar'
export default TopActionBar



