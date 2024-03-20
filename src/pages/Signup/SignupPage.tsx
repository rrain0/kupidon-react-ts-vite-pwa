/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GenderEnum } from 'src/api/entity/GenderEnum'
import { useApiRequest } from 'src/api/useApiRequest'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import Form from 'src/components/FormElements/Form'
import FormHeader from 'src/components/FormElements/FormHeader'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import { SignupPageUiText } from 'src/pages/Signup/uiText'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserApi } from 'src/api/requests/UserApi'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import { DateTime } from 'src/utils/DateTime'
import { useFormFailures } from 'src/utils/form-validation/hooks/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/hooks/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/hooks/useFormToasts'
import ValidationWrap from 'src/utils/form-validation/ValidationWrap'
import { useUiValues } from 'src/utils/lang/useUiText'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import Input from 'src/views/Inputs/Input/Input'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Button from 'src/views/Buttons/Button'
import PwdInput from 'src/views/Inputs/PwdInput/PwdInput'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import RadioInputGroup from 'src/views/Inputs/RadioInput/RadioInputGroup'
import { RadioInputGroupStyle } from 'src/views/Inputs/RadioInput/RadioInputGroupStyle'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import { SignupPageValidation } from './validation'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
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
    <Page>
      
      <Form onSubmit={onFormSubmitCallback}>
        
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
        
      </Form>
      
      
      <PageScrollbars />
    </Page>
    
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
})
export default SignupPage





