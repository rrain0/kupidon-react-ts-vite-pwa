import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams



const uiVals = {
  articleNotFound: {
    'ru-RU': 'Статья не найдена',
  },
  pickAnotherArticle: {
    'ru-RU': 'Выбрать другую статью',
  },
} satisfies UiValues



export const DateArticleNotFoundPage = React.memo(() => {
  
  const [search] = useSearchParams()
  
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
            <Link
              to={RootRoute.dateArticles[fullParams]({
                anySearchParams: search,
                allowedNamedParams: {
                  category: null,
                  type: null,
                },
              })}
            >
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}>
                {uiText.pickAnotherArticle}
              </Button>
            </Link>
          </Flex>
        
        </PageContentLayout>
      </PageLayout>
      
      
      {/* <BottomFloatingBar/> */}
    
    </>
  )
})
DateArticleNotFoundPage.displayName = 'DateArticleNotFoundPage'
export default DateArticleNotFoundPage


