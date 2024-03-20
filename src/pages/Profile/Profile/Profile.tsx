/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import Form from 'src/components/FormElements/Form'
import ItemContainer from 'src/components/FormElements/ItemContainer'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import ItemTitleContainer from 'src/components/FormElements/ItemTitleContainer'
import { Pages } from 'src/components/Page/Pages'
import ProfileBirthDate from 'src/pages/Profile/Profile/ProfileBirthDate'
import ProfileGender from 'src/pages/Profile/Profile/ProfileGender'
import ProfileImLookingFor
  from 'src/pages/Profile/Profile/ProfileImLookingFor'
import ProfileName from 'src/pages/Profile/Profile/ProfileName'
import ProfilePageTabHeader from 'src/pages/Profile/ProfilePageTabHeader'
import ProfilePhotos from 'src/pages/Profile/Profile/ProfilePhotos'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useFormFailures } from 'src/utils/form-validation/hooks/useFormFailures'
import { FormProps } from 'src/utils/form-validation/hooks/useFormValuesProps'
import ValidationWrap from 'src/utils/form-validation/ValidationWrap'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { useUiValues } from 'src/utils/lang/useUiText'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card2 from 'src/views/Card2'
import Textarea from 'src/views/Textarea/Textarea'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import fixedTop = EmotionCommon.fixedTop
import Callback1 = TypeUtils.Callback1
import Callback = TypeUtils.Callback
import PageContentPaddings = Pages.PageContentPaddings







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
  
  
  const uiText = useUiValues(ProfileUiText)
  const actionUiValues = useUiValues(ActionUiText)
  
  
  
  
  
  
  return <>
    <PageContentPaddings>
      <Form onSubmit={props.onFormSubmitCallback}>
        
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
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel
                /* onClick={ev=>{
                 setImages([images[5],images[0],images[1],images[2],images[3],images[4]])
                 }} */
                /* onClick={ev=>{
                 setImages([images[0],undefined,images[2],images[3],images[4],images[5]])
                 }} */
              >{uiText.aboutMe.text}</ItemLabel>
            </ItemTitleContainer>
            <ValidationWrap {...props.validationProps}
              fieldName="aboutMe"
              render={props =>
                <Textarea css={TextareaStyle.small}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              }
            />
          </ItemContainer>
          
          
          <div css={{ height: 24 }}/>
          
          
          <Card2 css={css`
          gap: 10px;
        `}>
            
            
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
          
          
          </Card2>
        
        </div>
      
      </Form>
    </PageContentPaddings>
    
    
    { (props.canSubmit || props.formProps.hasChanges) && <TopButtonBarFrame>
      { props.formProps.hasChanges &&
        <Button css={ButtonStyle.roundedSmallSecondary}
          onClick={props.formProps.resetUserFields}
        >{actionUiValues.cancel.text}</Button>
      }
      { props.canSubmit && !props.isLoading &&
        <Button css={ButtonStyle.roundedSmallAccent}
          onClick={props.submit}
        >{actionUiValues.save.text}</Button>
      }
    </TopButtonBarFrame>}
    
    
  </>
})
export default Profile










export const TopButtonBarFrame = styled.section`
  ${fixedTop};
  z-index: 10;
  //height: var(--top-button-bar-height);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: ${p=>p.theme.containerNormal.bgc[0]}cc;
  gap: 10px;
  pointer-events: none;
  &>*{ pointer-events: auto; }
`









