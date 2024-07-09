import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { IconButtonStyle } from 'src/ui/elements/buttons/IconButton/IconButtonStyle.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/ui/components/BottomButtonBar/TopButtonBar'
import FormHeader from 'src/ui/elements/basic-elements/Hs'
import ItemContainer from 'src/ui/elements/basic-elements/ItemContainer'
import ItemLabel from 'src/ui/elements/basic-elements/ItemLabel'
import { Pages } from 'src/ui/components/Pages/Pages'
import PageScrollbars from 'src/ui/widgets/Scrollbars/PageScrollbars'
import { AccountSettingsPageValidation } from 'src/ui/pages/AccountSettings/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { ObjectU } from 'src/util/common/ObjectU'
import { useFormFailures } from '@util/mini-libs/form-validation/hooks/useFormFailures'
import { useFormSubmit } from '@util/mini-libs/form-validation/hooks/useFormSubmit'
import { useFormToasts } from '@util/mini-libs/form-validation/hooks/useFormToasts'
import { useUiValues } from 'src/util/mini-libs/ui-text/useUiText.ts'
import { formSubmitPreventDefault } from '@util/hooks/formSubmitPreventDefault'
import { RouteBuilder } from '@util/mini-libs/route-builder/RouteBuilder'
import { useEffectEvent } from '@util/react/useEffectEvent.ts'
import Button from 'src/ui/elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/Button/ButtonStyle.ts'
import DataField from 'src/ui/elements/DataField/DataField'
import { DataFieldStyle } from 'src/ui/elements/DataField/DataFieldStyle'
import { SvgIcons } from 'src/ui/elements/icons/SvgIcons/SvgIcons.tsx'
import Input from 'src/ui/elements/inputs/Input/Input'
import { InputStyle } from 'src/ui/elements/inputs/Input/InputStyle'
import FloppyDisk1Ic = SvgIcons.FloppyDisk1Ic
import FormValues = AccountSettingsPageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import userDefaultValues = AccountSettingsPageValidation.userDefaultValues
import ObjectKeys = ObjectU.ObjectKeys
import validators = AccountSettingsPageValidation.validators
import defaultValues = AccountSettingsPageValidation.defaultValues
import mapFailureCodeToUiText = AccountSettingsPageValidation.mapFailureCodeToUiText
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full







const AccountSettingsPage =
React.memo(
() => {
  
  const titleText = useUiValues(TitleUiText)
  const actionText = useUiValues(ActionUiText)
  
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
    loadingText: StatusUiText.updating,
    isSuccess,
    successText: StatusUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  /* useEffect(()=>{
    console.log('ACCOUNT_SETTINGS_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  return <>
    <Pages.Page>
      
      
      <Pages.SafeInsets>
        <Pages.ContentForm onSubmit={formSubmitPreventDefault}>
          
          <FormHeader>{titleText.account}</FormHeader>
          
          
            
          
          <ItemContainer>
            <ItemLabel>{titleText.id}</ItemLabel>
            <Input
              css={InputStyle.outlinedRectOf({ size: 'small', textSize: 'smaller' })}
              readOnly
              value={user.id}
            />
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{titleText.email}</ItemLabel>
            <Input
              css={InputStyle.outlinedRectOf({ size: 'small' })}
              readOnly
              value={user.email}
            />
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{titleText.emailVerified}</ItemLabel>
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
            <ItemLabel>{titleText.userCreated}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(user.created) + ''}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{titleText.userUpdated}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(user.updated) + ''}
            </DataField>
          </ItemContainer>
          
          
          
          
          <Link to={RootRoute.settings.pwdChange[full]()}>
            <Button css={ButtonStyle.filledRectBigNormal}>
              {titleText.pwdChange}
            </Button>
          </Link>
          
          <Button css={ButtonStyle.filledRectBigNormal}
            onClick={resetAuth}
          >
            {actionText.logOutFromAccount}
          </Button>
        
          <Button css={ButtonStyle.filledRectBigDanger}
            onClick={undefined}
            disabled
          >
            {actionText.deleteAccount}
          </Button>
        
        </Pages.ContentForm>
      </Pages.SafeInsets>
      
      
      <PageScrollbars/>
    </Pages.Page>
    
    
    <TopButtonBar backBtn/>
    
    {/* <BottomButtonBar settingsBtn
      rightChildren={
        canSubmit && <Button css={IconButtonStyle.icon}
          onClick={submit}
        >
          <FloppyDisk1Ic />
        </Button>
      }
    /> */}
    
  </>
})
export default AccountSettingsPage


