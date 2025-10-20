import { getCurrentTimeZoneName } from '@utils/date/dateUtils.ts'
import React, { useCallback, useEffect } from 'react'
import { UserApi } from 'src/services/api/requests/UserApi.ts'
import { useFormApiRequest } from '@libs/api/useFormApiRequest.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import { PlaceholderUiText } from 'src/locales/translations/PlaceholderUiText.ts'
import { StatusUiText } from 'src/locales/translations/StatusUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import Gap from '@libs/style-as-short-props/elems/Gap.tsx'
import Grid from '@libs/style-as-short-props/elems/Grid.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs'
import ItemContainer from 'src/components/elems/basic-elements/ItemContainer.tsx'
import ItemTitleContainer from 'src/components/elems/basic-elements/ItemTitleContainer.tsx'
import { PwdChangePageValidation } from 'src/components/pages/PwdChange/PwdChangePage.validation.ts'
import { useFormData } from '@libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from '@libs/form-data/hooks/useFormSubmit.ts'
import { useFormToasts } from '@libs/form-data/hooks/useFormToasts.tsx'
import FormFieldWrap from '@libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { InputStyle } from 'src/components/elems/inputs/Input/InputStyle.ts'
import PwdInput from 'src/components/elems/inputs/PwdInput/PwdInput.tsx'
import defaultValues = PwdChangePageValidation.defaultValues
import validators = PwdChangePageValidation.validators
import FormValues = PwdChangePageValidation.FormValues
import userDefaultValues = PwdChangePageValidation.userDefaultValues
import mapFailureCodeToUiText = PwdChangePageValidation.mapFailureCodeToUiText
import PageLayout from 'src/components/components/page/PageLayout'
import PageContentLayout from 'src/components/components/page/PageContentLayout'
import contents = EmotionCommon.contents







const PwdChangePage = React.memo(() => {
  
  
  const actionText = useUiValues(ActionUiText)
  const titleText = useUiValues(TitleUiText)
  const placeholderText = useUiValues(PlaceholderUiText)
  
  
  
  
  
  const {
    values: formValues,
    setValues: setFormValues,
    errors: formErrors,
    setErrors: setFormErrors,
    errorFields: formErrorFields,
    formFieldWrapProps,
  } = useFormData({
    initialValues: defaultValues,
    validators,
  })
  
  const {
    request, isLoading,
    isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useFormApiRequest({
    values: formValues,
    errorFields: formErrorFields,
    prepareAndRequest: useCallback((
      values: FormValues, failedFields: (keyof FormValues)[]
    ) => {
      return UserApi.update({
        currentPwd: values.currentPwd,
        pwd: values.pwd,
      }, getCurrentTimeZoneName())
    }, []),
  })
  
  const {
    canSubmit, onSubmit, submit,
  } = useFormSubmit({
    setValues: setFormValues,
    errors: formErrors,
    setErrors: setFormErrors,
    errorFields: formErrorFields,
    getCanSubmit: useCallback((failedFields: (keyof FormValues)[]) => {
      return failedFields
        .filter(ff => ff in userDefaultValues)
        .length === 0
    }, []),
    request,
    isLoading,
    isError,
    response,
    resetResponse,
  })
  
  useFormToasts({
    isLoading,
    loadingText: StatusUiText.updating,
    isSuccess,
    successText: StatusUiText.updated,
    errors: formErrors,
    setErrors: setFormErrors,
    errorCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  
  
  
  useEffect(() => {
    if (isSuccess && isImmediate
      && response && 'data' in response
    ) {
      const used = response.usedValues
      if ('pwd' in used) {
        if (formValues.currentPwd === used.currentPwd)
          setFormValues(s => ({ ...s, currentPwd: defaultValues.currentPwd }))
        if (formValues.pwd === used.pwd)
          setFormValues(s => ({ ...s, pwd: defaultValues.pwd }))
        if (formValues.repeatPwd === used.pwd)
          setFormValues(s => ({ ...s, repeatPwd: defaultValues.repeatPwd }))
      }
    }
  }, [isSuccess, response, formValues, setFormValues])
  
  
  
  
  
  
  
  
  
  /* useEffect(() => {
    console.log('PWD_CHANGE_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  return (
    <>
      
      <PageLayout col data-display-name='PwdChangePage'>
        <PageContentLayout colSm grow>
          <Flex col grow justify g={30}>
            <form css={contents} onSubmit={onSubmit}>
              
              <Grid cols='38px 1fr 38px' stretch>
                <Flex centerStart m={-13}><BackButton/></Flex>
                <Flex center><Hdrs.Page>{titleText.pwdChange}</Hdrs.Page></Flex>
                <Gap w={38}/>
              </Grid>
              
              
              
              <ItemContainer>
                <ItemTitleContainer>
                  <Hdrs.InputTitleBold>{titleText.currentPwd}</Hdrs.InputTitleBold>
                </ItemTitleContainer>
                <FormFieldWrap {...formFieldWrapProps} name='currentPwd'>
                  {props => (
                    <PwdInput
                      css={InputStyle.outlinedRectSmallNormal}
                      placeholder={placeholderText.currentPwd}
                      {...props.inputProps}
                      hasError={props.highlight}
                    />
                  )}
                </FormFieldWrap>
              </ItemContainer>
              
              
              <ItemContainer>
                <ItemTitleContainer>
                  <Hdrs.InputTitleBold>{titleText.newPwd}</Hdrs.InputTitleBold>
                </ItemTitleContainer>
                <FormFieldWrap {...formFieldWrapProps} name='pwd'>
                  {props => (
                    <PwdInput
                      css={InputStyle.outlinedRectSmallNormal}
                      placeholder={placeholderText.newPwd}
                      {...props.inputProps}
                      hasError={props.highlight}
                    />
                  )}
                </FormFieldWrap>
              </ItemContainer>
              
              
              <ItemContainer>
                <ItemTitleContainer>
                  <Hdrs.InputTitleBold>{titleText.repeatPwd}</Hdrs.InputTitleBold>
                </ItemTitleContainer>
                <FormFieldWrap {...formFieldWrapProps} name='repeatPwd'>
                  {props => (
                    <PwdInput
                      css={InputStyle.outlinedRectSmallNormal}
                      placeholder={placeholderText.repeatPwd}
                      {...props.inputProps}
                      hasError={props.highlight}
                    />
                  )}
                </FormFieldWrap>
              </ItemContainer>
            
            
            
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}
                type='submit'
              >
                {actionText.changePwd}
              </Button>
            
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}
                disabled
              >
                {titleText.pwdRecovery}
              </Button>
            
            </form>
          </Flex>
        </PageContentLayout>
      </PageLayout>
      
      {/* <BottomFloatingBar settingsButton/> */}
      
      
    </>
  )
})
PwdChangePage.displayName = 'PwdChangePage'
export default PwdChangePage



