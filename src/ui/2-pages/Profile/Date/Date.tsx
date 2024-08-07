import styled from '@emotion/styled'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/0-elements/cards/Card3.tsx'
import DateActionsToCheerUpPartnerOption
  from 'src/ui/2-pages/Profile/Date/options/DateActionsToCheerUpPartnerOption.tsx'
import DateAdditionalInfoOption from 'src/ui/2-pages/Profile/Date/options/DateAdditionalInfoOption.tsx'
import DateDesiredPlaceOrEventOption
  from 'src/ui/2-pages/Profile/Date/options/DateDesiredPlaceOrEventOption.tsx'
import DateFavoriteCuisineOption from 'src/ui/2-pages/Profile/Date/options/DateFavoriteCuisineOption.tsx'
import DateGenreOption from 'src/ui/2-pages/Profile/Date/options/DateGenreOption.tsx'
import DateIdealDateOption from 'src/ui/2-pages/Profile/Date/options/DateIdealDateOption.tsx'
import DateMostInterestingVisitedPlaceOption
  from 'src/ui/2-pages/Profile/Date/options/DateMostInterestingVisitedPlaceOption.tsx'
import DatePeriodBeforeDateOption from 'src/ui/2-pages/Profile/Date/options/DatePeriodBeforeDateOption.tsx'
import DatePlaceOption from 'src/ui/2-pages/Profile/Date/options/DatePlaceOption.tsx'
import DatePlaceToMarryOption from 'src/ui/2-pages/Profile/Date/options/DatePlaceToMarryOption.tsx'
import DatePurposeOption from 'src/ui/2-pages/Profile/Date/options/DatePurposeOption.tsx'
import DateTimesOfDayOption from 'src/ui/2-pages/Profile/Date/options/DateTimesOfDayOption.tsx'
import DateWhoPaysOption from 'src/ui/2-pages/Profile/Date/options/DateWhoPaysOption.tsx'
import ProfilePageTabHeader from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import ProfileTabPicture from 'src/ui/2-pages/Profile/ProfileTabPicture.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures.ts'
import { FormProps } from 'src/mini-libs/form-validation/hooks/useFormValuesProps.ts'
import ValidationWrap from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import fixedTop = EmotionCommon.fixedTop
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback
import twoCuteCats from 'src/res/img/bg/two-cute-cats.jpg'




export type DateProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Date = React.memo(
  (props: DateProps) => {
    
    const actionText = useUiValues(ActionUiText)
    
    
    
    
    return (
      <>
        <Pages.SafeInsets>
          <Pages.ContentForm onSubmit={props.onFormSubmitCallback}>
          
          <ProfilePageTabHeader thisTabIdx={props.tabIdx}/>
          
          
          <div css={col}>
            
            <ProfileTabPicture
              style={{
                backgroundImage: `url(${twoCuteCats})`,
                backgroundPositionY: '70%',
              }}
            />
            
            <div css={{ height: 24 }}/>
            
            <Card3>
              
              {/* <ValidationWrap {...props.validationProps}
                fieldName="partnerAge"
                render={validProps => <PartnerAgeOption {...validProps}/>}
              />
              
              <ValidationWrap {...props.validationProps}
                fieldName="partnerHeight"
                render={validProps => <PartnerHeightOption {...validProps}/>}
              /> */}
              
              
              <DatePurposeOption />
              
              
              <DateGenreOption />
              
              
              <DatePlaceOption />
              
              
              <DateTimesOfDayOption />
              
              
              <DatePeriodBeforeDateOption />
              
              
              <DateWhoPaysOption />
              
              
              <DateAdditionalInfoOption />
              
              
            </Card3>
            
            <div css={{ height: 24 }}/>
            
            <Card3>
              
              
              <DateMostInterestingVisitedPlaceOption />
              
              
              <DateActionsToCheerUpPartnerOption />
              
              
              <DatePlaceToMarryOption />
              
              
              <DateFavoriteCuisineOption />
              
              
              <DateDesiredPlaceOrEventOption />
              
              
              <DateIdealDateOption />
              
              
            </Card3>
          
          </div>
        
        </Pages.ContentForm>
        </Pages.SafeInsets>
        
        
        { (props.canSubmit || props.formProps.hasChanges) && <TopButtonBarFrame>
          { props.formProps.hasChanges
            && <Button css={ButtonStyle.outlinedRoundedSmallNormal}
              onClick={props.formProps.resetUserFields}
            >{actionText.cancel}</Button>
          }
          { props.canSubmit && !props.isLoading
            && <Button css={ButtonStyle.filledRoundedSmallAccent}
              onClick={props.submit}
            >{actionText.save}</Button>
          }
        </TopButtonBarFrame>}
        
        
      </>
    )
  }
)
export default Date




export const TopButtonBarFrame = styled.section`
  ${fixedTop};
  z-index: 10;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: ${p => p.theme.containerNormal.bg[0]}cc;
  gap: 10px;
  pointer-events: none;
  &>*{ pointer-events: auto; }
`


