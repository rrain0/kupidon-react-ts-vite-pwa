import React from 'react'
import Card3 from 'src/ui/0-elements/cards/Card3'
import ProfileFavoriteBookGenresOption
  from 'src/ui/2-pages/Profile/options-old/ProfileFavoriteBookGenresOption'
import ProfileFavoriteMovieGenresOption
  from 'src/ui/2-pages/Profile/options-old/ProfileFavoriteMovieGenresOption'
import ProfileSportFrequencyOption
  from 'src/ui/2-pages/Profile/options-old/ProfileSportFrequencyOption'
import PartnerAlcoholOption from 'src/ui/2-pages/Profile/options-old/PartnerAlcoholOption'
import PartnerPetsOption from 'src/ui/2-pages/Profile/options-old/PartnerPetsOption'
import PartnerSmokeOption from 'src/ui/2-pages/Profile/options-old/PartnerSmokeOption'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/ui/components/Pages/Pages'
import DateDesiredPlaceOrEventOption from 'src/ui/2-pages/Profile/options-old/DateDesiredPlaceOrEventOption'
import DateMostInterestingVisitedPlaceOption
  from 'src/ui/2-pages/Profile/options-old/DateMostInterestingVisitedPlaceOption'
import DatePeriodBeforeDateOption from 'src/ui/2-pages/Profile/options-old/DatePeriodBeforeDateOption'
import DatePurposeOption from 'src/ui/2-pages/Profile/options-old/DatePurposeOption'



const OldProfileOptionsPage = React.memo(
  () => {
    
    
    return (
      <>
        
        <Pages.SimplePage>
          <Pages.ContentFill>
            
            <div>Old Profile Options</div>
            
            
            
            <div css={{ height: 24 }} />
            
            <Card3>
              
              <DatePurposeOption />
              
              <DatePeriodBeforeDateOption />
            
            </Card3>
            
            
            
            <div css={{ height: 24 }} />
            
            <Card3>
              
              <DatePurposeOption />
              
              <DatePeriodBeforeDateOption />
            
            </Card3>
            
            
            
            <div css={{ height: 24 }} />
            
            <Card3>
              
              <DateMostInterestingVisitedPlaceOption />
              
              <DateDesiredPlaceOrEventOption />
            
            </Card3>
            
            
            
            <div css={{ height: 24 }} />
            
            <Card3>
              
              <ProfileSportFrequencyOption />
            
            </Card3>
            
            
            
            <div css={{ height: 24 }} />
            
            <Card3>
              
              
              <ProfileFavoriteMovieGenresOption />
              
              
              <ProfileFavoriteBookGenresOption />
            
            </Card3>
            
            
            
            <div css={{ height: 24 }} />
            
            <Card3>
              
              <PartnerPetsOption />
              
              
              <PartnerAlcoholOption />
              
              
              <PartnerSmokeOption />
            
            </Card3>
          
          </Pages.ContentFill>
        </Pages.SimplePage>
        
        
        <BottomButtonBar settingsBtn />
      
      </>
    )
  }
)
export default OldProfileOptionsPage

