import { DateU } from '@util/date/DateU.ts'
import { noFormSubmit } from '@util/js/noFormSubmit.ts'
import React, { useCallback, useEffect } from 'react'
import { UserApi } from 'src/api/requests/UserApi'
import { useFormApiRequest } from '@mini-libs/api/useFormApiRequest.ts'
import { AppRoutes } from 'src/app-routes/AppRoutes.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import Flex from 'src/ui/0-elements/basic-elements/Flex.tsx'
import Gap from 'src/ui/0-elements/basic-elements/Gap.tsx'
import Grid from 'src/ui/0-elements/basic-elements/Grid.tsx'
import { Hdrs } from 'src/ui/0-elements/basic-elements/Hdrs'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import AppLink from 'src/ui/components/app-router/AppLink.tsx'
import PageContentLayout from 'src/ui/components/page/PageContentLayout.tsx'
import PageLayout from 'src/ui/components/page/PageLayout.tsx'
import BackButton from 'src/ui/components/screen-bars/parts/BackButton.tsx'
import ItemContainer from 'src/ui/0-elements/basic-elements/ItemContainer'
import {
  AccountSettingsPageValidation,
} from 'src/ui/2-pages/AccountSettings/AccountSettingsPage.validation.ts'
import { ObjectU } from 'src/util/common/ObjectU'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from 'src/mini-libs/form-data/hooks/useFormSubmit'
import { useFormToasts } from 'src/mini-libs/form-data/hooks/useFormToasts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
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
import contents = EmotionCommon.contents
import getCurrentTimeZoneName = DateU.getCurrentTimeZoneName







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
    initialValues: defaultValues,
    validators,
  })
  
  const {
    request, isLoading,
    isSuccess, isError,
    response, resetResponse,
  } = useFormApiRequest({
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
      return UserApi.update(userToUpdate, getCurrentTimeZoneName())
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
      <PageLayout col data-display-name='AccountSettingsPage'>
        <PageContentLayout colSm>
          <form css={contents} {...noFormSubmit}>
            <Flex col g={30}>
              
              <Grid cols='38px 1fr 38px' stretch>
                <Flex centerStart m={-13}><BackButton/></Flex>
                <Flex center><Hdrs.Page>{titleText.account}</Hdrs.Page></Flex>
                <Gap w={38}/>
              </Grid>
              
              
              
              
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
               value={new Date(user.createdAt) + ''}
               />
               </ItemContainer>
               
               <ItemContainer>
               <ItemLabel>{titleText.userUpdated}</ItemLabel>
               <Input
               css={InputStyle.input(
               { size: 'small', static: true }
               )}
               readOnly
               value={new Date(user.updatedAt) + ''}
               />
               </ItemContainer> */}
              
              <ItemContainer>
                <Hdrs.InputTitleBold>{titleText.userCreated}</Hdrs.InputTitleBold>
                <DataField css={DataFieldStyle.statikSmall}>
                  {new Date(user.createdAt) + ''}
                </DataField>
              </ItemContainer>
              
              <ItemContainer>
                <Hdrs.InputTitleBold>{titleText.userUpdated}</Hdrs.InputTitleBold>
                <DataField css={DataFieldStyle.statikSmall}>
                  {new Date(user.updatedAt) + ''}
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
              
            </Flex>
          </form>
        </PageContentLayout>
      </PageLayout>
      
      {/* <BottomFloatingBar settingsButton
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
AccountSettingsPage.displayName = 'AccountSettingsPage'
export default AccountSettingsPage


