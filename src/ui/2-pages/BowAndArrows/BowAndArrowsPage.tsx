import React, { useMemo } from 'react'
import { DatePlaceCategoriesData } from 'src/ui-data/special/date-place/DatePlaceCategoriesData.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/ui/0-elements/buttons/IconButton/IconButtonS6.ts'
import HeaderArrow from 'src/ui/0-elements/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/ui/0-elements/HeaderArrow/HeaderArrowS'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import PosterPreview from 'src/ui/2-pages/BowAndArrows/parts/PosterPreview.tsx'
import DateArticleCategoryRow from 'src/ui/2-pages/DateArticles/parts/DateArticleCategoryRow.tsx'
import DatePlaceCategoriesList from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCategoriesList.tsx'
import PageContentLayout from 'src/ui/components/Pages/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import Calendar2GradIc = GradSvgIconsPack.Calendar2GradIc





const BowAndArrowsPage = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  
  const uiText = useMemo(() => ({
    bowAndArrows: titleText.bowAndArrows,
    poster: 'Афиша',
    insightsAndPlacesForDate: 'Идеи и места',
    kupidonNotes: 'Заметки Купидона',
    ourPartners: 'Наши партнёры',
  }), [titleText])
  
  return (
    <>
    
      <PageLayout col data-display-name='BowAndArrowsPage'>
        <PageContentLayout colSm>
            
          <Grid cols='54px 1fr 54px' stretch>
            <Gap w={50}/>
            <Flex center><Hdrs.Page>{uiText.bowAndArrows}</Hdrs.Page></Flex>
            <Flex centerEnd>
              <Button css={IconButtonS6.t(calendarButtonS)}>
                <Calendar2GradIc/>
              </Button>
            </Flex>
          </Grid>
          
          <Gap h={27}/>
          
          <HeaderArrow css={HeaderArrowS.page}>
            {uiText.poster}
          </HeaderArrow>
          
          <Gap h={16}/>
          
          <PosterPreview/>
          
          <Gap h={16}/>
          
          <DatePlaceCategoriesList list={DatePlaceCategoriesData.allRowOfPreviews}/>
          
          <Gap h={16}/>
          
          <DateArticleCategoryRow category='allRow'/>
          
          <Gap h={16}/>
          
          {/*
          <HeaderArrow css={HeaderArrowS.page}>
            {uiText.ourPartners}
          </HeaderArrow>
          
          <Gap h={16}/>
          */}
        
        </PageContentLayout>
      </PageLayout>
      
      
      {/* <BottomFloatingBar/> */}
    
    </>
  )
})
BowAndArrowsPage.displayName = 'BowAndArrowsPage'
export default BowAndArrowsPage




const calendarButtonS: AppWidgetStyle = t => [
  IconButtonS6.S.filled.round.lg.accent4, {
    button: { justifySelf: 'end' },
    gradIconSz: 24,
  },
]



