import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  defaultCarouselMergeProgress,
  getClampedCarouselProps,
  getItemIProps,
} from '@util/animated/carousel/props/defaultCarouselProps.ts'
import { createTrackPropsGetter } from '@util/animated/carousel/createTrackPropsGetter.ts'
import { useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useCssWhRef } from '@util/view/useCssWhRef.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import {
  useMediaArrayDownloader
} from 'src/ui-data/models/media/download/useMediaArrayDownloader.ts'
import { MediaInArrayDUC, MediaOperation, newDefaultMediaOperation } from 'src/ui-data/models/media/Media.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText'
import BottomFloatingBar from 'src/ui/components/screen-bars/BottomFloatingBar.tsx'
import { useProfileTab } from 'src/ui/2-pages/Profile/useProfileTab'
import Tests from 'src/ui/2-pages/Profile/Tests/Tests.tsx'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import OverflowWrapper from 'src/ui/1-widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import Preview from 'src/ui/2-pages/Profile/Preview/Preview.tsx'
import Profile from 'src/ui/2-pages/Profile/Profile/Profile.tsx'
import PageLayout from 'src/ui/components/Pages/PageLayout.tsx'
import { RangeU } from 'src/util/common/RangeU'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import {
  currentUserPhotosToProfilePhotos, profileUpdateApiRequest,
} from 'src/ui/2-pages/Profile/actions.ts'
import { ProfilePageTabHeaderContext } from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { AsyncU } from 'src/util/common/AsyncU.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { FileU } from 'src/util/file/FileU.ts'
import { useFormData } from 'src/mini-libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from 'src/mini-libs/form-data/hooks/useFormSubmit.ts'
import { useFormToasts } from 'src/mini-libs/form-data/hooks/useFormToasts.tsx'
import { useFormDerivedData } from 'src/mini-libs/form-data/hooks/useFormDerivedData.ts'
import { StageProgress } from '@util/progress/StageProgress.ts'
import { useAsyncEffect } from 'src/util/react/useAsyncEffect.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
import safePageContentPaddings = Pages.pageAddSafeInsets
import blobToDataUrl = FileU.blobToDataUrl
import fetchToBlob = FileU.fetchToBlob
import withThrottle = AsyncU.withThrottle
import mapFirstToIfFoundBy = ArrayU.mapFirstToIfFoundBy
import mapFailureCodeToUiText = ProfilePageValidation.mapFailureCodeToUiText
import validators = ProfilePageValidation.validators
import defaultValues = ProfilePageValidation.defaultValues
import FormValues = ProfilePageValidation.FormValues
import userDefaultValues = ProfilePageValidation.userDefaultValues
import ObjectKeys = ObjectU.ObjectKeys
import row = EmotionCommon.row
import col = EmotionCommon.col
import absTlwh = EmotionCommon.absTlwh
import arrOfIndices = ArrayU.arrOfIndices
import ValueOrMapper = TypeU.ValueOrMapper
import isfunction = TypeU.isfunction
import isdef = TypeU.isdef




const ProfilePage = React.memo(() => {
  const auth = useAuthZustand()
  const setAuth = useAuthZustand.setState
  
  
  
  const {
    values: formValues,
    setValues: setFormValues,
    errors: formErrors,
    setErrors: setFormErrors,
    errorFields: formErrorFields,
    formFieldWrapProps,
  } = useFormData({
    defaultValues,
    validators,
  })
  
  const {
    request,
    isLoading, isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    errorFields: formErrorFields,
    prepareAndRequest: useCallback((
      values: FormValues,
      failedFields: (keyof FormValues)[]
    ) => {
      // TODO Upload - make common upload mechanism
      // TODO Upload - add retries
      // TODO Upload - если отрубить инет во время выгрузки, то фото обратно вернуть не предлагает
      return profileUpdateApiRequest(values, failedFields, setFormValues, setAuth)
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
      return failedFields
        .filter(ff => ff in userDefaultValues)
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
    loadingText: StatusUiText.saving,
    isSuccess,
    successText: StatusUiText.saved,
    errors: formErrors,
    setErrors: setFormErrors,
    errorCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  const { formProps, valuesProps } = useFormDerivedData(
    formValues, setFormValues, userDefaultValues, formErrors
  )
  
  
  
  const u = auth.user
  useEffect(() => {
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
        
        // we needn't take conversion, because it is local
        // we needn't take upload, because it is local
        
        // get all downloads & downloaded data from same existing photos
        newValues.initialValues.photos = ArrayU.combine(
          newValues.initialValues.photos, [...s.initialValues.photos, ...s.photos],
          (initialPhoto, oldPhoto) => ({
            ...initialPhoto,
            isInited: true,
            dataUrl: oldPhoto.dataUrl,
            isReady: oldPhoto.isReady,
            download: oldPhoto.download,
          } satisfies MediaInArrayDUC),
          (a, b) => a.id === b.id && !a.isEmpty && !b.isEmpty
        )
        
        // replace remote photos by new initial photos
        newValues.photos = newValues.photos.map(photo => {
          if (photo.type === 'remote') {
            //console.log('photo',photo)
            return {
              ...newValues.initialValues.photos[photo.remoteI],
              isInited: true,
              isReady: photo.isReady,
              conversion: photo.conversion,
            } satisfies MediaInArrayDUC
          }
          return photo
        })
        
        // stop operations for discarded photos
        ArrayU.diff2(
          s.initialValues.photos,
          newValues.photos,
          (a, b) => a.id === b.id
        )
          [0]
          .forEach(diff => {
            if (diff.isRemoved) {
              diff.fromElem.download?.abort()
              diff.fromElem.conversion?.abort()
            }
          })
        ArrayU.diff2(
          s.photos,
          newValues.photos,
          (a, b) => a.id === b.id
        )
          [0]
          .forEach(diff => {
            if (diff.isRemoved) {
              diff.fromElem.download?.abort()
              diff.fromElem.conversion?.abort()
            }
          })
        
        
        return newValues
      })
    }
  }, [u])
  
  
  
  
  
  
  
  /*
   useEffect(() => {
   console.log('PROFILE_CONTENT_FAILURES',failures)
   },[failures])
   */
  
  
  // TODO доделать новый механизм загрузки и снести старый
  // todo it retries endlessly if can't obtain photos
  useAsyncEffect((lock, unlock) => {
    return
    
    
    const serverPhotos = formValues.initialValues.photos
    const photos = formValues.photos
    ;[...serverPhotos, ...photos].forEach(photo => {
      if (!photo.isEmpty && photo.type === 'remote' && !photo.isReady
        && !photo.download && !photo.conversion
        && lock(photo.remoteUrl)
      ) {
        const fetchToBlobAbortCtrl = new AbortController()
        const blobToDataUrlAbortCtrl = new AbortController()
        const abortCtrl = new AbortController()
        abortCtrl.signal.onabort = function() {
          fetchToBlobAbortCtrl.abort(this.reason)
          blobToDataUrlAbortCtrl.abort(this.reason)
        }
        const downloadStart = {
          isReady: false,
          download: { ...newDefaultMediaOperation(),
            id: photo.id,
            abort: reason => abortCtrl.abort(reason),
          },
          showDownloadProgress: true,
        } satisfies Partial<MediaInArrayDUC>
        
        setFormValues(form => ({ ...form,
          initialValues: { ...form.initialValues,
            photos: mapFirstToIfFoundBy({
              arr: form.initialValues.photos,
              filter: elem => elem.id === photo.id,
              mapper: elem => ({ ...elem, ...downloadStart }),
            }),
          },
          photos: mapFirstToIfFoundBy({
            arr: form.photos,
            filter: elem => elem.id === photo.id,
            mapper: elem => ({ ...elem, ...downloadStart }),
          }),
        }))
        
        const updatePhoto = (
          photoUpdate?: Partial<MediaInArrayDUC>,
          downloadUpdate?: Partial<MediaOperation>,
        ) => {
          setFormValues(form => ({ ...form,
            initialValues: { ...form.initialValues,
              photos: mapFirstToIfFoundBy({
                arr: form.initialValues.photos,
                filter: elem => elem.download?.id === downloadStart.download.id,
                mapper: photo => ({ ...photo,
                  ...photoUpdate,
                  ...downloadUpdate && photo.download && {
                    download: { ...photo.download, ...downloadUpdate },
                  },
                }),
              }),
            },
            photos: mapFirstToIfFoundBy({
              arr: form.photos,
              filter: elem => elem.download?.id === downloadStart.download.id,
              mapper: photo => ({ ...photo,
                ...photoUpdate,
                ...downloadUpdate && photo.download && {
                  download: { ...photo.download, ...downloadUpdate },
                },
              }),
            }),
          }))
        }
        const updatePhotoThrottled = withThrottle(
          RangeU.random(1500, 2300), updatePhoto
        )
        
        ;(async() => {
          try {
            const progress = new StageProgress(2, [90, 10])
            const onProgress = (p = 0) => {
              progress.set(p)
              //console.log('progress', photo.id, progress.value)
              updatePhotoThrottled(undefined, { progress: progress.value })
            }
            
            //console.log('start download id',photo.id)
            const blob = await fetchToBlob(photo.remoteUrl, {
              onProgress, abortCtrl: fetchToBlobAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            progress.set(0, { next: true })
            const dataUrl = await blobToDataUrl(blob, {
              onProgress, abortCtrl: blobToDataUrlAbortCtrl,
            })
            abortCtrl.signal.throwIfAborted()
            
            //console.log('completed',photo.id)
            updatePhoto({ isReady: true, download: undefined, dataUrl })
          }
          catch (ex) {
            if (abortCtrl.signal.aborted) {
              console.log('download aborted:', abortCtrl.signal.reason)
              return
            }
            // TODO notify about error
            console.log('download error', ex)
            //console.log('photo', photo)
            updatePhoto({ download: undefined, downloadError: ex })
          }
          finally {
            unlock(photo.remoteUrl)
          }
        })()
        
      }
    })
  }, [formValues.initialValues.photos])
  
  
  
  const serverPhotos = formValues.initialValues.photos
  const setServerPhotos = useCallback((valueOrMapper: ValueOrMapper<MediaInArrayDUC[] | undefined>) => {
    setFormValues(vs => {
      const photos = vs.initialValues.photos
      const newPhotos = (() => {
        if (isfunction(valueOrMapper)) return valueOrMapper(photos)
        return valueOrMapper
      })()
      if (isdef(newPhotos) && photos !== newPhotos) return {
        ...vs,
        initialValues: {
          ...vs.initialValues,
          photos: newPhotos,
        },
      }
      return vs
    })
  }, [])
  const clientPhotos = formValues.photos
  const setClientPhotos = useCallback((valueOrMapper: ValueOrMapper<MediaInArrayDUC[] | undefined>) => {
    setFormValues(vs => {
      const photos = vs.photos
      const newPhotos = (() => {
        if (isfunction(valueOrMapper)) return valueOrMapper(photos)
        return valueOrMapper
      })()
      if (isdef(newPhotos) && photos !== newPhotos) return {
        ...vs,
        photos: newPhotos,
      }
      return vs
    })
  }, [])
  
  useMediaArrayDownloader(serverPhotos, setServerPhotos)
  useMediaArrayDownloader(clientPhotos, setClientPhotos)
  
  //effectLog('photos', formValues.photos)
  //effectLog('photos[2]', formValues.photos[2])
  
  
  
  // TODO Api request - make hook
  const [needToFetchUser, setNeedToFetchUser] = useState(true)
  const [isFetchingUser, setFetchingUser] = useState(false)
  useAsyncEffect((lock, unlock) => {
    if (needToFetchUser && !isFetchingUser
      && lock(UserApi.current)
    ) {
      setNeedToFetchUser(false)
      setFetchingUser(true)
      ;(async() => {
        try {
          const resp = await UserApi.current()
          if (resp.isSuccess)
            setAuth({ user: resp.data.user })
          else
            console.warn('failed to fetch user:', resp)
        }
        finally {
          setFetchingUser(false)
          unlock(UserApi.current)
        }
      })()
    }
  }, [needToFetchUser, isFetchingUser])
  
  
  
  //console.log(canSubmit , formProps.hasChanges)
  
  
  const [_tabIdx, setTabIdx] = useProfileTab()
  const [isStable, setIsStable] = useState(true)
  
  // TODO crutch - реакт роутер слишком медленно обновляет данные, в итоге новый стейт приходит поздно
  //  и может прийти старый и переключить на предыдущую табу + не обновится ссылка на самую новую
  //  Это происходит если быстро пролистать 2 таба, а не один.
  const [tabIdx] = useState(_tabIdx)
  
  
  const itemsCnt = 3
  const viewsCnt = itemsCnt
  
  const onElemSetWh = useCssWhRef()
  const [, setItemsBoxElem, itemsBoxRef] = useElemRefGetSet<HTMLDivElement>(onElemSetWh)
  const getTrackProps = createTrackPropsGetter(itemsBoxRef)
  
  const {
    isDragging,
    getIsDragging,
    getWasDragged,
    onTrackDrag,
    
    getStartProgress,
    getStartItemProgress,
    getDeltaProgress,
    animatedDeltaProgress,
    
    animateTo,
    
    eventListeners,
  } = useCarousel({
    itemsCnt,
    viewsCnt: viewsCnt,
    getTrackProps,
    axis: 'x',
    inverted: true,
    mergeProgress: defaultCarouselMergeProgress,
    noDrag: itemsCnt <= 1,
    noLoop: true,
  })
  
  eventListeners.onStart = () => {
    setIsStable(false)
  }
  eventListeners.onFinish = ({ startP, startItemP, deltaP }) => {
    const { pos0ItemI } = getClampedCarouselProps({
      startP: startP,
      startItemP: startItemP,
      deltaP: deltaP,
      itemsCnt,
      viewsCnt,
      viewFirstI: 0,
    })
    console.log('pos0ItemI', pos0ItemI)
    setTabIdx(pos0ItemI)
    setIsStable(true)
  }
  
  useEffect(() => {
    if (isdef(tabIdx)) animateTo({
      p: getItemIProps(tabIdx).pos0P,
      noAnimation: true,
    })
  }, [tabIdx])
  
  const goToTab = useCallback((tabI: number) => {
    animateTo({ p: getItemIProps(tabI).pos0P })
  }, [])
  
  
  const animatedProps = animatedDeltaProgress.map(dp => (viewI = 0) => {
    return getClampedCarouselProps({
      startP: getStartProgress(),
      startItemP: getStartItemProgress(),
      deltaP: dp,
      itemsCnt,
      viewsCnt,
      viewFirstI: 0,
      currViewI: viewI,
    })
  })
  
  
  const titleText = useUiValues(TitleUiText)
  const headers = useMemo(() => {
    return [titleText.preview, formValues.name, 'Тесты']
  }, [titleText.preview, formValues.name])
  
  
  
  return (
    <>
      <PageLayout vp>
        <>
          <TabsBox
            ref={setItemsBoxElem}
            {...onTrackDrag()}
          >
            <>
              {arrOfIndices(viewsCnt).map(viewI => (
                <Tab
                  key={viewI}
                  /* style={{
                    backgroundColor: Colors.test[viewI],
                  }} */
                  animatedStyle={{
                    transform: animatedProps.map(ap => `translateX(${ap(viewI).viewP}%)`),
                  }}
                >
                  <AnimatedState
                    animatedState={{
                      tabI: animatedProps.map(ap => ap(viewI).viewItemI),
                    }}
                  >
                    {({ tabI }) => (
                      <>
                        {tabI === 0 && (
                          <Preview
                            key='preview'
                            formValues={formValues}
                          />
                        )}
                        
                        
                        {tabI !== 0 && (
                          <OverflowWrapper
                            css={css`
                              ${OverflowWrapperStyle.defolt};
                              
                              ${OverflowWrapperStyle.El.container.thiz()} {
                                touch-action: pan-y;
                              }
                              
                              ${OverflowWrapperStyle.El.scrollbarOverlay.thiz()} {
                                ${safePageContentPaddings};
                              }
                            `}
                            showVertical={isStable}
                          >
                            
                            <ProfilePageTabHeaderContext.Provider
                              value={{
                                getStartProgress,
                                getStartItemProgress,
                                animatedDeltaProgress,
                                headers,
                                goToTab,
                              }}
                            >
                              {[
                                undefined,
                                <Profile
                                  key='profile'
                                  formFieldWrapProps={formFieldWrapProps}
                                  onFormSubmitCallback={onSubmit}
                                  submit={submit}
                                  canSubmit={canSubmit}
                                  formProps={formProps}
                                  isLoading={isLoading}
                                  tabIdx={tabI}
                                />,
                                // <Partner
                                //   key="partner"
                                //   formFieldWrapProps={formFieldWrapProps}
                                //   onFormSubmitCallback={onFormSubmitCallback}
                                //   submit={submit}
                                //   canSubmit={canSubmit}
                                //   formProps={formProps}
                                //   isLoading={isLoading}
                                //   tabI={tabI}
                                ///>,
                                <Tests
                                  key='tests'
                                  formFieldWrapProps={formFieldWrapProps}
                                  onFormSubmitCallback={onSubmit}
                                  submit={submit}
                                  canSubmit={canSubmit}
                                  formProps={formProps}
                                  isLoading={isLoading}
                                  tabIdx={tabI}
                                />,
                              ][tabI]}
                            </ProfilePageTabHeaderContext.Provider>
                          
                          </OverflowWrapper>
                        )}
                      </>
                    )}
                  </AnimatedState>
                
                </Tab>
              ))}
            </>
          </TabsBox>
          
          
          
          {tabIdx !== 0 && (
            <BottomFloatingBar
              onCancel={formProps.hasChanges && formProps.resetUserFields || undefined}
              onAccept={canSubmit && !isLoading && submit || undefined}
            />
          )}
        
        
        </>
      </PageLayout>
    </>
  )
})
ProfilePage.displayName = 'ProfilePage'
export default ProfilePage



const TabsBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${row};
  align-items: stretch;
  overflow: hidden;
  touch-action: pan-y;
`

const Tab = styled(AnimatedDiv)`
  ${absTlwh};
  ${col};
`
