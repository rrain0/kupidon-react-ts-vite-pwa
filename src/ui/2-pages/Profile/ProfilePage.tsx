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
import { CarouselEventCallback, useCarousel } from '@util/animated/carousel/useCarousel.ts'
import { TypeU } from '@util/common/TypeU.ts'
import { useCssWhRef } from '@util/view/useCssWhRef.ts'
import { useElemRefGetSet } from '@util/view/useElemRefGetSet.ts'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApiRequest } from 'src/api/useApiRequest.ts'
import { MediaOperation, newDefaultMediaOperation } from 'src/ui-data/models/Media.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText'
import LeftBottomButtonBar from 'src/ui/1-widgets/LeftBottomButtonBar/LeftBottomButtonBar'
import { useProfileTab } from 'src/ui/2-pages/Profile/useProfileTab'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import Tests from 'src/ui/2-pages/Profile/Tests/Tests.tsx'
import { StatusUiText } from 'src/ui-data/translations/StatusUiText.ts'
import BottomButtonBar from 'src/ui/components/BottomButtonBar/BottomButtonBar.tsx'
import { ButtonBarComponents } from 'src/ui/components/BottomButtonBar/components.tsx'
import OverflowWrapper from 'src/ui/1-widgets/Scrollbars/OverflowWrapper.tsx'
import { OverflowWrapperStyle } from 'src/ui/1-widgets/Scrollbars/OverflowWrapperStyle.ts'
import Preview from 'src/ui/2-pages/Profile/Preview/Preview.tsx'
import Profile from 'src/ui/2-pages/Profile/Profile/Profile.tsx'
import { RangeU } from 'src/util/common/RangeU'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText'
import {
  currentUserPhotosToProfilePhotos, profileUpdateApiRequest,
} from 'src/ui/2-pages/Profile/actions.ts'
import { ProfilePageTabHeaderContext } from 'src/ui/2-pages/Profile/ProfilePageTabHeader.tsx'
import {
  ProfilePhoto,
} from 'src/ui/2-pages/Profile/ProfilePage.model.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { UserApi } from 'src/api/requests/UserApi.ts'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { AsyncU } from 'src/util/common/AsyncU.ts'
import { ObjectU } from 'src/util/common/ObjectU.ts'
import { FileU } from 'src/util/file/FileU.ts'
import { useFormFailures } from 'src/mini-libs/form-validation/hooks/useFormFailures.ts'
import { useFormSubmit } from 'src/mini-libs/form-validation/hooks/useFormSubmit.ts'
import { useFormToasts } from 'src/mini-libs/form-validation/hooks/useFormToasts.tsx'
import { useFormValuesProps } from 'src/mini-libs/form-validation/hooks/useFormValuesProps.ts'
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
import abs = EmotionCommon.abs
import arrOfIndices = ArrayU.arrOfIndices
import exists = TypeU.exists




const ProfilePage = React.memo(() => {
  const auth = useAuthZustand()
  const setAuth = useAuthZustand.setState
  
  
  
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
    prepareAndRequest: useCallback((
      values: FormValues,
      failedFields: (keyof FormValues)[]
    ) => {
      return profileUpdateApiRequest(values, failedFields, setFormValues, setAuth)
    }, []),
  })
  
  const {
    canSubmit, onFormSubmitCallback, submit,
  } = useFormSubmit({
    failures,
    setFailures,
    failedFields,
    setFormValues,
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
  
  
  
  const { formProps, valuesProps } = useFormValuesProps(
    formValues, setFormValues, userDefaultValues, failures
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
        
        // we needn't take compression, because it is local
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
          } satisfies ProfilePhoto),
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
  }, [u])
  
  
  
  
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
  useAsyncEffect((lock, unlock) => {
    //return;
    const serverPhotos = formValues.initialValues.photos
    const photos = formValues.photos
    ;[...serverPhotos, ...photos].forEach(photo => {
      if (!photo.isEmpty && photo.type === 'remote' && !photo.isReady
        && !photo.download && !photo.compression
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
            showProgress: true,
            abort: reason => abortCtrl.abort(reason),
          },
        } satisfies Partial<ProfilePhoto>
        
        setFormValues(form => ({ ...form,
          initialValues: { ...form.initialValues,
            photos: mapFirstToIfFoundBy(form.initialValues.photos,
              elem => ({ ...elem, ...downloadStart }),
              elem => elem.id === photo.id
            ),
          },
          photos: mapFirstToIfFoundBy(form.photos,
            elem => ({ ...elem, ...downloadStart }),
            elem => elem.id === photo.id
          ),
        }))
        
        const updatePhoto = (
          photoUpdate?: Partial<ProfilePhoto>,
          downloadUpdate?: Partial<MediaOperation>,
        ) => {
          setFormValues(form => ({ ...form,
            initialValues: { ...form.initialValues,
              photos: mapFirstToIfFoundBy(form.initialValues.photos,
                photo => ({ ...photo,
                  ...photoUpdate,
                  ...downloadUpdate && photo.download && {
                    download: { ...photo.download, ...downloadUpdate },
                  },
                }),
                elem => elem.download?.id === downloadStart.download.id
              ),
            },
            photos: mapFirstToIfFoundBy(form.photos,
              photo => ({ ...photo,
                ...photoUpdate,
                ...downloadUpdate && photo.download && {
                  download: { ...photo.download, ...downloadUpdate },
                },
              }),
              elem => elem.download?.id === downloadStart.download.id
            ),
          }))
        }
        const updatePhotoThrottled = withThrottle(
          RangeU.random(1500, 2300), updatePhoto
        )
        
        ;(async() => {
          try {
            const progress = new StageProgress(2, [90, 10])
            const onProgress = (p: number | null) => {
              progress.progress = p ?? 0
              //console.log('progress', photo.id, progress.value)
              updatePhotoThrottled(undefined, { progress: progress.value })
            }
            
            //console.log('start download id',photo.id)
            const blob = await fetchToBlob(photo.remoteUrl,
              { onProgress, abortCtrl: fetchToBlobAbortCtrl }
            )
            abortCtrl.signal.throwIfAborted()
            
            progress.stage++
            progress.progress = 0
            const dataUrl = await blobToDataUrl(blob,
              { onProgress, abortCtrl: blobToDataUrlAbortCtrl }
            )
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
  
  
  
  
  const [needToFetchUser, setNeedToFetchUser] = useState(true)
  const [isFetchingUser, setFetchingUser] = useState(false)
  // TODO make usual effect
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
  
  
  const [tabIdx, setTabIdx] = useProfileTab()
  const [isStable, setIsStable] = useState(true)
  
  
  const itemsCnt = 3
  const viewsCnt = itemsCnt
  
  const onElemSetWh = useCssWhRef()
  const [, setItemsBoxElem, itemsBoxRef] = useElemRefGetSet<HTMLDivElement>(null, onElemSetWh)
  const getTrackProps = createTrackPropsGetter(itemsBoxRef)
  
  const onStart: CarouselEventCallback = () => {
    setIsStable(false)
  }
  const onFinish: CarouselEventCallback = ({ startP, startItemP, deltaP }) => {
    const { pos0ItemI } = getClampedCarouselProps({
      startP: startP,
      startItemP: startItemP,
      deltaP: deltaP,
      itemsCnt,
      viewsCnt,
      startViewI: 0,
    })
    setTabIdx(pos0ItemI)
    setIsStable(true)
  }
  
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
  } = useCarousel({
    itemsCnt,
    viewsCnt: viewsCnt,
    getTrackProps,
    axis: 'x',
    inverted: true,
    mergeProgress: defaultCarouselMergeProgress,
    noDrag: itemsCnt <= 1,
    noLoop: true,
    onStart,
    onFinish,
  })
  
  useEffect(() => {
    if (exists(tabIdx)) animateTo({
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
      startViewI: 0,
      currViewI: viewI,
    })
  })
  
  
  const titleText = useUiValues(TitleUiText)
  const headers = useMemo(() => {
    return [titleText.preview, formValues.name, 'Тесты']
  }, [titleText.preview, formValues.name])
  
  
  
  return (
    <>
      <Pages.FullscreenPageGrad>
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
                    transform: animatedProps.map(ap => {
                      const { viewP } = ap(viewI)
                      return `translateX(${viewP}%)`
                    }),
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
                            key="preview"
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
                                  key="profile"
                                  validationProps={validationProps}
                                  onFormSubmitCallback={onFormSubmitCallback}
                                  submit={submit}
                                  canSubmit={canSubmit}
                                  formProps={formProps}
                                  isLoading={isLoading}
                                  tabIdx={tabI}
                                />,
                                // <Partner
                                //   key="partner"
                                //   validationProps={validationProps}
                                //   onFormSubmitCallback={onFormSubmitCallback}
                                //   submit={submit}
                                //   canSubmit={canSubmit}
                                //   formProps={formProps}
                                //   isLoading={isLoading}
                                //   tabI={tabI}
                                // />,
                                <Tests
                                  key="tests"
                                  validationProps={validationProps}
                                  onFormSubmitCallback={onFormSubmitCallback}
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
          
          
          
          {tabIdx !== 0 && (canSubmit || formProps.hasChanges) && (
            <LeftBottomButtonBar
              onCancel={formProps.hasChanges && formProps.resetUserFields || undefined}
              onAccept={canSubmit && !isLoading && submit || undefined}
            />
          )}
        
          {/* <UseBottomSheetState
            //isOpen={canSubmit || formProps.hasChanges}
            //closeable={!(canSubmit || formProps.hasChanges)}
          >
            {props => <ModalPortal><BottomSheetBasic
              bgDim={false}
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
        
        </>
      </Pages.FullscreenPageGrad>
    </>
  )
})
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
  ${abs};
  ${col};
`
