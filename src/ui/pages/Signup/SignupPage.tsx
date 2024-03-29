import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GenderEnum } from 'src/api/entity/GenderEnum.ts'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar.tsx'
import TopButtonBar from 'src/ui/widgets/BottomButtonBar/TopButtonBar.tsx'
import FormHeader from 'src/ui/components/FormElements/FormHeader.tsx'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars.tsx'
import { SignupPageUiText } from 'src/ui/pages/Signup/uiText.ts'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { LangRecoil } from 'src/recoil/state/LangRecoil.ts'
import { DateTime } from '@util/DateTime.ts'
import { useFormFailures } from '@util/form-validation/hooks/useFormFailures.ts'
import { useFormSubmit } from '@util/form-validation/hooks/useFormSubmit.ts'
import { useFormToasts } from '@util/form-validation/hooks/useFormToasts.tsx'
import ValidationWrap from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import { RouteBuilder } from '@util/react/route-builder/RouteBuilder.tsx'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle.ts'
import Input from 'src/ui/elements/inputs/Input/Input.tsx'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle.ts'
import Button from 'src/ui/elements/Buttons/Button.tsx'
import PwdInput from 'src/ui/elements/inputs/PwdInput/PwdInput.tsx'
import RadioInput from 'src/ui/elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/elements/inputs/RadioInput/RadioInputGroup.tsx'
import { RadioInputGroupStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputGroupStyle.ts'
import { RadioInputStyle } from 'src/ui/elements/inputs/RadioInput/RadioInputStyle.ts'
import { SignupPageValidation } from 'src/ui/pages/Signup/validation.ts'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import mapFailureCodeToUiOption = SignupPageValidation.mapFailureCodeToUiText
import defaultValues = SignupPageValidation.defaultValues
import userDefaultValues = SignupPageValidation.userDefaultValues






const SignupPage =
React.memo(
() => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.signup[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  const lang = useRecoilValue(LangRecoil)
  
  const uiText = useUiValues(SignupPageUiText)
  
  
  const {
    formValues,
    setFormValues,
    failures,
    setFailures,
    failedFields,
    validationProps,
  } = useFormFailures({
    defaultValues,
    validators
  })
  
  const {
    request,
    isLoading, isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues)=>{
        const birthDateTime = DateTime.from_yyyy_MM_dd(values.birthDate)!
          .set({ timezone: DateTime.fromDate(new Date()).timezone})
          .to_yyyy_MM_dd_HH_mm_ss_SSS_XXX()
        return UserApi.create({
          email: values.email,
          pwd: values.pwd,
          name: values.name,
          gender: values.gender as GenderEnum,
          birthDate: birthDateTime,
        }, lang.lang[0])
      },
      [lang.lang]
    )
  })
  
  useEffect(
    ()=>{
      if (isSuccess && response?.isSuccess){
        setAuth(response.data)
      }
    },
    [isSuccess, response, setAuth]
  )
  
  const {
    canSubmit, onFormSubmitCallback, submit,
  } = useFormSubmit({
    failures, setFailures,
    failedFields, setFormValues,
    getCanSubmit: useCallback(
      (failedFields: (keyof FormValues)[]) => {
        return failedFields
          .filter(ff=>Object.hasOwn(userDefaultValues,ff))
          .length===0
      },
      []
    ),
    request,
    isLoading, isError,
    response, resetResponse,
  })
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: SignupPageUiText.registration,
    isSuccess,
    successText: SignupPageUiText.registrationCompleted,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  
  /* useEffect(()=>{
    console.log('SIGNUP_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  
  
  
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: uiText.iAmGuy.text,
      },{
        value: 'FEMALE',
        text: uiText.iAmGirl.text,
      }
    ] satisfies { value: GenderEnum, text: string }[],
    [uiText]
  )
  
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  
  useEffect(()=>{
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findPairs[full]())
    }
  },[isSuccess, navigate, returnPath])
  
  
  
  
  return <>
    <Pages.Page0>
      
      <form css={Pages.contentCenterBigGap} onSubmit={onFormSubmitCallback}>
        
        <FormHeader>{uiText.registration.text}</FormHeader>
        
        
        
        <ValidationWrap {...validationProps}
          fieldName='email'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiText.emailLoginPlaceholder.text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationWrap {...validationProps}
          fieldName='pwd'
          render={props => <PwdInput
            css={InputStyle.inputNormal}
            placeholder={uiText.pwdPlaceholder.text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationWrap {...validationProps}
          fieldName='repeatPwd'
          render={props => <PwdInput
            css={InputStyle.inputNormal}
            placeholder={uiText.repeatPwdPlaceholder.text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationWrap {...validationProps}
          fieldName='name'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiText.namePlaceholder.text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationWrap {...validationProps}
          fieldName='birthDate'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiText.birthDatePlaceholder.text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        
        <ValidationWrap {...validationProps}
          fieldName='gender'
          render={props =>
            <RadioInputGroup css={RadioInputGroupStyle.rowGroup}
              hasError={props.highlight}
            >
              { genderOptions.map(opt=>{
                return <RadioInput
                  css={RadioInputStyle.radio}
                  key={opt.value}
                  checked={props.value===opt.value}
                  value={opt.value}
                  onChange={props.inputProps.onChange}
                >
                  {opt.text}
                </RadioInput>
              }) }
            </RadioInputGroup>}
        />
        
        
        <Button
          css={ButtonStyle.bigRectMain}
          type='submit'
        >
          {uiText.signup.text}
        </Button>
        
      </form>
      
      
      <PageScrollbars />
    </Pages.Page0>
    
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
})
export default SignupPage





