import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import DateIdealDateOption from 'src/components/pages/Profile/options/DateIdealDateOption'
import DateIdealFormatOption from 'src/components/pages/Profile/options/DateIdealFormatOption'
import DateIdealTimeOption from 'src/components/pages/Profile/options/DateIdealTimeOption'
import DateWhoPaysOption from 'src/components/pages/Profile/options/DateWhoPaysOption'
import PartnerAgeOption from 'src/components/pages/Profile/options-filter/PartnerAgeOption'
import ProfileKidsOption from 'src/components/pages/Profile/options/ProfileKidsOption'
import ProfileLangsOption from 'src/components/pages/Profile/options/ProfileLangsOption.tsx'
import ProfileMeetingPurposeOption
  from 'src/components/pages/Profile/options/ProfileMeetingPurposeOption'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import Card from 'src/components/elems/Card/Card.tsx'
import ProfileAboutMeOption from 'src/components/pages/Profile/options/ProfileAboutMeOption.tsx'
import ProfileAlcoholOption from 'src/components/pages/Profile/options/ProfileAlcoholOption.tsx'
import ProfileBirthDateOption from 'src/components/pages/Profile/options/ProfileBirthDateOption.tsx'
import ProfileEducationOption from 'src/components/pages/Profile/options/ProfileEducationOption.tsx'
import ProfileFavoriteBookGenresOption
  from 'src/components/pages/Profile/options-old/ProfileFavoriteBookGenresOption.tsx'
import ProfileFavoriteMovieGenresOption
  from 'src/components/pages/Profile/options-old/ProfileFavoriteMovieGenresOption.tsx'
import ProfileGenderOption from 'src/components/pages/Profile/options/ProfileGenderOption.tsx'
import ProfileHeightOption from 'src/components/pages/Profile/options/ProfileHeightOption.tsx'
import ProfileImLookingForOption
  from 'src/components/pages/Profile/options-filter/ProfileImLookingForOption.tsx'
import ProfileInterestsAndHobbiesOption
  from 'src/components/pages/Profile/options/ProfileInterestsAndHobbiesOption.tsx'
import ProfileJobOption from 'src/components/pages/Profile/options/ProfileJobOption.tsx'
import ProfileNameOption from 'src/components/pages/Profile/options/ProfileNameOption.tsx'
import ProfilePetsOption from 'src/components/pages/Profile/options/ProfilePetsOption.tsx'
import ProfilePlaceOfResidenceOption
  from 'src/components/pages/Profile/options/ProfilePlaceOfResidenceOption'
import ProfileSmokeOption from 'src/components/pages/Profile/options/ProfileSmokeOption.tsx'
import ProfilePageTabHeader from 'src/components/pages/Profile/ProfilePageTabHeader.tsx'
import ProfilePhotos from 'src/components/pages/Profile/Profile/ProfilePhotos.tsx'
import { ProfilePageValidation } from 'src/components/pages/Profile/ProfilePage.validation.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { FormProps } from 'src/mini-libs/form-data/hooks/useFormDerivedData.ts'
import FormFieldWrap from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback
import { Hdrs } from 'components/elems/basic-elements/Hdrs'







export type ProfileProps = {
  formFieldWrapProps: ReturnType<typeof useFormData<FormValues>>['formFieldWrapProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Profile = React.memo((props: ProfileProps) => {
  
  const actionText = useUiValues(ActionUiText)
  
  const text = {
    bio: 'Био',
    itImportant: 'Важное',
    interestingToKnow: 'Интересно узнать',
    myDate: 'Моё свидание',
  }
  
  
  
  
  return (
    <>
      <PageContentLayout colSm styleInner={{ gap: 30 }}>
        <form style={{ display: 'contents' }} onSubmit={props.onFormSubmitCallback}>
            
          <ProfilePageTabHeader mainTabI={props.tabIdx}/>
          
          <div css={col}>
            
            <FormFieldWrap{...props.formFieldWrapProps} name='photos'>
              {props => (
                <ProfilePhotos
                  images={props.value}
                  setImages={props.setValue}
                />
              )}
            </FormFieldWrap>
            
            <div css={{ height: 24 }}/>
            
            
            
            
            <Hdrs.PageSec2>{text.bio}</Hdrs.PageSec2>
            
            <div css={{ height: 24 }}/>
            
            <Card>
              
              <FormFieldWrap{...props.formFieldWrapProps} name='name'>
                {validProps => (
                  <ProfileNameOption {...validProps}/>
                )}
              </FormFieldWrap>
              
              <FormFieldWrap{...props.formFieldWrapProps} name='birthDate'>
                {validProps => (
                  <ProfileBirthDateOption {...validProps}/>
                )}
              </FormFieldWrap>
              
              <FormFieldWrap{...props.formFieldWrapProps} name='gender'>
                {validProps => (
                  <ProfileGenderOption {...validProps}/>
                )}
              </FormFieldWrap>
            
            </Card>
            
            <div css={{ height: 24 }}/>
            
            <FormFieldWrap{...props.formFieldWrapProps} name='aboutMe'>
              {validProps => (
                <ProfileAboutMeOption {...validProps}/>
              )}
            </FormFieldWrap>
            
            <div css={{ height: 24 }}/>
            
            
            
            
            <Hdrs.PageSec2>{text.itImportant}</Hdrs.PageSec2>
            
            <div css={{ height: 24 }}/>
            
            <Card>
              
              <ProfileMeetingPurposeOption/>
              
              <ProfilePlaceOfResidenceOption/>
              
              <ProfileKidsOption/>
              
              <ProfileHeightOption/>
              
              <ProfileInterestsAndHobbiesOption/>
            
            </Card>
            
            <div css={{ height: 24 }}/>
            
            
            
            
            <Hdrs.PageSec2>{text.interestingToKnow}</Hdrs.PageSec2>
            
            <div css={{ height: 24 }}/>
            
            <Card>
              
              <ProfileJobOption/>
              
              
              <ProfileEducationOption/>
              
              
              <ProfileLangsOption/>
              
              
              <ProfileSmokeOption/>
              
              
              <ProfileAlcoholOption/>
              
              
              <ProfilePetsOption/>
            
            </Card>
            
            <div css={{ height: 24 }}/>
            
            
            
            
            <Hdrs.PageSec2>{text.myDate}</Hdrs.PageSec2>
            
            <div css={{ height: 24 }}/>
            
            <Card>
              
              <DateIdealFormatOption/>
              
              
              <DateIdealTimeOption/>
              
              
              <DateWhoPaysOption/>
            
            </Card>
            
            <div css={{ height: 24 }}/>
            
            <DateIdealDateOption/>
          
          
          </div>
        
        </form>
      </PageContentLayout>
  
    
    </>
  )
})
export default Profile



