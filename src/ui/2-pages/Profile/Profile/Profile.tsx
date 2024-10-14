import styled from '@emotion/styled'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import DateIdealDateOption from 'src/ui/2-pages/Profile/options/DateIdealDateOption'
import DateIdealFormatOption from 'src/ui/2-pages/Profile/options/DateIdealFormatOption'
import DateIdealTimeOption from 'src/ui/2-pages/Profile/options/DateIdealTimeOption'
import DateWhoPaysOption from 'src/ui/2-pages/Profile/options/DateWhoPaysOption'
import PartnerAgeOption from 'src/ui/2-pages/Profile/Partner/options/PartnerAgeOption'
import ProfileKidsOption from 'src/ui/2-pages/Profile/options/ProfileKidsOption'
import ProfileLangsOption from 'src/ui/2-pages/Profile/options/ProfileLangsOption.tsx'
import ProfileMeetingPurposeOption
  from 'src/ui/2-pages/Profile/options/ProfileMeetingPurposeOption'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/0-elements/cards/Card3.tsx'
import ProfileAboutMeOption from 'src/ui/2-pages/Profile/options/ProfileAboutMeOption.tsx'
import ProfileAlcoholOption from 'src/ui/2-pages/Profile/options/ProfileAlcoholOption.tsx'
import ProfileBirthDateOption from 'src/ui/2-pages/Profile/options/ProfileBirthDateOption.tsx'
import ProfileEducationOption from 'src/ui/2-pages/Profile/options/ProfileEducationOption.tsx'
import ProfileFavoriteBookGenresOption
  from 'src/ui/2-pages/Profile/options-old/ProfileFavoriteBookGenresOption.tsx'
import ProfileFavoriteMovieGenresOption
  from 'src/ui/2-pages/Profile/options-old/ProfileFavoriteMovieGenresOption.tsx'
import ProfileGenderOption from 'src/ui/2-pages/Profile/Profile/options/ProfileGenderOption.tsx'
import ProfileHeightOption from 'src/ui/2-pages/Profile/options/ProfileHeightOption.tsx'
import ProfileImLookingForOption
  from 'src/ui/2-pages/Profile/Profile/options/ProfileImLookingForOption.tsx'
import ProfileInterestsAndHobbiesOption
  from 'src/ui/2-pages/Profile/options/ProfileInterestsAndHobbiesOption.tsx'
import ProfileJobOption from 'src/ui/2-pages/Profile/options/ProfileJobOption.tsx'
import ProfileNameOption from 'src/ui/2-pages/Profile/options/ProfileNameOption.tsx'
import ProfilePetsOption from 'src/ui/2-pages/Profile/options/ProfilePetsOption.tsx'
import ProfilePlaceOfResidenceOption
  from 'src/ui/2-pages/Profile/options/ProfilePlaceOfResidenceOption'
import ProfileSmokeOption from 'src/ui/2-pages/Profile/options/ProfileSmokeOption.tsx'
import ProfilePageTabHeader from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import ProfilePhotos from 'src/ui/2-pages/Profile/Profile/ProfilePhotos.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures.ts'
import { FormProps } from 'src/mini-libs/form-validation/hooks/useFormValuesProps.ts'
import ValidationWrap from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import fixedTop = EmotionCommon.fixedTop
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback







export type ProfileProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Profile = React.memo(
  (props: ProfileProps) => {
    
    const actionText = useUiValues(ActionUiText)
    
    const text = {
      bio: 'Био',
      itImportant: 'Важное',
      interestingToKnow: 'Интересно узнать',
      myDate: 'Моё свидание',
    }
    
    
    
    
    return (
      <>
        <Pages.SafeInsets>
          <Pages.ContentForm onSubmit={props.onFormSubmitCallback}>
            
            <ProfilePageTabHeader thisTabIdx={props.tabIdx} />
            
            
            <div css={col}>
              
              <ValidationWrap {...props.validationProps}
                fieldName="photos"
                render={props => (
                  <ProfilePhotos
                    images={props.value}
                    setImages={props.setValue}
                  />
                )}
              />
              
              <div css={{ height: 24 }} />
              
              
              
              
              <CardTitle>{text.bio}</CardTitle>
              
              <div css={{ height: 24 }} />
              
              <Card3>
                
                <ValidationWrap {...props.validationProps}
                  fieldName="name"
                  render={validProps => (
                    <ProfileNameOption {...validProps} />
                  )}
                />
                
                <ValidationWrap {...props.validationProps}
                  fieldName="birthDate"
                  render={validProps => (
                    <ProfileBirthDateOption {...validProps} />
                  )}
                />
              
              </Card3>
              
              <div css={{ height: 24 }} />
              
              <ValidationWrap {...props.validationProps}
                fieldName="aboutMe"
                render={validProps => (
                  <ProfileAboutMeOption {...validProps} />
                )}
              />
              
              <div css={{ height: 24 }} />
              
              
              
              
              <CardTitle>{text.itImportant}</CardTitle>
              
              <div css={{ height: 24 }} />
              
              <Card3>
                
                <ProfileMeetingPurposeOption />
                
                <ProfilePlaceOfResidenceOption />
                
                <ProfileKidsOption />
                
                <ValidationWrap {...props.validationProps}
                  fieldName="height"
                >
                  {validProps => (
                    <ProfileHeightOption {...validProps} />
                  )}
                </ValidationWrap>
                
                <ProfileInterestsAndHobbiesOption />
              
              </Card3>
              
              <div css={{ height: 24 }} />
              
              
              
              
              <CardTitle>{text.interestingToKnow}</CardTitle>
              
              <div css={{ height: 24 }} />
              
              <Card3>
                
                <ValidationWrap {...props.validationProps}
                  fieldName="job"
                >
                  {validProps => (
                    <ProfileJobOption {...validProps} />
                  )}
                </ValidationWrap>
                
                
                <ValidationWrap {...props.validationProps}
                  fieldName="education"
                >
                  {validProps => (
                    <ProfileEducationOption {...validProps} />
                  )}
                </ValidationWrap>
                
                
                <ProfileSmokeOption />
                
                
                <ProfileAlcoholOption />
                
                
                <ProfilePetsOption />
                
                
                <ProfileLangsOption />
              
              </Card3>
              
              <div css={{ height: 24 }} />
              
              
              
              
              <CardTitle>{text.myDate}</CardTitle>
              
              <div css={{ height: 24 }} />
              
              <Card3>
                
                <DateIdealFormatOption />
                
                
                <DateIdealTimeOption />
                
                
                <DateWhoPaysOption />
              
              </Card3>
              
              <div css={{ height: 24 }} />
              
              <DateIdealDateOption />
              
              
              
              
              
              
              
              
              <div css={{ height: 400 }} />
              
              <div css={{ height: 24 }} />
              
              <CardTitle>{'Остальное (потом удалю, оставил для примера)'}</CardTitle>
              
              <div css={{ height: 24 }} />
              
              <Card3>
                
                
                <ValidationWrap {...props.validationProps}
                  fieldName="gender"
                  render={validProps => <ProfileGenderOption {...validProps} />}
                />
                
                
                <ValidationWrap {...props.validationProps}
                  fieldName="partnerGender"
                  render={validProps => <ProfileImLookingForOption {...validProps} />}
                />
                
                <PartnerAgeOption />
                
              
              </Card3>
            
            
            </div>
          
          </Pages.ContentForm>
        </Pages.SafeInsets>
        
        
        {(props.canSubmit || props.formProps.hasChanges) && (
          <TopButtonBarFrame>
            {props.formProps.hasChanges &&
              <Button css={ButtonS.outlinedRoundedSmallNormal}
                onClick={props.formProps.resetUserFields}
              >{actionText.cancel}</Button>
            }
            {props.canSubmit && !props.isLoading &&
              <Button css={ButtonS.filledRoundedSmallAccent}
                onClick={props.submit}
              >{actionText.save}</Button>
            }
          </TopButtonBarFrame>
        )}
      
      
      </>
    )
  }
)
export default Profile


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
  
  & > * {
    pointer-events: auto;
  }
`


const CardTitle = styled.h4`
  align-self: center;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
  
  font-weight: 400;
  font-size: 20px;
  line-height: 119%;
  letter-spacing: 0.05em;
  
  color: ${p => p.theme.containerNormal.content3[0]};
`


