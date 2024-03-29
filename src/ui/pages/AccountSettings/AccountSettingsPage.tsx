import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/ui/widgets/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/widgets/BottomButtonBar/TopButtonBar'
import FormHeader from 'src/ui/components/FormElements/FormHeader'
import ItemContainer from 'src/ui/components/FormElements/ItemContainer'
import ItemLabel from 'src/ui/components/FormElements/ItemLabel'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { AccountSettingsUiText } from 'src/ui/pages/AccountSettings/uiText'
import { AccountSettingsPageValidation } from 'src/ui/pages/AccountSettings/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/ui/styles/EmotionCommon.ts'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { useFormFailures } from 'src/utils/form-validation/hooks/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/hooks/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/hooks/useFormToasts'
import { useUiValues } from 'src/ui/ui-text/useUiText.ts'
import { formSubmitPreventDefault } from 'src/utils/react/formSubmitPreventDefault'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import Button from 'src/ui/elements/Buttons/Button'
import { ButtonStyle } from 'src/ui/elements/Buttons/ButtonStyle'
import Card from 'src/ui/elements/cards/Card.tsx'
import DataField from 'src/ui/elements/DataField/DataField'
import { DataFieldStyle } from 'src/ui/elements/DataField/DataFieldStyle'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons'
import Input from 'src/ui/elements/inputs/Input/Input'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle'
import FloppyDisk1Ic = SvgIcons.FloppyDisk1Ic
import col = EmotionCommon.col
import FormValues = AccountSettingsPageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import userDefaultValues = AccountSettingsPageValidation.userDefaultValues
import ObjectKeys = ObjectUtils.ObjectKeys
import validators = AccountSettingsPageValidation.validators
import defaultValues = AccountSettingsPageValidation.defaultValues
import mapFailureCodeToUiText = AccountSettingsPageValidation.mapFailureCodeToUiText
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import contentBigGap = Pages.contentCenterBigGap







const AccountSettingsPage =
React.memo(
()=>{
  
  const uiText = useUiValues(AccountSettingsUiText)
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  const resetAuth = useResetRecoilState(AuthRecoil)
  
  
  const fetchUser = async() => {
    const resp = await UserApi.current()
    if (resp.isSuccess)
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    else console.warn('Failed to fetch user:', resp)
  }
  useEffect(
    ()=>void fetchUser(),
    []
  )
  
  const user = auth!.user
  
  
  
  
  
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
  } = useFormFailures({
    defaultValues, validators
  })
  
  const {
    request, isLoading,
    isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues,failedFields: (keyof FormValues)[])=>{
        const userToUpdate: UserToUpdate = {}
        ObjectKeys(userDefaultValues)
          .filter(fName=>!['pwd','repeatPwd'].includes(fName))
          .forEach(fName=>{
            if (!failedFields.includes(fName)) userToUpdate[fName] = values[fName]
          })
        if (!failedFields.includes('pwd') &&
          !failedFields.includes('repeatPwd')
        ) userToUpdate.pwd = values.pwd
        return UserApi.update(userToUpdate)
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
        let preparedFields = [...failedFields]
        if (failedFields.includes('pwd') && !failedFields.includes('repeatPwd'))
          preparedFields.push('repeatPwd')
        if (!failedFields.includes('pwd') && failedFields.includes('repeatPwd'))
          preparedFields.push('pwd')
        return preparedFields
          .filter(ff=>Object.hasOwn(userDefaultValues,ff))
          .length < ObjectKeys(userDefaultValues).length
      },
      []
    ),
    request, isLoading,
    isError, response,
    resetResponse,
  })
  
  
  
  const fieldIsInitial = useCallback(
    (field: keyof FormValues)=>{
      return failures
        .some(f=>f.type==='initial' && f.errorFields.includes(field))
    },
    [failures]
  )
  
  const updateValues = useEffectEvent((auth: AuthStateType)=>{
    setFormValues(s=>{
      const u = auth!.user
      const newValues = {...s, initialValues: {...s.initialValues}}
      //newValues.initialValues.name = u.name
      
      ObjectKeys(userDefaultValues).forEach(fName=>{
        if (fieldIsInitial(fName) && fName in u)
          newValues[fName] = u[fName] as any
      })
      return newValues
    })
  })
  useEffect(()=>updateValues(auth), [auth])
  
  const resetField = useCallback(
    (fieldName: keyof FormValues)=>{
      const vs = formValues, ivs = formValues.initialValues
      setFormValues({
        ...vs,
        [fieldName]: ivs[fieldName],
      })
    },
    [formValues, setFormValues]
  )
  
  
  
  useEffect(
    ()=>{
      if (isSuccess && response && 'data' in response){
        setAuth(s=>({
          accessToken: s?.accessToken ?? '',
          user: response.data!.user,
        }))
        const used = response.usedValues
        if ('pwd' in used){
          if (formValues.pwd===used.pwd)
            resetField('pwd')
          if (formValues.repeatPwd===used.pwd)
            resetField('repeatPwd')
        }
      }
    },
    [isSuccess, response, setAuth, formValues, resetField]
  )
  
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: AccountSettingsUiText.update,
    isSuccess,
    successText: AccountSettingsUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  /* useEffect(()=>{
    console.log('ACCOUNT_SETTINGS_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  return <>
  
    <Pages.Page0>
      <form css={contentBigGap} onSubmit={formSubmitPreventDefault}>
        
        <FormHeader>{uiText.account.text}</FormHeader>
        
        
        <Card>
          
          
          <ItemContainer>
            <ItemLabel>{uiText.id.text}</ItemLabel>
            <Input
              css={InputStyle.input(
                { size: 'small', textSize: 'smaller', static: true },
              )}
              readOnly
              value={user.id}
            />
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.email.text}</ItemLabel>
            <Input
              css={InputStyle.input(
                { size: 'small', static: true },
              )}
              readOnly
              value={user.email}
            />
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.emailVerified.text}</ItemLabel>
            <Input
              css={InputStyle.input(
                { size: 'small', static: true },
              )}
              readOnly
              value={user.emailVerified
                ? uiText.yes.text.toLowerCase()
                : uiText.no.text.toLowerCase()
              }
            />
          </ItemContainer>
          
          {/* <ItemContainer>
           <ItemLabel>{uiText.userCreated.text}</ItemLabel>
           <Input
           css={InputStyle.input(
           { size: 'small', static: true }
           )}
           readOnly
           value={new Date(user.created) + ''}
           />
           </ItemContainer>
           
           <ItemContainer>
           <ItemLabel>{uiText.userUpdated.text}</ItemLabel>
           <Input
           css={InputStyle.input(
           { size: 'small', static: true }
           )}
           readOnly
           value={new Date(user.updated) + ''}
           />
           </ItemContainer> */}
          
          <ItemContainer>
            <ItemLabel>{uiText.userCreated.text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(user.created) + ''}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.userUpdated.text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(user.updated) + ''}
            </DataField>
          </ItemContainer>
        
        
        </Card>
        
        
        <div css={notInCard}>
          <Link to={RootRoute.settings.pwdChange[full]()}>
            <Button css={ButtonStyle.bigRectAccent}>
              {uiText.changePwd.text}
            </Button>
          </Link>
        </div>
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectAccent}
            onClick={resetAuth}
          >
            {uiText.logOutFromAccount.text}
          </Button>
        </div>
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectDanger}
            onClick={undefined}
            disabled
          >
            {uiText.deleteAccount.text}
          </Button>
        </div>
    
    </form>
    
    <PageScrollbars/>
    </Pages.Page0>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn
      rightChildren={
          canSubmit && <Button css={ButtonStyle.icon}
            onClick={submit}
          >
            <FloppyDisk1Ic />
          </Button>
        }
      />
    
  </>
})
export default AccountSettingsPage






const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`