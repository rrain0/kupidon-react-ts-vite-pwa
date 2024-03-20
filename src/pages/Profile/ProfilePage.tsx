/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { ApiUtils } from 'src/api/ApiUtils'
import { useApiRequest } from 'src/api/useApiRequest'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import Form from 'src/components/FormElements/Form'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import Preview from 'src/pages/Profile/Preview/Preview'
import Profile from 'src/pages/Profile/Profile/Profile'
import { useRecoilState } from 'recoil'
import {
  currentUserPhotosToProfilePhotos,profileUpdateApiRequest,
} from 'src/pages/Profile/ProfilePageParts'
import ProfilePageTabHeader, { ProfilePageTabHeaderContext } from 'src/pages/Profile/ProfilePageTabHeader'
import {
  DefaultOperation,
  ProfilePhoto,
} from 'src/pages/Profile/ProfilePhotoModels'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { AsyncUtils } from 'src/utils/common/AsyncUtils'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { FileUtils } from 'src/utils/file/FileUtils'
import { useFormFailures } from 'src/utils/form-validation/hooks/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/hooks/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/hooks/useFormToasts'
import { useFormValuesProps } from 'src/utils/form-validation/hooks/useFormValuesProps'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { Progress } from 'src/utils/Progress'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabsState } from 'src/views/Tabs/useTabs'
import UseTabsState from 'src/views/Tabs/UseTabsState'
import TabsPage = Pages.TabsPage
import safePageContentPaddings = Pages.safePageContentPaddings
import fill = EmotionCommon.fill
import blobToDataUrl = FileUtils.blobToDataUrl
import fetchToBlob = FileUtils.fetchToBlob
import mapRange = MathUtils.mapRange
import throttle = AsyncUtils.throttle
import mapFirstToIfFoundBy = ArrayUtils.mapFirstToIfFoundBy
import mapFailureCodeToUiText = ProfilePageValidation.mapFailureCodeToUiText
import validators = ProfilePageValidation.validators
import defaultValues = ProfilePageValidation.defaultValues
import FormValues = ProfilePageValidation.FormValues
import userDefaultValues = ProfilePageValidation.userDefaultValues
import ObjectKeys = ObjectUtils.ObjectKeys
import PageContentPaddings = Pages.PageContentPaddings
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn











const ProfilePage =
React.memo(
()=>{
  
  
  
  
  
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  
  
  
  
  
  
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
  } = useFormFailures({
    defaultValues, validators
  })
  
  const {
    request,
    isLoading, isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues, failedFields: (keyof FormValues)[])=>
        profileUpdateApiRequest(values,failedFields,setFormValues,setAuth),
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
          .length < ObjectKeys(userDefaultValues).length
      },
      []
    ),
    request, isLoading, isError,
    response, resetResponse,
  })
  
  
  
  const { formProps, valuesProps } = useFormValuesProps(
    formValues, setFormValues, userDefaultValues, failures
  )
  
  
  
  useEffect(
    ()=>{
      const u = auth?.user
      if (u) {
        setFormValues(s => {
          const newValues = { ...s, initialValues: { ...s.initialValues } }
          newValues.initialValues.name = u.name
          newValues.initialValues.birthDate = u.birthDate
          newValues.initialValues.gender = u.gender
          newValues.initialValues.aboutMe = u.aboutMe
          
          if (valuesProps.name.isInitial) newValues.name = u.name
          if (valuesProps.birthDate.isInitial) newValues.birthDate = u.birthDate
          if (valuesProps.gender.isInitial) newValues.gender = u.gender
          if (valuesProps.aboutMe.isInitial) newValues.aboutMe = u.aboutMe
          
          newValues.initialValues.photos = currentUserPhotosToProfilePhotos(u.photos)
          newValues.photos = [...s.photos]
          
          // we needn't take compression, because it is local
          // we needn't take upload, because it is local
          
          // get all downloads & downloaded data from same existing photos
          newValues.initialValues.photos = ArrayUtils.combine(
            newValues.initialValues.photos, [...s.initialValues.photos, ...s.photos],
            (initialPhoto, oldPhoto)=>({
              ...initialPhoto,
              dataUrl: oldPhoto.dataUrl,
              isReady: oldPhoto.isReady,
              download: oldPhoto.download,
            } satisfies ProfilePhoto),
            (a,b)=>a.id===b.id && !a.isEmpty && !b.isEmpty
          )
          
          // replace remote photos by new initial photos
          newValues.photos = newValues.photos.map(photo => {
            if (photo.type === 'remote') {
              //console.log('photo',photo)
              return {
                ...newValues.initialValues.photos[photo.remoteIndex],
                isReady: photo.isReady,
                compression: photo.compression,
              } satisfies ProfilePhoto
            }
            return photo
          })
          
          // stop operations for discarded photos
          ArrayUtils.diff2
          (s.initialValues.photos, newValues.photos, (a,b)=>a.id===b.id)[0]
            .forEach(diff => {
              if (diff.isRemoved){
                diff.fromElem.download?.abort()
                diff.fromElem.compression?.abort()
              }
            })
          ArrayUtils.diff2
          (s.photos, newValues.photos, (a,b)=>a.id===b.id)[0]
            .forEach(diff => {
              if (diff.isRemoved){
                diff.fromElem.download?.abort()
                diff.fromElem.compression?.abort()
              }
            })
          
          
          return newValues
        })
      }
    },
    [auth]
  )
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: ActionUiText.saving,
    isSuccess,
    successText: ActionUiText.saved,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  
  /*
   useEffect(()=>{
   console.log('PROFILE_CONTENT_FAILURES',failures)
   },[failures])
   */
  
  
  // todo it retries endlessly if can't obtain photos
  useAsyncEffect(
    (lock,unlock)=>{
      //return;
      const serverPhotos = formValues.initialValues.photos
      const photos = formValues.photos
      ;[...serverPhotos,...photos].forEach(photo=>{
        if (!photo.isEmpty && photo.type==='remote' && !photo.isReady
          && !photo.download && !photo.compression
          && lock(photo.remoteUrl)
        ){
          
          const abortCtrl = new AbortController()
          const downloadStart = {
            isReady: false,
            download: { ...DefaultOperation,
              id: photo.id,
              abort: ()=>{
                console.log('download was aborted')
                unlock(photo.remoteUrl)
                abortCtrl.abort('download was aborted')
              },
            },
          } satisfies Partial<ProfilePhoto>
          
          setFormValues(s=>({ ...s,
            initialValues: { ...s.initialValues,
              photos: mapFirstToIfFoundBy(s.initialValues.photos,
                elem=>({...elem, ...downloadStart}),
                elem=>elem.id===photo.id
              ),
            },
            photos: mapFirstToIfFoundBy(s.photos,
              elem=>({...elem, ...downloadStart}),
              elem=>elem.id===photo.id
            ),
          }))
          
          const updatePhotosNow = (p: Partial<ProfilePhoto>)=>{
            setFormValues(s=>({ ...s,
              initialValues: { ...s.initialValues,
                photos: mapFirstToIfFoundBy(s.initialValues.photos,
                  elem=>({...elem, ...p}),
                  elem=>elem.download?.id===downloadStart.download.id
                ),
              },
              photos: mapFirstToIfFoundBy(s.photos,
                elem=>({...elem, ...p}),
                elem=>elem.download?.id===downloadStart.download.id
              ),
            }))
          }
          const updatePhotos = throttle(
              mapRange(Math.random(),[0,1],[1450,2000]),
              updatePhotosNow
            )
          
          ;(async()=>{
            try {
              const progress = new Progress(2,[90,10])
              const onProgress = (p: number|null)=>{
                progress.progress = p??0
                //console.log('progress', photo.id, progress.value)
                updatePhotos({ download: {
                    ...downloadStart.download,
                    progress: progress.value,
                  } })
              }
              
              //console.log('start download id',photo.id)
              const blob = await fetchToBlob(photo.remoteUrl,
                { onProgress, abortCtrl }
              )
              abortCtrl.signal.throwIfAborted()
              
              progress.stage++
              progress.progress = 0
              const dataUrl = await blobToDataUrl(blob,
                { onProgress, abortCtrl }
              )
              abortCtrl.signal.throwIfAborted()
              
              //console.log('completed',photo.id)
              updatePhotosNow({ isReady: true, download: undefined, dataUrl })
            }
            catch (ex){
              // TODO notify about error
              //console.log('download error', ex)
              //console.log('photo', photo)
              updatePhotosNow({ download: undefined })
            }
            finally {
              unlock(photo.remoteUrl)
            }
          })()
          
        }
      })
    },
    [formValues.initialValues.photos]
  )
  
  
  
  
  
  
  
  
  
  
  
  const [needToFetchUser, setNeedToFetchUser] = useState(true)
  const [isFetchingUser, setFetchingUser] = useState(false)
  useAsyncEffect(
    (lock,unlock)=>{
      if (needToFetchUser && !isFetchingUser
        && lock(UserApi.current)
      ){
        setNeedToFetchUser(false)
        setFetchingUser(true)
        ;(async()=>{
          try {
            const resp = await UserApi.current()
            if (resp.isSuccess)
              setAuth(curr=>({ ...curr!, user: resp.data.user }))
            else
              console.warn('failed to fetch user:', resp)
          }
          finally {
            setFetchingUser(false)
            unlock(UserApi.current)
          }
        })()
      }
    },
    [needToFetchUser, isFetchingUser]
  )
  
  
  
  
  return <>
    <TabsPage>
      
      <UseTabsState initialIdx={1}>{tabsProps=><>
        <Tabs css={fill} {...tabsProps}>{({ tabContainerSpring, computedTabsDimens }) => <>
          {ArrayUtils.ofIndices(4).map(tabIdx =>
            <Tab css={fill} key={tabIdx}
              width={computedTabsDimens.frameWidth}
            >
              
              
            <OverflowWrapper css={css`
              ${OverflowWrapperStyle.defolt};
              ${OverflowWrapperStyle.El.container.thiz()}{
                touch-action: pan-y;
              }
              ${OverflowWrapperStyle.El.scrollbarOverlay.thiz()}{
                ${safePageContentPaddings};
              }
            `}
              showVertical={!(['dragging', 'snapping'] as TabsState[]).includes(tabsProps.tabsState)}
            >
                  
              <ProfilePageTabHeaderContext.Provider value={{
                tabContainerSpring,
                tabWidth: computedTabsDimens.frameWidth,
                headers: ['Предпросмотр', formValues.name, 'Партнёр', 'Свидание'],
                setTabsState: tabsProps.setTabsState,
                setTabIdx: tabsProps.setTabIdx,
              }}>
              {function(){
                switch (tabIdx) {
                  case 0:
                    return <Preview formValues={formValues}/>
                  case 1:
                    return <Profile
                      validationProps={validationProps}
                      onFormSubmitCallback={onFormSubmitCallback}
                      submit={submit}
                      canSubmit={canSubmit}
                      formProps={formProps}
                      isLoading={isLoading}
                    />
                  case 2:
                    return <PageContentPaddings>
                      <Form><ProfilePageTabHeader thisTabIdx={2}/></Form>
                    </PageContentPaddings>
                  case 3:
                    return <PageContentPaddings>
                      <Form><ProfilePageTabHeader thisTabIdx={3}/></Form>
                    </PageContentPaddings>
                }
              }()}
              </ProfilePageTabHeaderContext.Provider>
              
            </OverflowWrapper>
            
            
            </Tab>
          )}
        </>}</Tabs>
      
      
      
        { process.env.NODE_ENV==='development' && tabsProps.tabIdx===1 && <BottomButtonBar
          refreshPageBtn
          rightChildren={
            <SoftRefreshBtn
              refresh={()=>setNeedToFetchUser(true)}
              isLoading={isFetchingUser}
            />
          }
        /> }
        
        {/* { tabsProps.tabIdx!==0 && <TopButtonBar css={t=>css`
          align-items: center;
          background: ${t.page.bgcGradient[0]}ee;
        `}
          leftChildren={
            <div css={css`${Txt.normal1};`}>Предпросмотр</div>
          }
        >
          <Global styles={css`
            :root{
              //--bottom-second-bar-height: 70px;
              //--bottom-button-bar-height: 70px;
              --top-button-bar-height: 50px;
            }
          `}/>
           <DotsFrame>
            <Dot css={t=>[
              tabsProps.tabIdx===1 && dotActive(t),
            ]}/>
            <Dot css={t=>[
              tabsProps.tabIdx===2 && dotActive(t),
            ]}/>
            <Dot css={t=>[
              tabsProps.tabIdx===3 && dotActive(t),
            ]}/>
          </DotsFrame>
        </TopButtonBar>} */}
      
      </>}</UseTabsState>
      
    </TabsPage>
    
    
    
    
    
    
  
  </>
})
export default ProfilePage



