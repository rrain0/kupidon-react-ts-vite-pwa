import { css } from '@emotion/react'
import React from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Card from 'src/ui/0-elements/Card/Card.tsx'
import PartnerAgeOption from 'src/ui/2-pages/Profile/options-filter/PartnerAgeOption.tsx'
import PartnerHeightOption from 'src/ui/2-pages/Profile/options-filter/PartnerHeightOption.tsx'
import ProfileImLookingForOption
  from 'src/ui/2-pages/Profile/options-filter/ProfileImLookingForOption.tsx'
import ProfileFavoriteBookGenresOption
  from 'src/ui/2-pages/Profile/options-old/ProfileFavoriteBookGenresOption.tsx'
import ProfileFavoriteMovieGenresOption
  from 'src/ui/2-pages/Profile/options-old/ProfileFavoriteMovieGenresOption.tsx'
import ProfileSportFrequencyOption
  from 'src/ui/2-pages/Profile/options-old/ProfileSportFrequencyOption.tsx'
import PartnerAlcoholOption from 'src/ui/2-pages/Profile/options-old/PartnerAlcoholOption.tsx'
import PartnerPetsOption from 'src/ui/2-pages/Profile/options-old/PartnerPetsOption.tsx'
import PartnerSmokeOption from 'src/ui/2-pages/Profile/options-old/PartnerSmokeOption.tsx'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import DateDesiredPlaceOrEventOption from 'src/ui/2-pages/Profile/options-old/DateDesiredPlaceOrEventOption.tsx'
import DateMostInterestingVisitedPlaceOption
  from 'src/ui/2-pages/Profile/options-old/DateMostInterestingVisitedPlaceOption.tsx'
import DatePeriodBeforeDateOption from 'src/ui/2-pages/Profile/options-old/DatePeriodBeforeDateOption.tsx'
import DatePurposeOption from 'src/ui/2-pages/Profile/options-old/DatePurposeOption.tsx'
import col = EmotionCommon.col



const OldProfileOptionsTestPage = React.memo(() => {
  
  return (
    <>
      
      <Pages.Page>
        <Pages.Content>
          
          
          
          <div css={css`width: 600px; ${col}`}>
            
            <div>Это потом будет в фильтре поиска</div>
            
            <div css={{ height: 24 }} />
            
            <Card>
              
              <ProfileImLookingForOption />
              
              <PartnerHeightOption />
              
              <PartnerAgeOption />
              
            </Card>
            
          </div>
          
          
          <div css={{ height: 24 }} />
          
          
          <div>Old Profile Options</div>
          
          
          
          <div css={{ height: 24 }} />
          
          <Card>
            
            <DatePurposeOption />
            
            <DatePeriodBeforeDateOption />
          
          </Card>
          
          
          
          <div css={{ height: 24 }} />
          
          <Card>
            
            <DatePurposeOption />
            
            <DatePeriodBeforeDateOption />
          
          </Card>
          
          
          
          <div css={{ height: 24 }} />
          
          <Card>
            
            <DateMostInterestingVisitedPlaceOption />
            
            <DateDesiredPlaceOrEventOption />
          
          </Card>
          
          
          
          <div css={{ height: 24 }} />
          
          <Card>
            
            <ProfileSportFrequencyOption />
          
          </Card>
          
          
          
          <div css={{ height: 24 }} />
          
          <Card>
            
            
            <ProfileFavoriteMovieGenresOption />
            
            
            <ProfileFavoriteBookGenresOption />
          
          </Card>
          
          
          
          <div css={{ height: 24 }} />
          
          <Card>
            
            <PartnerPetsOption />
            
            
            <PartnerAlcoholOption />
            
            
            <PartnerSmokeOption />
          
          </Card>
        
        </Pages.Content>
      </Pages.Page>
      
      
      <BottomButtonBar settingsBtn />
    
    </>
  )
})
export default OldProfileOptionsTestPage

