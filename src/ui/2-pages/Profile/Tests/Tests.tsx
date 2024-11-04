import styled from '@emotion/styled'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import PartnerAgeOption from 'src/ui/2-pages/Profile/options-filter/PartnerAgeOption'
import PartnerHeightOption from 'src/ui/2-pages/Profile/options-filter/PartnerHeightOption'
import ProfileGenderOption from 'src/ui/2-pages/Profile/options/ProfileGenderOption'
import ProfileImLookingForOption
  from 'src/ui/2-pages/Profile/options-filter/ProfileImLookingForOption'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import Card3 from 'src/ui/0-elements/cards/Card3.tsx'
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
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import col = EmotionCommon.col
import FormValues = ProfilePageValidation.FormValues
import fixedTop = EmotionCommon.fixedTop
import Callback1 = TypeU.Callback1
import Callback = TypeU.Callback
import twoCuteCats from 'src/res/img/bg/two-cute-cats.jpg'
import { CardTitle } from '../parts/CardTitle'




export type DateProps = {
  validationProps: ReturnType<typeof useFormFailures<FormValues>>['validationProps']
  onFormSubmitCallback: Callback1<React.FormEvent>
  submit: Callback
  canSubmit: boolean
  formProps: FormProps
  isLoading: boolean
  tabIdx: number
}


const Tests = React.memo(
  (props: DateProps) => {
    
    const actionText = useUiValues(ActionUiText)
    
    
    
    
    return (
      <>
        <Pages.SafeInsets>
          <Pages.ContentForm onSubmit={props.onFormSubmitCallback}>
          
            <ProfilePageTabHeader thisTabIdx={props.tabIdx} />
            
            
            <div css={col}>
              
              {/* <ProfileTabPicture
                style={{
                  backgroundImage: `url(${twoCuteCats})`,
                  backgroundPositionY: '70%',
                }}
              /> */}
              {/*
               <ProfileTabPicture
                 style={{ backgroundImage: `url(${boyGirlCatShadow})` }}
               />
               */}
              
              
              <div css={{ height: 800 }} />
              
              <div css={{ height: 24 }} />
              
              <CardTitle>Это потом будет в фильтре поиска</CardTitle>
              
              <div css={{ height: 24 }} />
              
              <Card3>
                
                <ProfileImLookingForOption />
                
                <PartnerHeightOption />
                
                <PartnerAgeOption />
              
              
              </Card3>
              
              {/* <div css={{ height: 24 }} /> */}
            
            </div>
          
          </Pages.ContentForm>
        </Pages.SafeInsets>
        
        {/*
        {(props.canSubmit || props.formProps.hasChanges) && (
          <TopButtonBarFrame>
            { props.formProps.hasChanges && (
              <Button
                css={ButtonS.outlinedRoundedSmallNormal}
                onClick={props.formProps.resetUserFields}
              >
                {actionText.cancel}
              </Button>
            )}
            { props.canSubmit && !props.isLoading && (
              <Button css={ButtonS.filledRoundedSmallAccent}
                onClick={props.submit}
              >
                {actionText.save}
              </Button>
            )}
          </TopButtonBarFrame>
        )}
         */}
        
      </>
    )
  }
)
export default Tests




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


