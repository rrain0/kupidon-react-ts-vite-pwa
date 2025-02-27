import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MockDateArticles } from 'src/_mock-data/date-articles/MockDateArticles.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { DateCategoryData } from 'src/ui-data/special/DateCategoryData.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import PosterPreview from 'src/ui/2-pages/BowAndArrows/parts/PosterPreview.tsx'
import DateArticlePreviewCard from 'src/ui/2-pages/DateArticles/parts/DateArticlePreviewCard.tsx'
import DateCategoryCard from 'src/ui/2-pages/DatePlaces/parts/DateCategoryCard.tsx'
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
    kupidonNotes: 'Заметки Купидона',
    ourPartners: 'Наши партнёры',
  }), [titleText])
  
  const [search] = useSearchParams()
  
  return (
    <>
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentSmCol style={{ gap: 0 }}>
            
            <Pages.PageHeaderWithLeftRight>
              <div css={{ width: 50, height: 50 }} />
              <Hdrs.Page>{uiText.bowAndArrows}</Hdrs.Page>
              <Button css={IconButtonS6.t(calendarButtonS)}>
                <Calendar2GradIc />
              </Button>
            </Pages.PageHeaderWithLeftRight>
            
            <div style={{ height: 27 }} />
            
            <HeaderArrow css={HeaderArrowS.page}>
              {uiText.poster}
            </HeaderArrow>
            
            <div style={{ height: 16 }} />
            
            <PosterPreview />
            
            <div style={{ height: 16 }} />
            
            <Link
              to={RootRoute.datePlaces[fullAnySearchParams](search)}
            >
              <HeaderArrow css={HeaderArrowS.page}>
                {uiText.insightsAndPlacesForDate}
              </HeaderArrow>
            </Link>
            
            <div style={{ height: 16 }} />
            
            <DatePlacesOverflow>
              <DatePlacesList>
                {DateCategoryData.all.next.map(dc => (
                  <DateCategoryCard
                    key={dc}
                    category={dc}
                    isType={!Object.hasOwn(DateCategoryData, dc)}
                  />
                ))}
              </DatePlacesList>
            </DatePlacesOverflow>
            
            <div style={{ height: 16 }} />
            
            <HeaderArrow css={HeaderArrowS.page}>
              {uiText.kupidonNotes}
            </HeaderArrow>
            
            <div style={{ height: 16 }} />
            
            <DateArticlesOverflow>
              <DateArticlesList>
                {MockDateArticles.articles.map(a => (
                  <DateArticlePreviewCard
                    key={a.description}
                    picture={a.previewImg}
                    description={a.description}
                  />
                ))}
              </DateArticlesList>
            </DateArticlesOverflow>
            
            <div style={{ height: 16 }} />
            
            {/* <HeaderArrow css={HeaderArrowS.page}>
              {uiText.ourPartners}
            </HeaderArrow>
            
            <div style={{ height: 16 }} /> */}
          
          </Pages.ContentSmCol>
        </Pages.AddSafeInsets>
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      
      <BottomButtonBar />
    
    </>
  )
})
export default BowAndArrowsPage



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
  gap: 16px;
`
