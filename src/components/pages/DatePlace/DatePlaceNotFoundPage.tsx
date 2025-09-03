import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Gap from 'src/components/elems/basic-elements/Gap.tsx'
import Grid from 'src/components/elems/basic-elements/Grid.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import RootRoute = AppRoutes.RootRoute
import rowC = EmotionCommon.rowC



const uiVals = {
  placeNotFound: {
    'ru-RU': 'Место не найдено',
  },
  pickAnotherPlace: {
    'ru-RU': 'Выбрать другое место',
  },
} satisfies UiValues



export const DatePlaceNotFoundPage = React.memo(() => {
  
  const uiValues = useMemo(() => ({
    placeNotFound: uiVals.placeNotFound,
    pickAnotherPlace: uiVals.pickAnotherPlace,
  }), [])
  const uiText = useUiValues(uiValues)
  
  return (
    
    <>
    
      <PageLayout col data-display-name='DateArticleNotFoundPage'>
        <PageContentLayout colSm grow>
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            <Flex center><Hdrs.Page>{uiText.placeNotFound}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <div style={{ height: 28 }}/>
          
          <ButtonBox>
            <AppLink
              toFull={RootRoute.datePlaces}
              allowedNamedParams={{
                category: null,
                type: null,
              }}
            >
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}>
                {uiText.pickAnotherPlace}
              </Button>
            </AppLink>
          </ButtonBox>
      
        </PageContentLayout>
      </PageLayout>
      
      
      {/* <BottomFloatingBar/> */}
    
    </>
  )
})
DatePlaceNotFoundPage.displayName = 'DatePlaceNotFoundPage'
export default DatePlaceNotFoundPage


const ButtonBox = styled.div`
  flex: 1;
  ${rowC};
`
