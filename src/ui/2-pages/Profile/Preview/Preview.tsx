import styled from '@emotion/styled'
import { useResizeRef } from '@util/view/useResizeRef.ts'
import { getViewProps } from '@util/view/ViewProps.ts'
import { ViewU } from '@util/view/ViewU.ts'
import React, { useCallback } from 'react'
import { EmotionCommon } from 'src/ui-data/style/EmotionCommon.ts'
import { StyleVals } from 'src/ui-data/style/StyleVals.ts'
import ProfileShowcase from 'src/ui/1-widgets/ProfileShowcase/ProfileShowcase.tsx'
import { Pages } from 'src/ui/components/Pages/Pages.ts'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import FormValues = ProfilePageValidation.FormValues
import minRatioPort = StyleVals.minRatioPort
import maxRatioPort = StyleVals.maxRatioPort
import abs = EmotionCommon.abs
import full = EmotionCommon.full




export type PreviewProps = {
  formValues: FormValues
}



const Preview = React.memo((props: PreviewProps) => {
  const {
    photos,
    name,
    birthDate,
    gender,
    aboutMe,
  } = props.formValues
  
  
  const onStacksFrameSetWh = useResizeRef<HTMLDivElement>(useCallback(frame => {
    if (frame) {
      const props = getViewProps(frame)
      const { w, h } = props
      const { w: photosW, h: photosH } = ViewU.clampRatio({
        minRatio: minRatioPort,
        maxRatio: maxRatioPort,
        w: w,
        h: h,
      })
      props.setCssProps({
        '--w': `${w}px`,
        '--h': `${h}px`,
        '--photos-w': `${photosW}px`,
        '--photos-h': `${photosH}px`,
      })
    }
  }, []))
  
  
  return (
    <Pages.AddSafeInsets>
      <StacksFrame>
        <StackFrame>
          <StackFrame2
            ref={onStacksFrameSetWh}
          >
            <ProfileShowcase
              photos={photos}
              name={name}
              birthDate={birthDate}
              gender={gender}
              aboutMe={aboutMe}
            />
          </StackFrame2>
        </StackFrame>
      </StacksFrame>
    </Pages.AddSafeInsets>
  )
})
export default Preview




const StacksFrame = styled.div`
  ${full};
  padding: 32px 16px;
  overflow: hidden;
`
const StackFrame = styled.div`
  position: relative;
  ${full};
`
const StackFrame2 = styled.div`
  ${abs};
`