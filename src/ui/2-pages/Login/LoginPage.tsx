import React, { useCallback, useEffect } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import TopFloatingBar from 'src/ui/components/screen-bars/TopFloatingBar.tsx'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { useNavigate, useSearchParams } from 'react-router'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from 'src/mini-libs/form-data/hooks/useFormSubmit'
import { useFormToasts } from 'src/mini-libs/form-data/hooks/useFormToasts'
import FormFieldWrap from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import Input from 'src/ui/0-elements/inputs/Input/Input'
import PwdInput from 'src/ui/0-elements/inputs/PwdInput/PwdInput'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import { LoginPageValidation } from './validation'
import FormValues = LoginPageValidation.FormValues
import validators = LoginPageValidation.validators
import { Pages } from 'src/ui/components/Pages/Pages'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import mapFailureCodeToUiOption = LoginPageValidation.mapFailureCodeToUiText
import defaultValues = LoginPageValidation.defaultValues
import userDefaultValues = LoginPageValidation.userDefaultValues




const LoginPage = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.login[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useAuthZustand.setState
  
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
    defaultValues, validators,
  })
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    errorFields: formErrorFields,
    prepareAndRequest: useCallback((values: FormValues) => {
      return AuthApi.login({
        login: values.login,
        pwd: values.pwd,
      })
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
    loadingText: StatusUiText.loggingIn,
    isSuccess,
    successText: StatusUiText.loginCompleted,
    errors: formErrors,
    setErrors: setFormErrors,
    errorCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  useEffect(() => {
    if (isSuccess && response?.isSuccess) {
      setAuth(response.data)
    }
  }, [isSuccess, response, setAuth])
  
  
  
  
  
  
  
  /* useEffect(() => {
   console.log('LOGIN_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  useEffect(() => {
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findPair[full]())
    }
  }, [isSuccess, navigate, returnPath])
  
  
  
  return (
    <>
      <Pages.PageGrad>
        <Pages.AddSafeInsets>
          <Pages.ContentColSmForm onSubmit={onSubmit}>
            
            <Hdrs.Page>{titleText.login}</Hdrs.Page>
            
            
            <FormFieldWrap {...formFieldWrapProps} fieldName='login'>
              {props => (
                <Input
                  css={InputStyle.outlinedRectNormalNormal}
                  placeholder={placeholderText.loginAsEmail}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              )}
            </FormFieldWrap>
            
            <FormFieldWrap {...formFieldWrapProps} fieldName='pwd'>
              {props => (
                <PwdInput
                  css={InputStyle.outlinedRectNormalNormal}
                  placeholder={placeholderText.pwd}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              )}
            </FormFieldWrap>
            
            
            <Button
              css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}
              type='submit'
            >
              {actionText.login}
            </Button>
            
            
            <AppLink toFull={RootRoute.signup} allowedNamedParams={{ returnPath }}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                {actionText.signup}
              </Button>
            </AppLink>
          
          </Pages.ContentColSmForm>
        </Pages.AddSafeInsets>
        
        <PageScrollbars/>
      </Pages.PageGrad>
      
      
      <TopFloatingBar backButton/>
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
})
export default LoginPage

