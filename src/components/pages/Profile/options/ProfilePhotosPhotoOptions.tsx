import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  MediaInArrayDUC,
  newDefaultEmptyLocalMediaInArray,
} from '@libs/media/Media.ts'
import Contents from '@libs/short-propsed/components/Contents.tsx'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import ArrowRefreshCwIc from 'src/components/elems/icons/SvgIcons/pack/ui/ArrowRefreshCwIc.tsx'
import DownloadIc from 'src/components/elems/icons/SvgIcons/pack/ui/DownloadIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import { BottomSheetBasicS6 } from 'src/components/widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import React from 'react'
import Dropzone from 'react-dropzone'
import ModalPortal from 'src/components/components/modal/ModalPortal.tsx'
import UseBottomSheetState from 'src/components/widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/components/widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import { ActionUiText } from 'src/locales/translations/ActionUiText.ts'
import * as uuid from 'uuid'
import { Cb } from '@utils/base/tsUtils.ts'
import CrossInCircleIc from 'src/components/elems/icons/SvgIcons/pack/ui/CrossInCircleIc.tsx'
import col = EmotionCommon.col
import row = EmotionCommon.row
import { SetterOrUpdater } from '@utils/base/tsUtils.ts'
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH
import { Cb1 } from '@utils/base/tsUtils.ts'
import { AppWidgetStyle } from '@libs/widget-style-6/WidgetStyle'



export const ProfilePhotosPhotoOptionsOverlayName = 'photoOptions'


export type ProfilePhotosPhotoOptionsProps = {
  isOpen: boolean
  close: Cb
  images: MediaInArrayDUC[]
  setImages: SetterOrUpdater<MediaInArrayDUC[]>
  lastIdx: number
  onFilesSelected: Cb1<File[]>
}


const ProfilePhotosPhotoOptions = React.memo((props: ProfilePhotosPhotoOptionsProps) => {
  const { isOpen, close, images, setImages, lastIdx, onFilesSelected } = props
  
  const actionText = useUiValues(ActionUiText)
  
  return (
    <UseBottomSheetState isOpen={isOpen} onClose={close}>
      { sheet => (
        <ModalPortal>
          <BottomSheetBasic
            css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.bottom.sheet.full.normal)}
            {...sheet.sheetProps}
          >
            <OptionsContent>
              
              
              <Button css={ButtonS6.t(ButtonS6.S.text.rect.lg.normal)}
                onClick={() => {
                  const im = images[lastIdx]
                  im.download?.abort()
                  im.conversion?.abort()
                  const newImages = [...images]
                  newImages[lastIdx] = {
                    ...newDefaultEmptyLocalMediaInArray(newImages[lastIdx].remoteI),
                    id: uuid.v4(),
                  }
                  setImages(newImages)
                  sheet.setClosing()
                }}
              >
                <OptionContainer>
                  <div css={optionIconBoxStyle}>
                    <CrossInCircleIc css={SvgIconS6.t(crossS)}/>
                  </div>
                  <OptionTitle>{actionText.remove}</OptionTitle>
                </OptionContainer>
              </Button>
              
              
              <Button css={ButtonS6.t(ButtonS6.S.text.rect.lg.normal)}
                onClick={() => {
                  setImages(images.map(im => {
                    im.download?.abort()
                    im.conversion?.abort()
                    return {
                      ...newDefaultEmptyLocalMediaInArray(im.remoteI),
                      id: uuid.v4(),
                    } satisfies MediaInArrayDUC
                  }))
                  sheet.setClosing()
                }}
              >
                <OptionContainer>
                  <div css={optionIconBoxStyle}>
                    <CrossInCircleIc css={SvgIconS6.t(crossS)}/>
                  </div>
                  <OptionTitle>{actionText.removeAll}</OptionTitle>
                </OptionContainer>
              </Button>
              
              
              <Dropzone
                onDrop={(files, rejectedFiles, ev) => onFilesSelected(files)}
                noDrag
                useFsAccessApi={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <Contents {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <Button css={ButtonS6.t(ButtonS6.S.text.rect.lg.normal)}>
                      
                      <OptionContainer>
                        <div css={optionIconBoxStyle}>
                          <ArrowRefreshCwIc/>
                        </div>
                        <OptionTitle>{actionText.replace}</OptionTitle>
                      </OptionContainer>
                    </Button>
                  </Contents>
                )}
              </Dropzone>
              
              
              {/* Fullscreen */}
              {/* {function(){
               const im = images[lastIdx]
               if (im.type === 'remote' && im.isDownloaded || im.type === 'local' && im.isCompressed) {
               return <Button css={ButtonS.bigRectTransparent}
               onClick={() => {
               sheet.setClosing()
               }}
               >
               <OptionContainer>
               <div css={optionIconBoxStyle}>
               <FullscreenIc css={css`height: 120%;`}/>
               </div>
               <OptionTitle>{actionText.fullScreenView}</OptionTitle>
               </OptionContainer>
               </Button>
               }
               }()} */}
              
              
              {function() {
                const im = images[lastIdx]
                if (im.isReady) {
                  return (
                    <a href={im.dataUrl}
                      download={`${im.name} ${im.id}.${im.ext}`}
                    >
                      <Button css={ButtonS6.t(ButtonS6.S.text.rect.lg.normal)}
                        onClick={sheet.setClosing}
                      >
                        <OptionContainer>
                          <div css={optionIconBoxStyle}>
                            <DownloadIc/>
                          </div>
                          <OptionTitle>{actionText.download}</OptionTitle>
                        </OptionContainer>
                      </Button>
                    </a>
                  )
                }
              }()}
            
            
            </OptionsContent>
          </BottomSheetBasic>
        </ModalPortal>
      )}
    </UseBottomSheetState>
  )
})
export default ProfilePhotosPhotoOptions




const OptionsContent = styled.div`
  width: 100%;
  ${col};
  padding-bottom: 20px;
`
const OptionContainer = styled.div`
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  ${row};
  gap: 20px;
  align-items: center;
`
const OptionTitle = styled.h6`
  ${resetH};
  ${Txt.s18WideLh150};
  flex: 1;
  ${col};
  align-items: start;
`
const optionIconBoxStyle = css`
  ${flexC};
  height: 1.3em;
  width: 1.333em;
`

const crossS: AppWidgetStyle = t => [SvgIconS6.Parts.base, {
  iconH: '120%',
}]