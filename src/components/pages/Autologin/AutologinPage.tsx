import React, { useCallback, useEffect } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { useFormApiRequest } from '@mini-libs/api/useFormApiRequest.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import { StatusUiText } from 'src/locales/translations/StatusUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import Flex from 'src/components/elems/basic-elements/Flex.tsx'
import Gap from 'src/components/elems/basic-elements/Gap.tsx'
import Grid from 'src/components/elems/basic-elements/Grid.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs'
import { useNavigate, useSearchParams } from 'react-router'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from 'src/mini-libs/form-data/hooks/useFormSubmit'
import { useFormToasts } from 'src/mini-libs/form-data/hooks/useFormToasts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import { AutologinPageValidation } from 'src/components/pages/Autologin/AutologinPage.validation.ts'
import FormValues = AutologinPageValidation.FormValues
import validators = AutologinPageValidation.validators
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import mapFailureCodeToUiOption = AutologinPageValidation.mapFailureCodeToUiText
import defaultValues = AutologinPageValidation.defaultValues
import userDefaultValues = AutologinPageValidation.userDefaultValues



const AutologinPage = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.autologin[params].returnPath) ?? undefined
  const accountName = searchParams.get(RootRoute.autologin[params].useAccount) ?? ''
  const navigate = useNavigate()
  
  const setAuth = useAuthZustand.setState
  
  const actionText = useUiValues(ActionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const {
    values: formValues,
    setValues: setFormValues,
    errors: formErrors,
    setErrors: setFormErrors,
    errorFields: formErrorFields,
    formFieldWrapProps,
  } = useFormData({
    initialValues: { ...defaultValues, accountName },
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
      const account = values.accountName
      if (account === 'test') return AuthApi.loginTestUser()
      throw new Error(`Unsupported accountName: '${account}'`)
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
    setFormValues(curr => ({ ...curr, accountName }))
  }, [accountName])
  
  useEffect(() => {
    submit()
  }, [formValues])
  
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
      
      <PageLayout col data-display-name='AutologinPage'>
        <PageContentLayout colSm grow>
          <Flex col grow justify g={30}>
            
            <Grid cols='38px 1fr 38px' stretch>
              <Flex centerStart m={-13}><BackButton/></Flex>
              <Flex center><Hdrs.Page>{titleText.autologin}</Hdrs.Page></Flex>
              <Gap w={38}/>
            </Grid>
            
            <div>Account: "{accountName}"</div>
            
            <Button
              css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}
              onClick={submit}
            >
              {actionText.autologin}
            </Button>
            
            <AppLink
              toFull={RootRoute.login}
              allowedNamedParams={{ returnPath }}
              noSearchFromUrl
            >
              <Button
                css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}
              >
                {actionText.login}
              </Button>
            </AppLink>
            
            <AppLink
              toFull={RootRoute.signup}
              allowedNamedParams={{ returnPath }}
              noSearchFromUrl
            >
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                {actionText.signup}
              </Button>
            </AppLink>
            
          </Flex>
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar settingsButton/>
      
    </>
  )
})
AutologinPage.displayName = 'AutologinPage'
export default AutologinPage

