import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MockDataDateArticles } from 'src/_mock-data/date-articles/MockDataDateArticles.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { allDateTypes } from 'src/ui-data/special/DateTypeData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import PosterPreview from 'src/ui/2-pages/BowAndArrows/parts/PosterPreview.tsx'
import DateArticlePreviewCard from 'src/ui/2-pages/DateArticles/parts/DateArticlePreviewCard.tsx'
import DateTypeCard from 'src/ui/2-pages/DatePlaces/parts/DateTypeCard.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import Calendar2GradIc = SvgGradIconsPack.Calendar2GradIc
import noScrollbars = EmotionCommon.noScrollbars
import row = EmotionCommon.row
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams





const BowAndArrowsPage = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  
  const uiText = useMemo(() => ({
    bowAndArrows: titleText.bowAndArrows,
    poster: 'Афиша',
    insightsAndPlacesForDate: 'Идеи и места для свиданий',
    interestingIt: 'Интересное',
    ourPartners: 'Наши партнёры',
  }), [titleText])
  
  const [searchParams] = useSearchParams()
  
  return (
    <>
    
      <Pages.Page>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <PageHeaderBox>
              <div />
              <Hdrs.Page>{uiText.bowAndArrows}</Hdrs.Page>
              <Button css={IconButtonS6.t(calendarButtonS)}>
                <Calendar2GradIc />
              </Button>
            </PageHeaderBox>
            
            <div style={{ height: 27 }} />
            
            <HeaderArrow css={HeaderArrowS.page}>
              {uiText.poster}
            </HeaderArrow>
            
            <div style={{ height: 16 }} />
            
            <PosterPreview />
            
            <div style={{ height: 16 }} />
            
            <Link
              to={RootRoute.datePlaces[fullAnySearchParams](searchParams)}
            >
              <HeaderArrow css={HeaderArrowS.page}>
                {uiText.insightsAndPlacesForDate}
              </HeaderArrow>
            </Link>
            
            <div style={{ height: 16 }} />
            
            <DatePlacesOverflow>
              <DatePlacesList>
                {allDateTypes.map(dt => <DateTypeCard key={dt} type={dt} />)}
              </DatePlacesList>
            </DatePlacesOverflow>
            
            <div style={{ height: 16 }} />
            
            <HeaderArrow css={HeaderArrowS.page}>
              {uiText.interestingIt}
            </HeaderArrow>
            
            <div style={{ height: 16 }} />
            
            <DateArticlesOverflow>
              <DateArticlesList>
                {MockDataDateArticles.articles.map(a => (
                  <DateArticlePreviewCard
                    key={a.description}
                    picture={a.previewImg}
                    date={a.date}
                    description={a.description}
                  />
                ))}
              </DateArticlesList>
            </DateArticlesOverflow>
            
            <div style={{ height: 16 }} />
            
            <HeaderArrow css={HeaderArrowS.page}>
              {uiText.ourPartners}
            </HeaderArrow>
            
            <div style={{ height: 16 }} />
          
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.Page>
      
      
      <BottomButtonBar />
    
    </>
  )
})
export default BowAndArrowsPage



const PageHeaderBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`
const calendarButtonS: AppWidgetStyle = t => [
  IconButtonS6.S.filled.round.lg.accent4, {
    button: { justifySelf: 'end' },
    gradIconSz: 24,
  },
]



const DatePlacesOverflow = styled.div`
  // Вертикальные маргин и паддинг нужны чтобы отображать тени у карточек - но тач зона расширена
  // TODO paddings
  margin: -16px -16px;
  padding: 16px 16px;
  width: calc(100% + 16px * 2);
  height: fit-content;
  overflow: auto;
  ${noScrollbars};
  ${row};
`
const DatePlacesList = styled.div`
  width: fit-content;
  height: fit-content;
  ${row};
  gap: 16px;
`



const DateArticlesOverflow = styled.div`
  // TODO paddings
  margin: 0 -16px;
  padding: 0 16px;
  width: calc(100% + 16px * 2);
  height: fit-content;
  overflow: auto;
  ${noScrollbars};
  ${row};
`
const DateArticlesList = styled.div`
  width: fit-content;
  height: fit-content;
  ${row};
  gap: 10px;
`
