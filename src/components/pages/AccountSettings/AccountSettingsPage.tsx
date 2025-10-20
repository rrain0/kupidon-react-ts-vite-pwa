import { getCurrentTimeZoneName } from '@utils/date/dateUtils.ts'
import { noFormSubmit } from '@utils/js/noFormSubmit.ts'
import React, { useCallback, useEffect } from 'react'
import { UserApi } from 'src/services/api/requests/UserApi'
import { useFormApiRequest } from '@libs/api/useFormApiRequest.ts'
import { AppRoutes } from 'src/configs/AppRoutes.ts'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import Flex from '@libs/style-as-short-props/elems/Flex.tsx'
import Gap from '@libs/style-as-short-props/elems/Gap.tsx'
import Grid from '@libs/style-as-short-props/elems/Grid.tsx'
import { Hdrs } from 'src/components/elems/basic-elements/Hdrs'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import { StatusUiText } from 'src/locales/translations/StatusUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import AppLink from 'src/components/components/app-router/AppLink.tsx'
import PageContentLayout from 'src/components/components/page/PageContentLayout.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import BackButton from 'src/components/components/screen-bars/parts/BackButton.tsx'
import ItemContainer from 'src/components/elems/basic-elements/ItemContainer'
import {
  AccountSettingsPageValidation,
} from 'src/components/pages/AccountSettings/AccountSettingsPage.validation.ts'
import { objectKeys } from '@utils/base/ObjectU'
import { useFormData } from '@libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from '@libs/form-data/hooks/useFormSubmit'
import { useFormToasts } from '@libs/form-data/hooks/useFormToasts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import DataField from 'src/components/elems/DataField/DataField'
import { DataFieldStyle } from 'src/components/elems/DataField/DataFieldStyle'
import Input from 'src/components/elems/inputs/Input/Input'
import { InputStyle } from 'src/components/elems/inputs/Input/InputStyle'
import { AuthZustand, useAuthZustand } from 'src/zustand/auth/authZustand.ts'
import FormValues = AccountSettingsPageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import userDefaultValues = AccountSettingsPageValidation.userDefaultValues
import validators = AccountSettingsPageValidation.validators
import defaultValues = AccountSettingsPageValidation.defaultValues
import mapFailureCodeToUiText = AccountSettingsPageValidation.mapFailureCodeToUiText
import RootRoute = AppRoutes.RootRoute
import contents = EmotionCommon.contents







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
      objectKeys(userDefaultValues)
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
        .length < objectKeys(userDefaultValues).length
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
      
      objectKeys(userDefaultValues).forEach(fName => {
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


