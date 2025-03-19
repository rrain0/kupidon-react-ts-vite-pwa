import { Gender } from 'src/api/model/Gender.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar.tsx'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars.tsx'
import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { DateTime } from '@util/DateTime.ts'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures.ts'
import { useFormSubmit } from 'src/mini-libs/form-validation/hooks/useFormSubmit.ts'
import { useFormToasts } from 'src/mini-libs/form-validation/hooks/useFormToasts.tsx'
import ValidationWrap from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle.ts'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import PwdInput from 'src/ui/0-elements/inputs/PwdInput/PwdInput.tsx'
import RadioInput from 'src/ui/0-elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import { RadioInputGroupStyle } from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroupStyle.ts'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle.ts'
import { SignupPageValidation } from 'src/ui/2-pages/Signup/validation.ts'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import mapFailureCodeToUiOption = SignupPageValidation.mapFailureCodeToUiText
import defaultValues = SignupPageValidation.defaultValues
import userDefaultValues = SignupPageValidation.userDefaultValues






const SignupPage = React.memo(() => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.signup[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useAuthZustand.setState
  const langs = useAppZustand(s => s.langs)
  
  
  const actionText = useUiValues(ActionUiText)
  const titleText = useUiValues(TitleUiText)
  const placeholderText = useUiValues(PlaceholderUiText)
  const optionText = useUiValues(OptionUiText)
  
  
  const {
    formValues,
    setFormValues,
    failures,
    setFailures,
    failedFields,
    validationProps,
  } = useFormFailures({
    defaultValues,
    validators,
  })
  
  const {
    request,
    isLoading, isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback((values: FormValues) => {
      const birthDateTime = DateTime.from_yyyy_MM_dd(values.birthDate)!
        .set({ timezone: DateTime.fromDate(new Date()).timezone })
        .to_yyyy_MM_dd_HH_mm_ss_SSS_XXX()
      return UserApi.create({
        email: values.email,
        pwd: values.pwd,
        name: values.name,
        gender: values.gender as Gender,
        birthDate: birthDateTime,
      }, langs)
    }, [langs]),
  })
  
  useEffect(() => {
    if (isSuccess && response?.isSuccess) {
      setAuth(response.data)
    }
  }, [isSuccess, response, setAuth])
  
  const {
    canSubmit, onFormSubmitCallback, submit,
  } = useFormSubmit({
    failures, setFailures,
    failedFields, setFormValues,
    getCanSubmit: useCallback((failedFields: (keyof FormValues)[]) => {
      return failedFields
        .filter(ff => Object.hasOwn(userDefaultValues, ff))
        .length === 0
    }, []),
    request,
    isLoading, isError,
    response, resetResponse,
  })
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: StatusUiText.registration,
    isSuccess,
    successText: StatusUiText.registrationCompleted,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  
  /* useEffect(()=>{
    console.log('SIGNUP_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  
  
  
  
  
  const genderOptions = useMemo(() => [
    {
      value: 'MALE',
      text: optionText.iAmGuy,
    },
    {
      value: 'FEMALE',
      text: optionText.iAmGirl,
    },
  ] satisfies { value: Gender, text: string }[], [optionText])
  
  
  
  
  
  useEffect(() => {
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findCouple[full]())
    }
  }, [isSuccess, navigate, returnPath])
  
  
  
  
  return (
    <>
      <Pages.PageGrad>
        
        <Pages.AddSafeInsets>
          <Pages.ContentColSmForm onSubmit={onFormSubmitCallback}>
          
            <Hdrs.Page>{titleText.registration}</Hdrs.Page>
            
            
            
            <ValidationWrap {...validationProps}
              fieldName="email"
              render={props => (
                <Input
                  css={InputStyle.outlinedRectNormalNormal}
                  placeholder={placeholderText.emailAsLogin}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              )}
            />
            
            <ValidationWrap {...validationProps}
              fieldName="pwd"
              render={props => (
                <PwdInput
                  css={InputStyle.outlinedRectNormalNormal}
                  placeholder={placeholderText.pwd}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              )}
            />
            
            <ValidationWrap {...validationProps}
              fieldName="repeatPwd"
              render={props => (
                <PwdInput
                  css={InputStyle.outlinedRectNormalNormal}
                  placeholder={placeholderText.repeatPwd}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              )}
            />
            
            <ValidationWrap {...validationProps}
              fieldName="name"
              render={props => (
                <Input
                  css={InputStyle.outlinedRectNormalNormal}
                  placeholder={placeholderText.name}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              )}
            />
            
            <ValidationWrap {...validationProps}
              fieldName="birthDate"
              render={props => (
                <Input
                  css={InputStyle.outlinedRectNormalNormal}
                  placeholder={placeholderText.birthDate}
                  {...props.inputProps}
                  hasError={props.highlight}
                />
              )}
            />
            
            
            <ValidationWrap {...validationProps}
              fieldName="gender"
              render={props => (
                <RadioInputGroup css={RadioInputGroupStyle.rowGroup}
                  hasError={props.highlight}
                >
                  { genderOptions.map(opt => {
                    return (
                      <RadioInput
                        css={RadioInputStyle.radio}
                        key={opt.value}
                        checked={props.value === opt.value}
                        value={opt.value}
                        onChange={props.inputProps.onChange}
                      >
                        {opt.text}
                      </RadioInput>
                    )
                  }) }
                </RadioInputGroup>
              )}
            />
            
            
            <Button
              css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}
              type="submit"
            >
              {actionText.signup}
            </Button>
            
          </Pages.ContentColSmForm>
        </Pages.AddSafeInsets>
        
        
        <PageScrollbars />
      </Pages.PageGrad>
      
      
      
      <TopButtonBar backBtn />
      
      <BottomButtonBar settingsBtn />
      
      
    </>
  )
})
export default SignupPage





