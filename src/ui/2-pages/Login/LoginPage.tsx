import React, { useCallback, useEffect } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { useSetRecoilState } from 'recoil'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar'
import FormHeader from 'src/ui/0-elements/basic-elements/Hs'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures'
import { useFormSubmit } from 'src/mini-libs/form-validation/hooks/useFormSubmit'
import { useFormToasts } from 'src/mini-libs/form-validation/hooks/useFormToasts'
import ValidationWrap from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import Input from 'src/ui/0-elements/inputs/Input/Input'
import PwdInput from 'src/ui/0-elements/inputs/PwdInput/PwdInput'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle'
import { LoginPageValidation } from './validation'
import FormValues = LoginPageValidation.FormValues
import validators = LoginPageValidation.validators
import { Pages } from 'src/ui/components/Pages/Pages'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import params = RouteBuilder.params
import mapFailureCodeToUiOption = LoginPageValidation.mapFailureCodeToUiText
import defaultValues = LoginPageValidation.defaultValues
import userDefaultValues = LoginPageValidation.userDefaultValues








const LoginPage =
React.memo(
()=>{
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.login[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
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
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues)=>{
        return AuthApi.login({
          login: values.login,
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
    request,
    isLoading, isError,
    response, resetResponse,
  })
  
  
  
  useEffect(
    ()=>{
      if (isSuccess && response?.isSuccess){
        setAuth(response.data)
      }
    },
    [isSuccess, response, setAuth]
  )
  
  
  
  useFormToasts({
    isLoading,
    loadingText: StatusUiText.loggingIn,
    isSuccess,
    successText: StatusUiText.loginCompleted,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  
  /* useEffect(()=>{
   console.log('LOGIN_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  useEffect(()=>{
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findPairs[full]())
    }
  },[isSuccess, navigate, returnPath])
  
  
  
  return <>
    <Pages.Page>
      <Pages.SafeInsets>
        <Pages.ContentForm onSubmit={onFormSubmitCallback}>
          
          <FormHeader>{titleText.login}</FormHeader>
          
          
          <ValidationWrap {...validationProps}
            fieldName="login"
            render={props => <Input
              css={InputStyle.outlinedRectNormalNormal}
              placeholder={placeholderText.loginEmail}
              {...props.inputProps}
              hasError={props.highlight}
            />}
          />
          
          <ValidationWrap {...validationProps}
            fieldName="pwd"
            render={props => <PwdInput
              css={InputStyle.outlinedRectNormalNormal}
              placeholder={placeholderText.pwd}
              {...props.inputProps}
              hasError={props.highlight}
            />}
          />
          
          
          <Button
            css={ButtonStyle.filledRectBigMain}
            type="submit"
          >
            {actionText.login}
          </Button>
          
          
          <Link to={RootRoute.signup[fullAllowedNameParams]({ returnPath: returnPath })}>
            <Button css={ButtonStyle.filledRectBigNormal}>
              {actionText.signup}
            </Button>
          </Link>
        
        </Pages.ContentForm>
      </Pages.SafeInsets>
      
      <PageScrollbars />
    </Pages.Page>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
  </>
})
export default LoginPage

