import { rangeMap } from 'src/utils/base/math/rangeUtils.ts'
import React from 'react'
import DocumentErrorIc from 'src/components/elems/icons/SvgIcons/pack/ui/DocumentErrorIc.tsx'
import PictureIc from 'src/components/elems/icons/SvgIcons/pack/ui/PictureIc.tsx'
import { SvgIconS6 } from 'src/components/elems/icons/SvgIcons/SvgIconS6.ts'
import { ImageParts } from 'src/components/elems/ImageParts.tsx'
import PieProgress from 'src/components/elems/PieProgress/PieProgress.tsx'
import SparkingLoadingLine from 'src/components/elems/SparkingLoadingLine/SparkingLoadingLine.tsx'
import { ReactU } from '@utils/react/ReactU.ts'

import { Pu } from 'src/utils/base/math/typeUtils.ts'
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
              progress={rangeMap(progress, [0, 100], [5, 95])}
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





