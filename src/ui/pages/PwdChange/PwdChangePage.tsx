import React, { useCallback, useEffect } from 'react'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar.tsx'
import FormHeader from 'src/ui/elements/basic-elements/Hs'
import ItemContainer from 'src/ui/elements/basic-elements/ItemContainer.tsx'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel.tsx'
import ItemTitleContainer from 'src/ui/elements/basic-elements/ItemTitleContainer.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars.tsx'
import { PwdChangePageValidation } from 'src/ui/pages/PwdChange/validation.ts'
import { useFormFailures } from '@util/mini-libs/form-validation/hooks/useFormFailures.ts'
import { useFormSubmit } from '@util/mini-libs/form-validation/hooks/useFormSubmit.ts'
import { useFormToasts } from '@util/mini-libs/form-validation/hooks/useFormToasts.tsx'
import ValidationWrap from '@util/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import Button from 'src/ui/elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import PwdInput from 'src/ui/elements/inputs/PwdInput/PwdInput.tsx'
import defaultValues = PwdChangePageValidation.defaultValues
import validators = PwdChangePageValidation.validators
import FormValues = PwdChangePageValidation.FormValues
import userDefaultValues = PwdChangePageValidation.userDefaultValues
import mapFailureCodeToUiText = PwdChangePageValidation.mapFailureCodeToUiText







const PwdChangePage =
React.memo(
()=>{
  
  
  const actionText = useUiValues(ActionUiText)
  const titleText = useUiValues(TitleUiText)
  const placeholderText = useUiValues(PlaceholderUiText)
  
  
  
  
  
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
    loadingText: StatusUiText.updating,
    isSuccess,
    successText: StatusUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  /* useEffect(()=>{
    console.log('PWD_CHANGE_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  return <>
    
    <Pages.Page>
      
      <Pages.SafeInsets>
        <Pages.ContentForm onSubmit={onFormSubmitCallback}>
          
          <FormHeader>{titleText.pwdChange}</FormHeader>
          
          
            
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{titleText.currentPwd}</ItemLabel>
            </ItemTitleContainer>
            <ValidationWrap {...validationProps}
              fieldName="currentPwd"
              render={props => <PwdInput
                css={InputStyle.outlinedRectSmallNormal}
                placeholder={placeholderText.currentPwd}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{titleText.newPwd}</ItemLabel>
            </ItemTitleContainer>
            <ValidationWrap {...validationProps}
              fieldName="pwd"
              render={props => <PwdInput
                css={InputStyle.outlinedRectSmallNormal}
                placeholder={placeholderText.newPwd}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{titleText.repeatPwd}</ItemLabel>
            </ItemTitleContainer>
            <ValidationWrap {...validationProps}
              fieldName="repeatPwd"
              render={props => <PwdInput
                css={InputStyle.outlinedRectSmallNormal}
                placeholder={placeholderText.repeatPwd}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
        
        
        
          <Button css={ButtonStyle.filledRectBigMain}
            type="submit"
          >
            {actionText.changePwd}
          </Button>
        
          <Button css={ButtonStyle.filledRectBigMain}
            disabled
          >
            {titleText.pwdRecovery}
          </Button>
        
        </Pages.ContentForm>
      </Pages.SafeInsets>
      
      <PageScrollbars />
    </Pages.Page>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
})
export default PwdChangePage



