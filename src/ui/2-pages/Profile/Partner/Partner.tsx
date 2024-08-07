import styled from '@emotion/styled'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/0-elements/cards/Card3.tsx'
import PartnerAgeOption from 'src/ui/2-pages/Profile/Partner/options/PartnerAgeOption.tsx'
import PartnerAlcoholOption from 'src/ui/2-pages/Profile/Partner/options/PartnerAlcoholOption.tsx'
import PartnerCharacterAndPersonalQualitiesOption
  from 'src/ui/2-pages/Profile/Partner/options/PartnerCharacterAndPersonalQualitiesOption.tsx'
import PartnerHeightOption from 'src/ui/2-pages/Profile/Partner/options/PartnerHeightOption.tsx'
import PartnerPetsOption from 'src/ui/2-pages/Profile/Partner/options/PartnerPetsOption.tsx'
import PartnerSmokeOption from 'src/ui/2-pages/Profile/Partner/options/PartnerSmokeOption.tsx'
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
import boyGirlCatShadow from 'src/res/img/bg/boy-girl-cat-shadow.jpg'




export type PartnerProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Partner =
React.memo(
(props: PartnerProps) => {
  
  const actionText = useUiValues(ActionUiText)
  
  
  
  
  return <>
    <Pages.SafeInsets>
      <Pages.ContentForm onSubmit={props.onFormSubmitCallback}>
      
      <ProfilePageTabHeader thisTabIdx={props.tabIdx}/>
      
      
      <div css={col}>
        
        <ProfileTabPicture
          style={{ backgroundImage: `url(${boyGirlCatShadow})` }}
        />
        
        <div css={{ height: 24 }}/>
        
        <Card3>
          
          <ValidationWrap {...props.validationProps}
            fieldName='partnerAge'
            render={validProps => <PartnerAgeOption {...validProps}/>}
          />
          
          <ValidationWrap {...props.validationProps}
            fieldName='partnerHeight'
            render={validProps => <PartnerHeightOption {...validProps}/>}
          />
          
          
          <PartnerPetsOption />
          
          
          <PartnerAlcoholOption />
          
          
          <PartnerSmokeOption />
          
          
          <PartnerCharacterAndPersonalQualitiesOption />
          
          
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
})
export default Partner



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



