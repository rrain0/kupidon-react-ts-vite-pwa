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
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import PosterPreview from 'src/ui/2-pages/BowAndArrows/parts/PosterPreview.tsx'
import DateArticleCategoryRow from 'src/ui/2-pages/DateArticles/parts/DateArticleCategoryRow.tsx'
import DatePlaceCategoriesList from 'src/ui/2-pages/DatePlaces/parts/DatePlaceCategoriesList.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { Hdrs } from 'ui/0-elements/basic-elements/Hdrs'
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'
import Calendar2GradIc = SvgGradIconsPack.Calendar2GradIc





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
    
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSm style={{ gap: 0 }}>
            
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
          
          </Pages.ContentColSm>
        </Pages.AddSafeInsets>
        
        <PageScrollbars/>
      </Pages.PageGrad>
      
      
      <BottomFloatingBar/>
    
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



