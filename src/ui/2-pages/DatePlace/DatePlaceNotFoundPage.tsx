import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
  placeNotFound: {
    'ru-RU': 'Место не найдено',
  },
  pickAnotherPlace: {
    'ru-RU': 'Выбрать другое место',
  },
} satisfies UiValues



export const DatePlaceNotFoundPage = React.memo(() => {
  
  const [search] = useSearchParams()
  
  const uiValues = useMemo(() => ({
    placeNotFound: uiVals.placeNotFound,
    pickAnotherPlace: uiVals.pickAnotherPlace,
  }), [])
  const uiText = useUiValues(uiValues)
  
  return (
    
    <>
      
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm style={{ gap: 0, minHeight: '100%' }}>
            
            <Pages.PageHeaderWithLeftRight>
              <BackBtn />
              <Hdrs.Page>{uiText.placeNotFound}</Hdrs.Page>
              <div />
            </Pages.PageHeaderWithLeftRight>
            
            <div style={{ height: 28 }} />
            
            <ButtonBox>
              <Link
                to={RootRoute.datePlaces[fullParams]({
                  anySearchParams: search,
                  allowedNameParams: {
                    category: null,
                    type: null,
                  },
                })}
              >
                <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}>
                  {uiText.pickAnotherPlace}
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
DatePlaceNotFoundPage.displayName = 'DatePlaceNotFoundPage'
export default DatePlaceNotFoundPage


const ButtonBox = styled.div`
  flex: 1;
  ${rowC};
`
