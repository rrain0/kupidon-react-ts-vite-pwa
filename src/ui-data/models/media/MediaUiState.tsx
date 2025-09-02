import { RangeU } from '@utils/common/RangeU.ts'
import React from 'react'
import DocumentErrorIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/DocumentErrorIc.tsx'
import PictureIc from 'src/ui/0-elements/icons/SvgIcons/pack/ui/PictureIc.tsx'
import { SvgIconS6 } from 'src/ui/0-elements/icons/SvgIcons/SvgIconS6.ts'
import { ImageParts } from 'src/ui/0-elements/ImageParts.tsx'
import PieProgress from 'src/ui/0-elements/PieProgress/PieProgress.tsx'
import SparkingLoadingLine from 'src/ui/0-elements/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { ReactU } from 'src/utils/react/ReactU'
import { TypeU } from 'src/utils/common/TypeU'
import Pu = TypeU.Pu
import ClassStyle = ReactU.ClassStyle




export type MediaUiStateProps = Pu<{
  isError: boolean
  isLoadingNoProgress: boolean
  isLoadingWithProgress: boolean
  progress: number
  isEmpty: boolean
}> & ClassStyle

export const MediaUiState = React.memo((props: MediaUiStateProps) => {
  const {
    className, style,
    isError,
    isLoadingNoProgress,
    isLoadingWithProgress,
    progress = 0,
    isEmpty,
  } = props
  
  if (!isError && !isLoadingNoProgress && !isLoadingWithProgress && !isEmpty) {
    return undefined
  }
  
  return (
    <div
      data-display-name="MediaUiState"
      className={className}
      style={style}
      css={ImageParts.placeholderBoxS}
    >
      {(() => {
        if (isError) {
          return (
            <DocumentErrorIc css={SvgIconS6.t(ImageParts.documentErrorIcS)}/>
          )
        }
        if (isLoadingNoProgress) {
          return (
            <SparkingLoadingLine/>
          )
        }
        if (isLoadingWithProgress) {
          return (
            <PieProgress css={ImageParts.pieProgressSmS}
              progress={
                RangeU.map(progress, [0, 100], [5, 95])
              }
            />
          )
        }
        if (isEmpty) {
          return (
            <PictureIc css={SvgIconS6.t(ImageParts.placeholderIcSmS)}/>
          )
        }
      })()}
    </div>
  )
})
MediaUiState.displayName = 'MediaUiState'
export default MediaUiState





