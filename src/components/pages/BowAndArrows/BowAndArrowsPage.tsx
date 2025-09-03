import React, { useMemo } from 'react'
import { DatePlaceCategoriesData } from 'src/configs/date-place/DatePlaceCategoriesData.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Gap from 'src/components/elems/basic-elements/Gap.tsx'
import Grid from 'src/components/elems/basic-elements/Grid.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { IconButtonS6 } from 'src/components/elems/buttons/IconButton/IconButtonS6.ts'
import HeaderArrow from 'src/components/elems/HeaderArrow/HeaderArrow.tsx'
import { HeaderArrowS } from 'src/components/elems/HeaderArrow/HeaderArrowS'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import Calendar2GradIc from 'src/components/elems/icons/GradSvgIcons/pack/ui/Calendar2GradIc.tsx'
import PosterPreview from 'src/components/pages/BowAndArrows/parts/PosterPreview.tsx'
import DateArticleCategoryRow from 'src/components/pages/DateArticles/parts/DateArticleCategoryRow.tsx'
import DatePlaceCategoriesList from 'src/components/pages/DatePlaces/parts/DatePlaceCategoriesList.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'components/elems/basic-elements/Hdrs'
import { AppWidgetStyle } from 'src/mini-libs/widget-style-6/WidgetStyle'





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



