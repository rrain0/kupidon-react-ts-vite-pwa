import React, { useMemo } from 'react'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { UiValues } from '@libs/ui-text/UiText.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
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



const uiVals = {
  articleNotFound: {
    'ru-RU': 'Статья не найдена',
  },
  pickAnotherArticle: {
    'ru-RU': 'Выбрать другую статью',
  },
} satisfies UiValues



export const DateArticleNotFoundPage = React.memo(() => {
  
  const uiValues = useMemo(() => ({
    articleNotFound: uiVals.articleNotFound,
    pickAnotherArticle: uiVals.pickAnotherArticle,
  }), [])
  const uiText = useUiValues(uiValues)
  
  return (
    
    <>
      
      <PageLayout col data-display-name='DateArticleNotFoundPage'>
        <PageContentLayout colSm grow>
          
          <Grid cols='38px 1fr 38px' stretch>
            <Flex centerStart m={-13}><BackButton/></Flex>
            <Flex center><Hdrs.Page>{uiText.articleNotFound}</Hdrs.Page></Flex>
            <Gap w={38}/>
          </Grid>
          
          <Gap h={28}/>
          
          <Flex row grow center>
            <AppLink
              toFull={RootRoute.dateArticles}
              allowedNamedParams={{
                category: null,
                type: null,
              }}
            >
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}>
                {uiText.pickAnotherArticle}
              </Button>
            </AppLink>
          </Flex>
        
        </PageContentLayout>
      </PageLayout>
      
      
      {/* <BottomFloatingBar/> */}
    
    </>
  )
})
DateArticleNotFoundPage.displayName = 'DateArticleNotFoundPage'
export default DateArticleNotFoundPage


