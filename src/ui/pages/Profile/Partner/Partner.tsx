import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import React from 'react'
import ItemContainer from 'src/ui/elements/basic-elements/ItemContainer.tsx'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel.tsx'
import ItemTitleContainer from 'src/ui/elements/basic-elements/ItemTitleContainer.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/elements/cards/Card3.tsx'
import PartnerAgeOption from 'src/ui/pages/Profile/Partner/PartnerAgeOption.tsx'
import PartnerHeightOption from 'src/ui/pages/Profile/Partner/PartnerHeightOption.tsx'
import ProfileAboutMeOption from 'src/ui/pages/Profile/Profile/ProfileAboutMeOption.tsx'
import ProfileBirthDateOption from 'src/ui/pages/Profile/Profile/ProfileBirthDateOption.tsx'
import ProfileGenderOption from 'src/ui/pages/Profile/Profile/ProfileGenderOption.tsx'
import ProfileImLookingForOption
  from 'src/ui/pages/Profile/Profile/ProfileImLookingForOption.tsx'
import ProfileNameOption from 'src/ui/pages/Profile/Profile/ProfileNameOption.tsx'
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
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import Card2 from 'src/ui/elements/cards/Card2.tsx'
import Textarea from 'src/ui/elements/Textarea/Textarea.tsx'
import { TextareaStyle } from 'src/ui/elements/Textarea/TextareaStyle.ts'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import fixedTop = EmotionCommon.fixedTop
import Callback1 = TypeUtils.Callback1
import Callback = TypeUtils.Callback
import boyGirlCatShadow from '@img/bgc/boy-girl-cat-shadow.jpg'







export type PartnerProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
}


const Partner =
React.memo(
(props: PartnerProps)=>{
  
  const actionText = useUiValues(ActionUiText)
  
  
  
  
  return <>
    <Pages.SafeInsets>
      <Pages.ContentForm onSubmit={props.onFormSubmitCallback}>
      
      <ProfilePageTabHeader thisTabIdx={2}/>
      
      
      <div css={col}>
        
        <div css={css`
          width: 100%;
          height: 200px;
          border-radius: 20px;
          background-position: center;
          background-size: cover;
        `}
          style={{ backgroundImage: `url(${boyGirlCatShadow})` }}
        />
        
        <div css={{ height: 24 }}/>
        
        <Card3>
          
          <ValidationWrap {...props.validationProps}
            fieldName="partnerAge"
            render={validProps => <PartnerAgeOption {...validProps}/>}
          />
          
          <ValidationWrap {...props.validationProps}
            fieldName="partnerHeight"
            render={validProps => <PartnerHeightOption {...validProps}/>}
          />
          
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
export default Partner










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









