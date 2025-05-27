import { noFormSubmit } from '@util/js/noFormSubmit.ts'
import React, { useCallback, useEffect } from 'react'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar'
import ItemContainer from 'src/ui/0-elements/basic-elements/ItemContainer'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/1-widgets/Scrollbars/PageScrollbars'
import { AccountSettingsPageValidation } from 'src/ui/2-pages/AccountSettings/validation'
import { ObjectU } from 'src/util/common/ObjectU'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from 'src/mini-libs/form-data/hooks/useFormSubmit'
import { useFormToasts } from 'src/mini-libs/form-data/hooks/useFormToasts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RouteBuilder } from 'src/mini-libs/route-builder/RouteBuilder'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import DataField from 'src/ui/0-elements/DataField/DataField'
import { DataFieldStyle } from 'src/ui/0-elements/DataField/DataFieldStyle'
import Input from 'src/ui/0-elements/inputs/Input/Input'
import { InputStyle } from 'src/ui/0-elements/inputs/Input/InputStyle'
import { AuthZustand, useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import FormValues = AccountSettingsPageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import userDefaultValues = AccountSettingsPageValidation.userDefaultValues
import ObjectKeys = ObjectU.ObjectKeys
import validators = AccountSettingsPageValidation.validators
import defaultValues = AccountSettingsPageValidation.defaultValues
import mapFailureCodeToUiText = AccountSettingsPageValidation.mapFailureCodeToUiText
import RootRoute = AppRoutes.RootRoute







const AccountSettingsPage = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
  const auth = useAuthZustand()
  const user = auth.user!
  const { logout } = auth
  const setAuth = useAuthZustand.setState
  
  
  const fetchUser = async() => {
    const resp = await UserApi.current()
    if (resp.isSuccess) setAuth({ user: resp.data.user })
    else console.warn('Failed to fetch user:', resp)
  }
  useEffect(() => void fetchUser(), [])
  
  
  
  
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
    request, isLoading,
    isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    errorFields: formErrorFields,
    prepareAndRequest: useCallback((
      values: FormValues, failedFields: (keyof FormValues)[]
    ) => {
      const userToUpdate: UserToUpdate = { }
      ObjectKeys(userDefaultValues)
        .filter(fName => !['pwd', 'repeatPwd'].includes(fName))
        .forEach(fName => {
          if (!failedFields.includes(fName)) userToUpdate[fName] = values[fName]
        })
      if (!failedFields.includes('pwd') &&
        !failedFields.includes('repeatPwd')
      ) userToUpdate.pwd = values.pwd
      return UserApi.update(userToUpdate)
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
      const preparedFields = [...failedFields]
      if (failedFields.includes('pwd') && !failedFields.includes('repeatPwd')) {
        preparedFields.push('repeatPwd')
      }
      if (!failedFields.includes('pwd') && failedFields.includes('repeatPwd')) {
        preparedFields.push('pwd')
      }
      return preparedFields
        .filter(ff => Object.hasOwn(userDefaultValues, ff))
        .length < ObjectKeys(userDefaultValues).length
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
  
  
  
  // TODO move to useFormDerivedData
  const fieldIsInitial = useCallback((field: keyof FormValues) => {
    return formErrors.some(f => f.type === 'initial' && f.errorFields.includes(field))
  }, [formErrors])
  
  const updateValues = (auth: AuthZustand) => {
    setFormValues(s => {
      const u = auth.user!
      const newValues = { ...s, initialValues: { ...s.initialValues } }
      //newValues.initialValues.name = u.name
      
      ObjectKeys(userDefaultValues).forEach(fName => {
        if (fieldIsInitial(fName) && fName in u)
          newValues[fName] = u[fName] as any
      })
      return newValues
    })
  }
  useEffect(() => updateValues(auth), [auth])
  
  const resetField = useCallback((fieldName: keyof FormValues) => {
    const vs = formValues, ivs = formValues.initialValues
    setFormValues({
      ...vs,
      [fieldName]: ivs[fieldName],
    })
  },
  [formValues, setFormValues])
  
  
  
  useEffect(() => {
    if (isSuccess && response && 'data' in response) {
      setAuth({ user: response.data!.user })
      const used = response.usedValues
      if ('pwd' in used) {
        if (formValues.pwd === used.pwd)
          resetField('pwd')
        if (formValues.repeatPwd === used.pwd)
          resetField('repeatPwd')
      }
    }
  }, [isSuccess, response, formValues, resetField])
  
  
  
  
  
  
  
  
  /* useEffect(() => {
    console.log('ACCOUNT_SETTINGS_FAILURES',failures)
  },[failures]) */
  
  
  
  
  return (
    <>
      <Pages.PageGrad>
        
        
        <Pages.AddSafeInsets>
          <Pages.ContentColSmForm {...noFormSubmit}>
            
            <Hdrs.Page>{titleText.account}</Hdrs.Page>
            
            
            
            
            <ItemContainer>
              <Hdrs.InputTitleBold>{titleText.id}</Hdrs.InputTitleBold>
              <Input
                css={InputStyle.outlinedRectOf({ size: 'small', textSize: 'smaller' })}
                readOnly
                value={user.id}
              />
            </ItemContainer>
            
            <ItemContainer>
              <Hdrs.InputTitleBold>{titleText.email}</Hdrs.InputTitleBold>
              <Input
                css={InputStyle.outlinedRectOf({ size: 'small' })}
                readOnly
                value={user.email}
              />
            </ItemContainer>
            
            <ItemContainer>
              <Hdrs.InputTitleBold>{titleText.emailVerified}</Hdrs.InputTitleBold>
              <Input
                css={InputStyle.outlinedRectOf({ size: 'small' })}
                readOnly
                value={user.emailVerified
                  ? actionText.yes.toLowerCase()
                  : actionText.no.toLowerCase()
                }
              />
            </ItemContainer>
            
            {/* <ItemContainer>
             <ItemLabel>{titleText.userCreated}</ItemLabel>
             <Input
             css={InputStyle.input(
             { size: 'small', static: true }
             )}
             readOnly
             value={new Date(user.created) + ''}
             />
             </ItemContainer>
             
             <ItemContainer>
             <ItemLabel>{titleText.userUpdated}</ItemLabel>
             <Input
             css={InputStyle.input(
             { size: 'small', static: true }
             )}
             readOnly
             value={new Date(user.updated) + ''}
             />
             </ItemContainer> */}
            
            <ItemContainer>
              <Hdrs.InputTitleBold>{titleText.userCreated}</Hdrs.InputTitleBold>
              <DataField css={DataFieldStyle.statikSmall}>
                {new Date(user.created) + ''}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <Hdrs.InputTitleBold>{titleText.userUpdated}</Hdrs.InputTitleBold>
              <DataField css={DataFieldStyle.statikSmall}>
                {new Date(user.updated) + ''}
              </DataField>
            </ItemContainer>
            
            
            
            
            <AppLink toFull={RootRoute.settings.pwdChange}>
              <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}>
                {titleText.pwdChange}
              </Button>
            </AppLink>
            
            <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}
              onClick={logout}
            >
              {actionText.logOutFromAccount}
            </Button>
          
            <Button css={ButtonS6.t(ButtonS6.S.filled.rect.lg.normal)}
              onClick={undefined}
              disabled
            >
              {actionText.deleteAccount}
            </Button>
          
          </Pages.ContentColSmForm>
        </Pages.AddSafeInsets>
        
        
        <PageScrollbars/>
      </Pages.PageGrad>
      
      
      <TopButtonBar backBtn/>
      
      {/* <BottomButtonBar settingsBtn
        rightChildren={
          canSubmit && <Button css={IconButtonStyle.icon}
            onClick={submit}
          >
            <FloppyDisk1Ic/>
          </Button>
        }
      /> */}
      
    </>
  )
})
export default AccountSettingsPage


