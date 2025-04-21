import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { BottomSheetBasicS6 } from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasicS6.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { FileU } from 'src/util/file/FileU.ts'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import React from 'react'
import Dropzone from 'react-dropzone'
import ModalPortal from 'src/ui/components/modal/ModalPortal/ModalPortal.tsx'
import UseBottomSheetState from 'src/ui/1-widgets/BottomSheet/UseBottomSheetState.tsx'
import BottomSheetBasic from 'src/ui/1-widgets/BottomSheetBasic/BottomSheetBasic.tsx'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { newDefaultProfilePhoto, ProfilePhoto } from 'src/ui/2-pages/Profile/ProfilePage.model.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import * as uuid from 'uuid'
import Callback = TypeU.Callback
import CrossInCircleIc = SvgIconsPack.CrossInCircleIc
import contents = EmotionCommon.contents
import ArrowRefreshCwIc = SvgIconsPack.ArrowRefreshCwIc
import DownloadIc = SvgIconsPack.DownloadIc
import extensionFromMimeType = FileU.getExtensionFromMimeType
import col = EmotionCommon.col
import row = EmotionCommon.row
import SetterOrUpdater = TypeU.SetterOrUpdater
import flexC = EmotionCommon.flexC
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH
import Callback1 = TypeU.Callback1
import { AppWidgetStyle } from 'mini-libs/widget-style-6/WidgetStyle'



export const ProfilePhotosPhotoOptionsOverlayName = 'photoOptions'


export type ProfilePhotosPhotoOptionsProps = {
  isOpen: boolean
  close: Callback
  images: ProfilePhoto[]
  setImages: SetterOrUpdater<ProfilePhoto[]>
  lastIdx: number
  onFilesSelected: Callback1<File[]>
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
                  im.compression?.abort()
                  const newImages = [...images]
                  newImages[lastIdx] = {
                    ...newDefaultProfilePhoto(),
                    type: 'local',
                    id: uuid.v4(),
                    isEmpty: true,
                    remoteI: newImages[lastIdx].remoteI,
                  } satisfies ProfilePhoto
                  setImages(newImages)
                  sheet.setClosing()
                }}
              >
                <OptionContainer>
                  <div css={optionIconBoxStyle}>
                    <CrossInCircleIc css={SvgIconS6.t(crossS)} />
                  </div>
                  <OptionTitle>{actionText.remove}</OptionTitle>
                </OptionContainer>
              </Button>
              
              
              <Button css={ButtonS6.t(ButtonS6.S.text.rect.lg.normal)}
                onClick={() => {
                  setImages(images.map(im => {
                    im.download?.abort()
                    im.compression?.abort()
                    return {
                      ...newDefaultProfilePhoto(),
                      type: 'local',
                      id: uuid.v4(),
                      isEmpty: true,
                      remoteI: im.remoteI,
                    } satisfies ProfilePhoto
                  }))
                  sheet.setClosing()
                }}
              >
                <OptionContainer>
                  <div css={optionIconBoxStyle}>
                    <CrossInCircleIc css={SvgIconS6.t(crossS)} />
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
                  <div css={contents} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button css={ButtonS6.t(ButtonS6.S.text.rect.lg.normal)}>
                      
                      <OptionContainer>
                        <div css={optionIconBoxStyle}>
                          <ArrowRefreshCwIc />
                        </div>
                        <OptionTitle>{actionText.replace}</OptionTitle>
                      </OptionContainer>
                    </Button>
                  </div>
                )}
              </Dropzone>
              
              
              {/* Fullscreen */}
              {/* {function(){
               const im = images[lastIdx]
               if (im.type === 'remote' && im.isDownloaded || im.type === 'local' && im.isCompressed) {
               return <Button css={ButtonS.bigRectTransparent}
               onClick={()=>{
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
                      download={`${im.name} ${im.id}.${extensionFromMimeType(im.mimeType)}`}
                    >
                      <Button css={ButtonS6.t(ButtonS6.S.text.rect.lg.normal)}
                        onClick={sheet.setClosing}
                      >
                        <OptionContainer>
                          <div css={optionIconBoxStyle}>
                            <DownloadIc />
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