import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { UiValues } from 'src/mini-libs/ui-text/UiText.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import BackBtn from 'src/ui/components/BottomButtonBar/parts/BackBtn.tsx'
import { Pages } from 'ui/components/Pages/Pages'
import RootRoute = AppRoutes.RootRoute
import fullParams = RouteBuilder.fullParams
import rowC = EmotionCommon.rowC



const uiVals = {
  articleNotFound: {
    'ru-RU': 'Статья не найдено',
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
      
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm style={{ gap: 0, minHeight: '100%' }}>
            
            <Pages.PageHeaderWithLeftRight>
              <BackBtn />
              <Hdrs.Page>{uiText.articleNotFound}</Hdrs.Page>
              <div />
            </Pages.PageHeaderWithLeftRight>
            
            <div style={{ height: 28 }} />
            
            <ButtonBox>
              <Link
                to={RootRoute.dateArticles[fullParams]({
                  anySearchParams: search,
                  allowedNameParams: {
                    category: null,
                    type: null,
                  },
                })}
              >
                <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}>
                  {uiText.pickAnotherArticle}
                </Button>
              </Link>
            </ButtonBox>
          
          </Pages.ContentColSm>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      
      <BottomButtonBar />
    
    </>
  )
})
DateArticleNotFoundPage.displayName = 'DateArticleNotFoundPage'
export default DateArticleNotFoundPage


const ButtonBox = styled.div`
  flex: 1;
  ${rowC};
`
