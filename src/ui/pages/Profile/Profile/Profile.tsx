import styled from '@emotion/styled'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/elements/cards/Card3.tsx'
import ProfileAboutMe from 'src/ui/pages/Profile/Profile/ProfileAboutMe.tsx'
import ProfileBirthDate from 'src/ui/pages/Profile/Profile/ProfileBirthDate.tsx'
import ProfileGender from 'src/ui/pages/Profile/Profile/ProfileGender.tsx'
import ProfileImLookingFor
  from 'src/ui/pages/Profile/Profile/ProfileImLookingFor.tsx'
import ProfileName from 'src/ui/pages/Profile/Profile/ProfileName.tsx'
import ProfilePageTabHeader from 'src/ui/pages/Profile/ProfilePageTabHeader.tsx'
import ProfilePhotos from 'src/ui/pages/Profile/Profile/ProfilePhotos.tsx'
import { ProfilePageValidation } from 'src/ui/pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useFormFailures } from '@util/form-validation/hooks/useFormFailures.ts'
import { FormProps } from '@util/form-validation/hooks/useFormValuesProps.ts'
import ValidationWrap from '@util/form-validation/ValidationWrap.tsx'
import { ActionUiText } from 'src/ui/ui-values/ActionUiText.ts'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import fixedTop = EmotionCommon.fixedTop
import Callback1 = TypeUtils.Callback1
import Callback = TypeUtils.Callback







export type ProfileProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
}


const Profile =
React.memo(
(props: ProfileProps)=>{
  
  const actionText = useUiValues(ActionUiText)
  
  
  
  
  return <>
    <Pages.SafeInsets>
      <Pages.ContentForm onSubmit={props.onFormSubmitCallback}>
        
        <ProfilePageTabHeader thisTabIdx={1}/>
        
        
        <div css={col}>
          
          <ValidationWrap {...props.validationProps}
            fieldName="photos"
            render={props =>
              <ProfilePhotos
                images={props.value}
                setImages={props.setValue}
              />
            }
          />
          
          <div css={{ height: 24 }}/>
          
          <ValidationWrap {...props.validationProps}
            fieldName="aboutMe"
            render={validProps => <ProfileAboutMe {...validProps}/>}
          />
          
          <div css={{ height: 24 }}/>
          
          
          <Card3>
            
            
            <ValidationWrap {...props.validationProps}
              fieldName="name"
              render={validProps => <ProfileName {...validProps}/>}
            />
            
            
            <ValidationWrap {...props.validationProps}
              fieldName="birthDate"
              render={validProps => <ProfileBirthDate {...validProps}/>}
            />
            
            
            <ValidationWrap {...props.validationProps}
              fieldName="gender"
              render={validProps => <ProfileGender {...validProps}/>}
            />
            
            
            <ProfileImLookingFor/>
          
          
          </Card3>
        
        </div>
      
      </Pages.ContentForm>
    </Pages.SafeInsets>
    
    
    { (props.canSubmit || props.formProps.hasChanges) && <TopButtonBarFrame>
      { props.formProps.hasChanges &&
        <Button css={ButtonStyle.roundedSmallSecondary}
          onClick={props.formProps.resetUserFields}
        >{actionText.cancel}</Button>
      }
      { props.canSubmit && !props.isLoading &&
        <Button css={ButtonStyle.roundedSmallAccent}
          onClick={props.submit}
        >{actionText.save}</Button>
      }
    </TopButtonBarFrame>}
    
    
  </>
})
export default Profile










export const TopButtonBarFrame = styled.section`
  ${fixedTop};
  z-index: 10;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: ${p=>p.theme.containerNormal.bgc[0]}cc;
  gap: 10px;
  pointer-events: none;
  &>*{ pointer-events: auto; }
`









