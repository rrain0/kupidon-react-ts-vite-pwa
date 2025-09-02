import { DateU } from '@utils/date/DateU.ts'
import { GenderA } from 'src/model/api/GenderA.ts'
import { useFormApiRequest } from '@mini-libs/api/useFormApiRequest.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { PlaceholderUiText } from 'src/ui-data/translations/PlaceholderUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from 'src/mini-libs/form-data/hooks/useFormSubmit.ts'
import { useFormToasts } from 'src/mini-libs/form-data/hooks/useFormToasts.tsx'
import FormFieldWrap from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder.tsx'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle.ts'
import Input from 'src/ui/0-elements/inputs/Input/Input.tsx'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import PwdInput from 'src/ui/0-elements/inputs/PwdInput/PwdInput.tsx'
import RadioInput from 'src/ui/0-elements/inputs/RadioInput/RadioInput.tsx'
import RadioInputGroup from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroup.tsx'
import {
  RadioInputGroupStyle,
} from 'src/ui/0-elements/inputs/RadioInputGroup/RadioInputGroupStyle.ts'
import { RadioInputStyle } from 'src/ui/0-elements/inputs/RadioInput/RadioInputStyle.ts'
import { SignupPageValidation } from 'src/ui/2-pages/Signup/SignupPage.validation.ts'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { useAppZustand } from 'src/zustand/app/AppZustand.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import mapFailureCodeToUiOption = SignupPageValidation.mapFailureCodeToUiText
import defaultValues = SignupPageValidation.defaultValues
import userDefaultValues = SignupPageValidation.userDefaultValues
import contents = EmotionCommon.contents
import getCurrentTimeZoneName = DateU.getCurrentTimeZoneName






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
    isLoading, isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useFormApiRequest({
    values: formValues,
    errorFields: formErrorFields,
    prepareAndRequest: useCallback((values: FormValues) => {
      return UserApi.create({
        email: values.email,
        pwd: values.pwd,
        name: values.name,
        gender: values.gender as GenderA,
        birthDate: values.birthDate, // yyyy-MM-dd
      }, langs, getCurrentTimeZoneName())
    }, [langs]),
  })
  
  useEffect(() => {
    if (isSuccess && response?.isSuccess) {
      setAuth(response.data)
    }
  }, [isSuccess, response, setAuth])
  
  const {
    canSubmit, onSubmit, submit,
  } = useFormSubmit({
    setValues: setFormValues,
    errors: formErrors,
    setErrors: setFormErrors,
    errorFields: formErrorFields,
    getCanSubmit: useCallback((failedFields: (keyof FormValues)[]) => {
      return failedFields
        .filter(ff => Object.hasOwn(userDefaultValues, ff))
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
    loadingText: StatusUiText.registration,
    isSuccess,
    successText: StatusUiText.registrationCompleted,
    errors: formErrors,
    setErrors: setFormErrors,
    errorCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  
  /* useEffect(() => {
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
  ] satisfies { value: GenderA, text: string }[], [optionText])
  
  
  
  
  
  useEffect(() => {
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findPair[full]())
    }
  }, [isSuccess, navigate, returnPath])
  
  
  
  
  return (
    <>
      <PageLayout col data-display-name='SignupPage'>
        <PageContentLayout colSm grow>
          <Flex col grow justify g={30}>
            <form css={contents} onSubmit={onSubmit}>
            
            
              <Grid cols='38px 1fr 38px' stretch>
                <Flex centerStart m={-13}><BackButton/></Flex>
                <Flex center><Hdrs.Page>{titleText.registration}</Hdrs.Page></Flex>
                <Gap w={38}/>
              </Grid>
              
              
              
              <FormFieldWrap {...formFieldWrapProps} name='email'>
                {props => (
                  <Input
                    css={InputStyle.outlinedRectNormalNormal}
                    placeholder={placeholderText.emailAsLogin}
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
              
              <FormFieldWrap {...formFieldWrapProps} name='repeatPwd'>
                {props => (
                  <PwdInput
                    css={InputStyle.outlinedRectNormalNormal}
                    placeholder={placeholderText.repeatPwd}
                    {...props.inputProps}
                    hasError={props.highlight}
                  />
                )}
              </FormFieldWrap>
              
              <FormFieldWrap {...formFieldWrapProps} name='name'>
                {props => (
                  <Input
                    css={InputStyle.outlinedRectNormalNormal}
                    placeholder={placeholderText.name}
                    {...props.inputProps}
                    hasError={props.highlight}
                  />
                )}
              </FormFieldWrap>
              
              <FormFieldWrap {...formFieldWrapProps} name='birthDate'>
                {props => (
                  <Input
                    css={InputStyle.outlinedRectNormalNormal}
                    placeholder={placeholderText.birthDate}
                    {...props.inputProps}
                    hasError={props.highlight}
                  />
                )}
              </FormFieldWrap>
              
              
              <FormFieldWrap {...formFieldWrapProps} name='gender'>
                {props => (
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
              </FormFieldWrap>
              
              
              <Button
                css={ButtonS6.t(ButtonS6.S.filled.rect.lg.main)}
                type='submit'
              >
                {actionText.signup}
              </Button>
            
            </form>
          </Flex>
        </PageContentLayout>
      </PageLayout>
      
      <BottomFloatingBar settingsButton/>
      
      
    </>
  )
})
SignupPage.displayName = 'SignupPage'
export default SignupPage





