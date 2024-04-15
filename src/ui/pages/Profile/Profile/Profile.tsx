import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import React from 'react'
import ItemContainer from 'src/ui/elements/basic-elements/ItemContainer.tsx'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel.tsx'
import ItemTitleContainer from 'src/ui/elements/basic-elements/ItemTitleContainer.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import ProfileBirthDate from 'src/ui/pages/Profile/Profile/ProfileBirthDate.tsx'
import ProfileGender from 'src/ui/pages/Profile/Profile/ProfileGender.tsx'
import ProfileImLookingFor
  from 'src/ui/pages/Profile/Profile/ProfileImLookingFor.tsx'
import ProfileName from 'src/ui/pages/Profile/Profile/ProfileName.tsx'
import ProfilePageTabHeader from 'src/ui/pages/Profile/ProfilePageTabHeader.tsx'
import ProfilePhotos from 'src/ui/pages/Profile/Profile/ProfilePhotos.tsx'
import { ProfilePageValidation } from 'src/ui/pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import { TypeUtils } from 'src/util/common/TypeUtils.ts'
import { useFormFailures } from '@util/form-validation/hooks/useFormFailures.ts'
import { FormProps } from '@util/form-validation/hooks/useFormValuesProps.ts'
import ValidationWrap from '@util/form-validation/ValidationWrap.tsx'
import { ActionUiText } from 'src/ui/ui-values/ActionUiText.ts'
import Button from 'src/ui/elements/Buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle.ts'
import Card2 from 'src/ui/elements/cards/Card2.tsx'
import Textarea from 'src/ui/elements/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/ui/elements/Textarea/TextareaStyle.ts'
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
  
  
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  
  
  
  return <>
    <Pages.SafeInsets>
      <Pages.AddInsets css={css`padding-top: 20px;`}>
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
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel
                /* onClick={ev=>{
                 setImages([images[5],images[0],images[1],images[2],images[3],images[4]])
                 }} */
                /* onClick={ev=>{
                 setImages([images[0],undefined,images[2],images[3],images[4],images[5]])
                 }} */
              >
                {titleText.aboutMe}
              </ItemLabel>
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
      
      </Pages.ContentForm>
      </Pages.AddInsets>
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









