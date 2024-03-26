import { css } from '@emotion/react'
import React, { useCallback, useEffect, useRef } from 'react'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/widgets/BottomButtonBar/TopButtonBar.tsx'
import Form from 'src/ui/components/FormElements/Form.tsx'
import FormHeader from 'src/ui/components/FormElements/FormHeader.tsx'
import ItemContainer from 'src/ui/components/FormElements/ItemContainer.tsx'
import ItemLabel from 'src/ui/components/FormElements/ItemLabel.tsx'
import ItemTitleContainer from 'src/ui/components/FormElements/ItemTitleContainer.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars.tsx'
import { PwdChangeUiText } from 'src/ui/pages/PwdChange/uiText.ts'
import { PwdChangePageValidation } from 'src/ui/pages/PwdChange/validation.ts'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { useFormFailures } from '@util/form-validation/hooks/useFormFailures.ts'
import { useFormSubmit } from '@util/form-validation/hooks/useFormSubmit.ts'
import { useFormToasts } from '@util/form-validation/hooks/useFormToasts.tsx'
import ValidationWrap from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import Button from 'src/ui/elements/Buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle.ts'
import Card from 'src/ui/elements/cards/Card.tsx'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import PwdInput from 'src/ui/elements/inputs/PwdInput/PwdInput.tsx'
import col = EmotionCommon.col
import Page = Pages.Page
import defaultValues = PwdChangePageValidation.defaultValues
import validators = PwdChangePageValidation.validators
import FormValues = PwdChangePageValidation.FormValues
import userDefaultValues = PwdChangePageValidation.userDefaultValues
import mapFailureCodeToUiText = PwdChangePageValidation.mapFailureCodeToUiText







const PwdChangePage =
React.memo(
()=>{
  
  const uiText = useUiValues(PwdChangeUiText)
  
  
  
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
  } = useFormFailures({
    defaultValues, validators
  })
  
  const {
    request, isLoading,
    isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues,failedFields: (keyof FormValues)[])=>{
        return UserApi.update({
          currentPwd: values.currentPwd,
          pwd: values.pwd,
        })
      },
      []
    )
  })
  
  const {
    canSubmit, onFormSubmitCallback, submit,
  } = useFormSubmit({
    failures, setFailures,
    failedFields, setFormValues,
    getCanSubmit: useCallback(
      (failedFields: (keyof FormValues)[]) => {
        return failedFields
          .filter(ff=>ff in userDefaultValues)
          .length===0
      },
      []
    ),
    request, isLoading,
    isError, response,
    resetResponse,
  })
  
  
  
  
  
  
  useEffect(
    ()=>{
      if (isSuccess && isImmediate
        && response && 'data' in response
      ){
        const used = response.usedValues
        if ('pwd' in used){
          if (formValues.currentPwd===used.currentPwd)
            setFormValues(s=>({ ...s, currentPwd: defaultValues.currentPwd }))
          if (formValues.pwd===used.pwd)
            setFormValues(s=>({ ...s, pwd: defaultValues.pwd }))
          if (formValues.repeatPwd===used.pwd)
            setFormValues(s=>({ ...s, repeatPwd: defaultValues.repeatPwd }))
        }
      }
    },
    [isSuccess, response, formValues, setFormValues]
  )
  
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: PwdChangeUiText.update,
    isSuccess,
    successText: PwdChangeUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  /* useEffect(()=>{
    console.log('PWD_CHANGE_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  return <>
    
    <Page>
      <Form onSubmit={onFormSubmitCallback}>
        
        <FormHeader>{uiText.changePwd.text}</FormHeader>
        
        
        
        <Card>
          
          
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{uiText.currentPwd.text}</ItemLabel>
            </ItemTitleContainer>
            <ValidationWrap {...validationProps}
              fieldName='currentPwd'
              render={props => <PwdInput
                css={InputStyle.inputSmall}
                placeholder={uiText.currentPwdPlaceholder.text}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{uiText.newPwd.text}</ItemLabel>
            </ItemTitleContainer>
            <ValidationWrap {...validationProps}
              fieldName='pwd'
              render={props => <PwdInput
                css={InputStyle.inputSmall}
                placeholder={uiText.newPwdPlaceholder.text}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{uiText.repeatPwd.text}</ItemLabel>
            </ItemTitleContainer>
            <ValidationWrap {...validationProps}
              fieldName='repeatPwd'
              render={props => <PwdInput
                css={InputStyle.inputSmall}
                placeholder={uiText.repeatPwdPlaceholder.text}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          
        
        </Card>
        
        
        
        
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectMain}
            type='submit'
          >
            {uiText.doChangePwd.text}
          </Button>
        </div>
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectAccent}
            disabled
          >
            {uiText.pwdRecovery.text}
          </Button>
        </div>
      
      </Form>
      
      
      <PageScrollbars />
    </Page>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
})
export default PwdChangePage






const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`