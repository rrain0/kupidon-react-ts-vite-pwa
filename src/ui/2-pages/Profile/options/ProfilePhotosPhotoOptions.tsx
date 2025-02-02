import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonS6 } from 'src/ui/0-elements/buttons/Button/ButtonS6.ts'
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
import { ButtonS } from 'src/ui/0-elements/buttons/Button/ButtonS.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import { SvgIconS } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS.ts'
import { DefaultProfilePhoto, ProfilePhoto } from 'src/ui/2-pages/Profile/ProfilePhotoModels.ts'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { ActionUiText } from 'src/ui-data/translations/ActionUiText.ts'
import * as uuid from 'uuid'
import Callback = TypeU.Callback
import CrossInCircleIc = SvgIconsPack.CrossInCircleIc
import contents = EmotionCommon.contents
import ArrowRefreshCwIc = SvgIconsPack.ArrowRefreshCwIc
import Download1Ic = SvgIconsPack.Download1Ic
import extensionFromMimeType = FileU.extensionFromMimeType
import col = EmotionCommon.col
import row = EmotionCommon.row
import SetterOrUpdater = TypeU.SetterOrUpdater
import center = EmotionCommon.center
import Txt = EmotionCommon.Txt
import resetH = EmotionCommon.resetH
import Callback1 = TypeU.Callback1



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
            css={BottomSheetBasicS6.t(BottomSheetBasicS6.S.Normal.normal)}
            {...sheet.sheetProps}
          >
            <OptionsContent>
              
              
              <Button css={ButtonS6.t(ButtonS6.S.Text.Rect.Big.normal)}
                onClick={() => {
                  const im = images[lastIdx]
                  im.download?.abort()
                  im.compression?.abort()
                  const newImages = [...images]
                  newImages[lastIdx] = {
                    ...DefaultProfilePhoto,
                    type: 'local',
                    id: uuid.v4(),
                    isEmpty: true,
                    remoteIndex: newImages[lastIdx].remoteIndex,
                  } satisfies ProfilePhoto
                  setImages(newImages)
                  sheet.setClosing()
                }}
              >
                <OptionContainer>
                  <div css={optionIconBoxStyle}>
                    <CrossInCircleIc css={css`height: 120%;`} />
                  </div>
                  <OptionTitle>{actionText.remove}</OptionTitle>
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
                    <Button css={ButtonS6.t(ButtonS6.S.Text.Rect.Big.normal)}>
                      
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
                      <Button css={ButtonS6.t(ButtonS6.S.Text.Rect.Big.normal)}
                        onClick={sheet.setClosing}
                      >
                        <OptionContainer>
                          <div css={optionIconBoxStyle}>
                            <Download1Ic />
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
  ${Txt.lg18lh150};
  flex: 1;
  ${col};
  align-items: start;
`
const optionIconBoxStyle = css`
  ${center};
  height: 1.3em;
  width: 1.333em;
  >${SvgIconS.El.icon.sel()}{
    ${SvgIconS.El.icon.props.color.name}: var(${ButtonS6.W.els.button.ps!.varColor.n});
  }
`