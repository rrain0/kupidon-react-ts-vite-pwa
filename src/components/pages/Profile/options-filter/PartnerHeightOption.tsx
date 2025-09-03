import { css } from '@emotion/react'
import { ButtonS6 } from 'src/components/elems/buttons/Button/ButtonS6.ts'
import RulerVerticalGradIc
  from 'src/components/elems/icons/GradSvgIcons/pack/special/RulerVerticalGradIc.tsx'
import { ArrayU } from '@utils/base/ArrayU.ts'
import { RangeU } from '@utils/base/RangeU'
import { useStateMapperSync } from '@utils/react/state/useStateMapperSync.ts'
import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import React, { useState } from 'react'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import Button from 'src/components/elems/buttons/Button/Button.tsx'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import ModalRangePicker from 'src/components/widgets/modals/ModalRangePicker/ModalRangePicker.tsx'
import { EmotionCommon } from 'src/styles/common/EmotionCommon.ts'
import NumRangeNullable = RangeU.NumRangeNullable
import NumRange = RangeU.NumRange
import rowWrap = EmotionCommon.rowWrap




const heightMinMax: NumRange = [129, 231]

const tilesHeightValues: NumRangeNullable[] = [
  [null, null], [null, 160], [160, 170], [170, 180], [180, 190], [190, null],
]

const overlayName = 'partnerHeight'



const PartnerHeightOption = React.memo(() => {
  const titleText = useUiValues(TitleUiText)
  const optionText = useUiValues(OptionUiText)
  
  const text = {
    any: optionText.any.toLowerCase(),
    from: optionText.from.toLowerCase(),
    to: optionText.to.toLowerCase(),
    cm: optionText.cm.toLowerCase(),
  }
  
  
  /* const [heightMinMax, setHeightMinMax] = useState<NumRange>([129, 231])
  useEffect(() => {
    let variant = 1 as 1 | 2
    const id = setInterval(() => {
      if (variant === 1) {
        setHeightMinMax([50, 400])
        variant = 2
      }
      else {
        setHeightMinMax([129, 231])
        variant = 1
      }
    }, 3000)
    return () => clearInterval(id)
  }, []) */
  
  
  const [heightRange, setHeightRange] = useState<NumRangeNullable>([null, null])
  const [widgetRange, setWidgetRange] = useState<NumRange>(
    () => mapHeightRangeToWidgetRange(heightRange)
  )
  
  useStateMapperSync(
    heightRange, widgetRange,
    setHeightRange, setWidgetRange,
    (w, h) => ArrayU.mergeMappedIf(
      h, w,
      mapWidgetRangeToHeightRange(w), mapHeightRangeToWidgetRange(h)
    ),
    (h, w) => ArrayU.mergeMappedIf(
      w, h,
      mapHeightRangeToWidgetRange(h), mapWidgetRangeToHeightRange(w)
    )
  )
  
  const textValue = (heightRange: NumRangeNullable) => {
    const [from, to] = heightRange
    if (from === null && to === null) return text.any
    if (from === null) return `${text.to} ${to} ${text.cm}`
    if (to === null) return `${from}+ ${text.cm}`
    if (from === to) return `${from} ${text.cm}`
    return `${from} - ${to} ${text.cm}`
  }
  
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  const activeBtnS = ButtonS6.t(ButtonS6.S.filled.rounded.md.accent)
  const inactiveBtnS = ButtonS6.t(ButtonS6.S.outlined.rounded.md.accent)
  
  return (
    <>
      <OptionItem
        icon={<RulerVerticalGradIc/>}
        title={titleText.partnerHeight}
        value={textValue(heightRange)}
        onClick={open}
      />
      
      
      <ModalRangePicker
        isOpen={isOpen}
        close={close}
        title={titleText.partnerHeight}
        text={textValue(heightRange)}
        
        range={widgetRange}
        setRange={setWidgetRange}
        minMax={heightMinMax}
      >
        <div css={tilesGrid}>
          {tilesHeightValues.map(it => (
            <Button
              css={ArrayU.eq(heightRange, it) ? activeBtnS : inactiveBtnS}
              key={it.join(' ')}
              onClick={() => setHeightRange(it)}
            >
              {textValue(it)}
            </Button>
          ))}
        </div>
      </ModalRangePicker>
      
    </>
  )
})
export default PartnerHeightOption




const tilesGrid = (t: AppTheme.Theme) => css`
  ${rowWrap};
  //justify-content: space-around;
  gap: 8px 30px;
`




function mapWidgetRangeToHeightRange(range: NumRange): NumRangeNullable {
  return [
    function() {
      const r0 = Math.round(range[0])
      if (r0 <= heightMinMax[0]) return null
      return r0
    }(),
    function() {
      const r1 = Math.round(range[1])
      if (r1 >= heightMinMax[1]) return null
      return r1
    }(),
  ]
}
function mapHeightRangeToWidgetRange(heightRange: NumRangeNullable): NumRange {
  return [
    function() {
      if (heightRange[0] === null) return heightMinMax[0]
      if (heightRange[0] < heightMinMax[0]) return heightMinMax[0]
      return heightRange[0]
    }(),
    function() {
      if (heightRange[1] === null) return heightMinMax[1]
      if (heightRange[1] > heightMinMax[1]) return heightMinMax[1]
      return heightRange[1]
    }(),
  ]
}