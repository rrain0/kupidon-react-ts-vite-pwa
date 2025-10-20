import React, { useCallback, useEffect } from 'react'
import { AuthApi } from 'src/services/api/requests/AuthApi'
import { useFormApiRequest } from '@libs/api/useFormApiRequest.ts'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import { PlaceholderUiText } from 'src/locales/translations/PlaceholderUiText.ts'
import { StatusUiText } from 'src/locales/translations/StatusUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import Gap from '@libs/style-as-short-props/elems/Gap.tsx'
import Grid from '@libs/style-as-short-props/elems/Grid.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs'
import { useNavigate, useSearchParams } from 'react-router'
import { useFormData } from '@libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from '@libs/form-data/hooks/useFormSubmit'
import { useFormToasts } from '@libs/form-data/hooks/useFormToasts'
import FormFieldWrap from '@libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { RouteBuilder } from '@libs/route-builder/RouteBuilder'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import Input from 'src/components/elems/inputs/Input/Input'
import PwdInput from 'src/components/elems/inputs/PwdInput/PwdInput'
import { InputStyle } from 'src/components/elems/inputs/Input/InputStyle'
import { useAuthZustand } from 'src/zustand/auth/authZustand.ts'
import { LoginPageValidation } from 'src/components/pages/Login/LoginPage.validation.ts'
import FormValues = LoginPageValidation.FormValues
import validators = LoginPageValidation.validators
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import mapFailureCodeToUiOption = LoginPageValidation.mapFailureCodeToUiText
import defaultValues = LoginPageValidation.defaultValues
import userDefaultValues = LoginPageValidation.userDefaultValues
import contents = EmotionCommon.contents



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
    initialValues: defaultValues,
    validators,
  })
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useFormApiRequest({
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
      return failedFields.filter(it => it in userDefaultValues).length === 0
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
      
      {/* Баг, дважды добавляет роут в историю */}
      {/*
      {isSuccess && (() => {
        if (isdef(returnPath)) return <Navigate to={returnPath}/>
        return <AppNavigate toFull={RootRoute.findPair} noSearchFromUrl/>
      })()}
       */}
      
      <PageLayout col data-display-name='LoginPage'>
        <PageContentLayout colSm grow>
          <Flex col grow justify g={30}>
            <form css={contents} onSubmit={onSubmit}>
              
              
              <Grid cols='38px 1fr 38px' stretch>
                <Flex centerStart m={-13}><BackButton/></Flex>
                <Flex center><Hdrs.Page>{titleText.login}</Hdrs.Page></Flex>
                <Gap w={38}/>
              </Grid>
              
              
              <FormFieldWrap {...formFieldWrapProps} name='login'>
                {props => (
                  <Input
                    css={InputStyle.outlinedRectNormalNormal}
                    placeholder={placeholderText.loginAsEmail}
                    {...props.inputProps}
                    hasError={props.highlight}
                  />
                )}
              </FormFieldWrap>
              
              <FormFieldWrap {...formFieldWrapProps} name='pwd'>
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
            
            </form>
          </Flex>
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
})
LoginPage.displayName = 'LoginPage'
export default LoginPage

