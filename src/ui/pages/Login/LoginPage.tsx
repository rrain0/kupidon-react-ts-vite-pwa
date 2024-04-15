import React, { useCallback, useEffect } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { useSetRecoilState } from 'recoil'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/widgets/BottomButtonBar/TopButtonBar'
import FormHeader from 'src/ui/elements/basic-elements/Hs'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { LoginPageUiText } from 'src/ui/pages/Login/uiText'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useFormFailures } from '@util/form-validation/hooks/useFormFailures'
import { useFormSubmit } from '@util/form-validation/hooks/useFormSubmit'
import { useFormToasts } from '@util/form-validation/hooks/useFormToasts'
import ValidationWrap from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder'
import Button from 'src/ui/elements/Buttons/Button'
import Input from 'src/ui/elements/inputs/Input/Input'
import PwdInput from 'src/ui/elements/inputs/PwdInput/PwdInput'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle'
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
  
  const uiText = useUiValues(LoginPageUiText)
  
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
    loadingText: LoginPageUiText.loggingIn,
    isSuccess,
    successText: LoginPageUiText.loginCompleted,
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
          
          <FormHeader>{uiText.login.text}</FormHeader>
          
          
          <ValidationWrap {...validationProps}
            fieldName="login"
            render={props => <Input
              css={InputStyle.inputNormal}
              placeholder={uiText.loginEmailPlaceholder.text}
              {...props.inputProps}
              hasError={props.highlight}
            />}
          />
          
          <ValidationWrap {...validationProps}
            fieldName="pwd"
            render={props => <PwdInput
              css={InputStyle.inputNormal}
              placeholder={uiText.pwdPlaceholder.text}
              {...props.inputProps}
              hasError={props.highlight}
            />}
          />
          
          
          <Button
            css={ButtonStyle.bigRectMain}
            type="submit"
          >
            {uiText.doLogin.text}
          </Button>
          
          
          <Link to={RootRoute.signup[fullAllowedNameParams]({ returnPath: returnPath })}>
            <Button css={ButtonStyle.bigRectAccent}>
              {uiText.signup.text}
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

