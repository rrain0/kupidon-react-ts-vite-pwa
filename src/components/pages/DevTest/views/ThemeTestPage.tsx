import { useAppTheme } from '@utils/app/theme/useAppTheme.ts'
import React from 'react'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Gap from 'src/components/elems/basic-elements/Gap.tsx'
import Grid from 'src/components/elems/basic-elements/Grid.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'






const ThemeTestPage = React.memo(() => {
  
  const tm = useAppTheme()
  
  return (
    <>
      
      <PageLayout col css={{ '*': { userSelect: 'text' } }}>
        <PageContentLayout col>
          
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            {/* TODO Translation */}
            <Flex center><Hdrs.Page>{'Theme Showcase'}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <Gap h={30}/>
          
          {(() => {
            const name = 'boxDefault' as const
            const { bg, ct } = tm[name]
            return (
              <Flex col w={300} h={150} rad={16} p={10} g={10}
                bg={bg} color={ct}
              >
                <div>{name}</div>
                <div>Использование: ...</div>
                <div>Бэкграунд: {bg}</div>
                <div>Контент: {ct}</div>
              </Flex>
            )
          })()}
          
          {(() => {
            const name = 'boxDefault3' as const
            const { bg, ct } = tm[name]
            return (
              <Flex col w={300} h={150} rad={16} p={10} g={10}
                bg={bg} color={ct}
              >
                <div>{name}</div>
                <div>Использование: ...</div>
                <div>Бэкграунд: {bg}</div>
                <div>Контент: {ct}</div>
              </Flex>
            )
          })()}
          
          {(() => {
            const name = 'boxNormal2' as const
            const { bg, ct } = tm[name]
            return (
              <Flex col w={300} h={150} rad={16} p={10} g={10}
                bg={bg} color={ct}
              >
                <div>{name}</div>
                <div>Использование: ...</div>
                <div>Бэкграунд: {bg}</div>
                <div>Контент: {ct}</div>
              </Flex>
            )
          })()}
          
          {(() => {
            const name = 'boxAccent4' as const
            const { bg, ct } = tm[name]
            return (
              <Flex col w={300} h={150} rad={16} p={10} g={10}
                bg={bg} color={ct}
              >
                <div>{name}</div>
                <div>Использование: ...</div>
                <div>Бэкграунд: {bg}</div>
                <div>Контент: {ct}</div>
              </Flex>
            )
          })()}
          
          
          
        
        
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar settingsButton/>
    
    
    </>
  )
})
ThemeTestPage.displayName = 'ThemeTestPage'
export default ThemeTestPage

