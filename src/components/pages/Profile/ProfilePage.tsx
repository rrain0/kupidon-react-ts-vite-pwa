import AnimatedDiv from '@animated/elements/AnimatedDiv.tsx'
import AnimatedState from '@animated/elements/AnimatedState.tsx'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  defaultCarouselMergeProgress,
  getClampedCarouselProps,
  getItemIProps,
} from '@utils/animated/carousel/props/defaultCarouselProps.ts'
import { createTrackPropsGetter } from '@utils/animated/carousel/createTrackPropsGetter.ts'
import { useCarousel } from '@utils/animated/carousel/useCarousel.ts'
import { ArrayU } from '@utils/common/ArrayU.ts'
import { TypeU } from '@utils/common/TypeU.ts'
import { flexStyle } from '@utils/react/short-props/style/flexStyle.ts'
import { useCssWhRef } from '@utils/view/useCssWhRef.ts'
import { useElemRefGetSet } from '@utils/view/useElemRefGetSet.ts'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApiRequest } from '@libs/api/useApiRequest.ts'
import { useFormApiRequest } from '@libs/api/useFormApiRequest.ts'
import { userPhotosAToMedias } from 'src/models/api/UserPhotoA.ts'
import {
  useMediaArrayDownloader
} from '@libs/media/download/useMediaArrayDownloader.ts'
import { MediaInArrayDUC, MediaOperation, newDefaultMediaOperation } from '@libs/media/Media.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText'
import { pageLayoutAddSafeActionBarsPaddings } from 'src/components/components/page/PageLayoutU.ts'
import BottomFloatingBar from 'src/components/components/screen-bars/BottomFloatingBar.tsx'
import { useProfileTab } from 'src/components/pages/Profile/useProfileTab'
import Tests from 'src/components/pages/Profile/Tests/Tests.tsx'
import { StatusUiText } from 'src/locales/translations/StatusUiText.ts'
import OverflowWrapper from 'src/components/widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/components/widgets/Scrollbars/OverflowWrapperStyle.ts'
import Preview from 'src/components/pages/Profile/Preview/Preview.tsx'
import Profile from 'src/components/pages/Profile/Profile/Profile.tsx'
import PageLayout from 'src/components/components/page/PageLayout.tsx'
import { RangeU } from 'src/utils/common/RangeU'
import { useUiValues } from '@libs/ui-text/useUiText'
import { profileUpdateApiRequest } from 'src/components/pages/Profile/ProfilePage.actions.ts'
import { ProfilePageTabHeaderContext } from 'src/components/pages/Profile/ProfilePageTabHeader.tsx'
import { ProfilePageValidation } from 'src/components/pages/Profile/ProfilePage.validation.ts'
import { UserApi } from 'src/services/api/requests/UserApi.ts'
import { AsyncU } from 'src/utils/common/AsyncU.ts'
import { ObjectU } from 'src/utils/common/ObjectU.ts'
import { FileU } from 'src/utils/file/FileU.ts'
import { useFormData } from '@libs/form-data/hooks/useFormData.ts'
import { useFormSubmit } from '@libs/form-data/hooks/useFormSubmit.ts'
import { useFormToasts } from '@libs/form-data/hooks/useFormToasts.tsx'
import { useFormDerivedData } from '@libs/form-data/hooks/useFormDerivedData.ts'
import { StageProgress } from '@utils/progress/StageProgress.ts'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect.ts'
import { useAuthZustand } from 'src/zustand/auth/AuthZustand.ts'
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
        
        newValues.initialValues.photos = userPhotosAToMedias(u.photos)
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
  
  
  
  // Нужно чтобы при заходе в профиль текущий юзер обновлялся
  // Этот код также находится в useAuthSetup
  {
    const {
      startRequest,
      isLoading, isFinished, isSuccess, isError,
      data, error,
    } = useApiRequest(UserApi.current)
    
    useEffect(() => {
      startRequest()
    }, [])
    
    useEffect(() => {
      if (isSuccess) setAuth({ user: data.user })
      if (isError) console.warn('failed to fetch user:', error)
    }, [isFinished])
  }
  
  
  
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
                            photos={formValues.photos}
                            name={formValues.name}
                            birthDate={formValues.birthDate}
                            gender={formValues.gender}
                            aboutMe={formValues.aboutMe}
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
                                ${pageLayoutAddSafeActionBarsPaddings};
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




const TabsBox = styled.div(flexStyle({
  relative: true, sz: 'full',
  row: true, alignStretch: true,
  noOverflow: true, touchAction: 'pan-y',
}))


const Tab = styled(AnimatedDiv)(flexStyle({
  absTlwh: true, col: true,
}))
