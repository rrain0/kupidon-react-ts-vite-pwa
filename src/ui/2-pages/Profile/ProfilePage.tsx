import { css } from '@emotion/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import Date from 'src/ui/2-pages/Profile/Date/Date.tsx'
import Partner from 'src/ui/2-pages/Profile/Partner/Partner.tsx'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { ButtonBarComponents } from 'src/ui/components/BottomButtonBar/components.tsx'
import OverflowWrapper from 'src/ui/1-widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import Preview from 'src/ui/2-pages/Profile/Preview/Preview.tsx'
import Profile from 'src/ui/2-pages/Profile/Profile/Profile.tsx'
import { useRecoilState, useRecoilValue } from 'recoil'
import { RangeU } from 'src/util/common/RangeU'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import {
  currentUserPhotosToProfilePhotos, profileUpdateApiRequest,
} from 'src/ui/2-pages/Profile/actions.ts'
import { ProfilePageTabHeaderContext } from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import {
  DefaultOperation,
  ProfilePhoto,
} from 'src/ui/2-pages/Profile/ProfilePhotoModels.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { AsyncU } from 'src/util/common/AsyncU.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { FileU } from 'src/util/file/FileU.ts'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures.ts'
import { useFormSubmit } from 'src/mini-libs/form-validation/hooks/useFormSubmit.ts'
import { useFormToasts } from 'src/mini-libs/form-validation/hooks/useFormToasts.tsx'
import { useFormValuesProps } from 'src/mini-libs/form-validation/hooks/useFormValuesProps.ts'
import { Progress } from 'src/util/Progress.ts'
import { useAsyncEffect } from 'src/util/react/useAsyncEffect.ts'
import Tab from 'src/ui/components/Tabs/Tab.tsx'
import Tabs from 'src/ui/components/Tabs/Tabs.tsx'
import { TabsState } from 'src/ui/components/Tabs/useTabs.ts'
import UseTabsState from 'src/ui/components/Tabs/UseTabsState.tsx'
import safePageContentPaddings = Pages.safeInsets
import fill = EmotionCommon.fill
import blobToDataUrl = FileU.blobToDataUrl
import fetchToBlob = FileU.fetchToBlob
import throttle = AsyncU.throttle
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import mapFailureCodeToUiText = ProfilePageValidation.mapFailureCodeToUiText
import validators = ProfilePageValidation.validators
import defaultValues = ProfilePageValidation.defaultValues
import FormValues = ProfilePageValidation.FormValues
import userDefaultValues = ProfilePageValidation.userDefaultValues
import ObjectKeys = ObjectU.ObjectKeys
import arr = ArrayU.arrOfIndices




const ProfilePage =
React.memo(
() => {
  
  const app = useRecoilValue(AppRecoil)
  const [auth, setAuth] = useRecoilState(AuthRecoil)
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
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
    prepareAndRequest: useCallback(
      (values: FormValues, failedFields: (keyof FormValues)[]) =>
        profileUpdateApiRequest(values, failedFields, setFormValues, setAuth),
      []
    ),
  })
  
  const {
    canSubmit, onFormSubmitCallback, submit,
  } = useFormSubmit({
    failures,
    setFailures,
    failedFields,
    setFormValues,
    getCanSubmit: useCallback(
      (failedFields: (keyof FormValues)[]) => {
        return failedFields
          .filter(ff => ff in userDefaultValues)
          .length < ObjectKeys(userDefaultValues).length
      },
      []
    ),
    request,
    isLoading,
    isError,
    response,
    resetResponse,
  })
  
  
  
  const { formProps, valuesProps } = useFormValuesProps(
    formValues, setFormValues, userDefaultValues, failures
  )
  
  
  
  useEffect(
    () => {
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
          newValues.initialValues.photos = ArrayU.combine(
            newValues.initialValues.photos, [...s.initialValues.photos, ...s.photos],
            (initialPhoto, oldPhoto) => ({
              ...initialPhoto,
              dataUrl: oldPhoto.dataUrl,
              isReady: oldPhoto.isReady,
              download: oldPhoto.download,
            } satisfies ProfilePhoto),
            (a, b) => a.id===b.id && !a.isEmpty && !b.isEmpty
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
          ArrayU.diff2(
            s.initialValues.photos,
            newValues.photos,
            (a, b) => a.id === b.id
          )
            // eslint-disable-next-line no-unexpected-multiline
            [0]
            .forEach(diff => {
              if (diff.isRemoved) {
                diff.fromElem.download?.abort()
                diff.fromElem.compression?.abort()
              }
            })
          ArrayU.diff2(
            s.photos,
            newValues.photos,
            (a, b) => a.id === b.id
          )
            // eslint-disable-next-line no-unexpected-multiline
            [0]
            .forEach(diff => {
              if (diff.isRemoved) {
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
    loadingText: StatusUiText.saving,
    isSuccess,
    successText: StatusUiText.saved,
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
    (lock, unlock) => {
      //return;
      const serverPhotos = formValues.initialValues.photos
      const photos = formValues.photos
      ;[...serverPhotos, ...photos].forEach(photo => {
        if (!photo.isEmpty && photo.type==='remote' && !photo.isReady
          && !photo.download && !photo.compression
          && lock(photo.remoteUrl)
        ) {
          
          const abortCtrl = new AbortController()
          const downloadStart = {
            isReady: false,
            download: { ...DefaultOperation,
              id: photo.id,
              abort: () => {
                console.log('download was aborted')
                unlock(photo.remoteUrl)
                abortCtrl.abort('download was aborted')
              },
            },
          } satisfies Partial<ProfilePhoto>
          
          setFormValues(s => ({ ...s,
            initialValues: { ...s.initialValues,
              photos: mapFirstToIfFoundBy(s.initialValues.photos,
                elem => ({ ...elem, ...downloadStart }),
                elem => elem.id===photo.id
              ),
            },
            photos: mapFirstToIfFoundBy(s.photos,
              elem => ({ ...elem, ...downloadStart }),
              elem => elem.id===photo.id
            ),
          }))
          
          const updatePhotosNow = (p: Partial<ProfilePhoto>) => {
            setFormValues(s => ({ ...s,
              initialValues: { ...s.initialValues,
                photos: mapFirstToIfFoundBy(s.initialValues.photos,
                  elem => ({ ...elem, ...p }),
                  elem => elem.download?.id===downloadStart.download.id
                ),
              },
              photos: mapFirstToIfFoundBy(s.photos,
                elem => ({ ...elem, ...p }),
                elem => elem.download?.id===downloadStart.download.id
              ),
            }))
          }
          const updatePhotos = throttle(
            RangeU.map(Math.random(), [0, 1], [1450, 2000]),
            updatePhotosNow
          )
          
          ;(async() => {
            try {
              const progress = new Progress(2, [90, 10])
              const onProgress = (p: number | null) => {
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
            catch (ex) {
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
    (lock, unlock) => {
      if (needToFetchUser && !isFetchingUser
        && lock(UserApi.current)
      ) {
        setNeedToFetchUser(false)
        setFetchingUser(true)
        ;(async() => {
          try {
            const resp = await UserApi.current()
            if (resp.isSuccess)
              setAuth(curr => ({ ...curr!, user: resp.data.user }))
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
  
  
  
  //console.log(canSubmit , formProps.hasChanges)
  
  
  const [tabIdx, setTabIdx] = useState(1)
  useEffect(() => {
    enum ProfileTabs { 'preview', 'profile', 'partner', 'date' }
    console.log('current profile tab:', ProfileTabs[tabIdx])
  }, [tabIdx])
  
  
  
  
  const titleText = useUiValues(TitleUiText)
  const headers = useMemo(() => {
    return [titleText.preview, formValues.name, titleText.date]
  }, [titleText, formValues.name])
  
  
  
  return <>
    <Pages.TabsPage>
      
      <UseTabsState idx={tabIdx} setIdx={setTabIdx}>
        {tabsProps => <>
          <Tabs css={fill} {...tabsProps}>
            {({ tabContainerSpring, computedTabsDimens }) => <>
              {arr(3).map(tabIdx =>
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
                      headers: headers,
                      setTabsState: tabsProps.setTabsState,
                      setTabIdx: tabsProps.setTabIdx,
                    }}>
                      {[
                        <Preview
                          formValues={formValues}
                        />,
                        <Profile
                          validationProps={validationProps}
                          onFormSubmitCallback={onFormSubmitCallback}
                          submit={submit}
                          canSubmit={canSubmit}
                          formProps={formProps}
                          isLoading={isLoading}
                          tabIdx={tabIdx}
                        />,
                        /* <Partner
                          validationProps={validationProps}
                          onFormSubmitCallback={onFormSubmitCallback}
                          submit={submit}
                          canSubmit={canSubmit}
                          formProps={formProps}
                          isLoading={isLoading}
                          tabIdx={tabIdx}
                        />, */
                        <Date
                          validationProps={validationProps}
                          onFormSubmitCallback={onFormSubmitCallback}
                          submit={submit}
                          canSubmit={canSubmit}
                          formProps={formProps}
                          isLoading={isLoading}
                          tabIdx={tabIdx}
                        />,
                      ][tabIdx]}
                    </ProfilePageTabHeaderContext.Provider>
                    
                  </OverflowWrapper>
                
                
                </Tab>
              )}
            </>}
          </Tabs>
        
        
        
        {/* <UseBottomSheetState
          //isOpen={canSubmit || formProps.hasChanges}
          //closeable={!(canSubmit || formProps.hasChanges)}
        >
          {props => <ModalPortal><BottomSheetBasic
            {...props.sheetProps}
          >
          
          </BottomSheetBasic></ModalPortal>}
        </UseBottomSheetState>
      
      
        { app.showDevOverlay && <BottomButtonBar
          refreshPageBtn
          rightChildren={
            <SoftRefreshBtn
              refresh={()=>setNeedToFetchUser(true)}
              isLoading={isFetchingUser}
            />
          }
        /> } */}
      
      </>}</UseTabsState>
      
    </Pages.TabsPage>
    
    
    
  </>
})
export default ProfilePage



