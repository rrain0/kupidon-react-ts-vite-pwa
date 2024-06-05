import { css } from '@emotion/react'
import { ReactUtils } from '@util/common/ReactUtils.ts'
import { TypeUtils } from '@util/common/TypeUtils.ts'
import { useStateSync2 } from '@util/react/useStateSync2.ts'
import { AppTheme } from '@util/theme/AppTheme.ts'
import numeral from 'numeral'
import React, { useState } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import Button from 'src/ui/elements/buttons/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/buttons/ButtonStyle.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { ProfilePageValidation } from 'src/ui/pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import { OptionUiText } from 'src/ui/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/elements/OptionAndValueItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/form-validation/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import ModalRangePicker from 'src/ui/widgets/modal-element/ModalRangePicker/ModalRangePicker.tsx'
import RulerVerticalGradIc = SvgGradIcons.RulerVerticalGradIc
import UserValues = ProfilePageValidation.UserValues
import NumRangeNullable = TypeUtils.NumRangeNullable
import NumRange = TypeUtils.NumRange
import rowWrap = EmotionCommon.rowWrap





const heightMinMax: NumRange = [129, 231]


const overlayName = 'height'


const PartnerHeightOption =
React.memo(
(props: ValidationWrapRenderProps<UserValues['partnerHeight']>) => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = {
    any: optionText.any.toLowerCase(),
    from: optionText.from.toLowerCase(),
    to: optionText.to.toLowerCase(),
    cm: optionText.cm.toLowerCase(),
  }
  
  
  /* const [heightMinMax, setHeightMinMax] = useState<NumRange>([129, 231])
  useEffect(() => {
    let variant = 1 as 1 | 2
    const id = setInterval(()=>{
      if (variant===1) {
        setHeightMinMax([50, 400])
        variant = 2
      }
      else {
        setHeightMinMax([129, 231])
        variant = 1
      }
    }, 3000)
    return ()=>clearInterval(id)
  }, []) */
  
  
  // props.value
  const [heightRange, setHeightRange] = useState<NumRangeNullable>([null, null])
  const [widgetRange, setWidgetRange] = useState<NumRange>(
    () => mapHeightRangeToWidgetRange(heightRange)
  )
  
  useStateSync2(
    heightRange, widgetRange,
    setHeightRange, setWidgetRange,
    (w, h) => ReactUtils.arrMerge(
      h, w,
      mapWidgetRangeToHeightRange(w), mapHeightRangeToWidgetRange(h)
    ),
    (h, w) => ReactUtils.arrMerge(
      w, h,
      mapHeightRangeToWidgetRange(h), mapWidgetRangeToHeightRange(w)
    )
  )
  
  const textValue = function(){
    const [from, to] = heightRange
    if (from===null && to===null) return text.any
    if (from===null) return `${text.to} ${to} ${text.cm}`
    if (to===null) return `${from}+ ${text.cm}`
    if (from===to) return `${from} ${text.cm}`
    return `${from} - ${to} ${text.cm}`
  }()
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  return <>
    <OptionItem
      icon={<RulerVerticalGradIc />}
      title={titleText.partnerHeight}
      value={textValue}
      onClick={open}
    />
    
    
    <ModalRangePicker
      isOpen={isOpen}
      close={close}
      title={titleText.partnerHeight}
      text={textValue}
      
      range={widgetRange}
      setRange={setWidgetRange}
      minMax={heightMinMax}
    >
      <div css={tilesGrid}>
        <Button css={ButtonStyle.button({ shape: 'rounded', color: 'accent' })}>
          {text.any}
        </Button>
        <Button css={ButtonStyle.roundedAccent}>
          27 - 30 {text.cm}
        </Button>
      </div>
    </ModalRangePicker>
    
  </>
})
export default PartnerHeightOption




const tilesGrid = (t: AppTheme.Theme) => css`
  ${rowWrap};
  gap: 20px;
`



function mapWidgetRangeToHeightRange(range: NumRange): NumRangeNullable {
  return [
    function(){
      const r0 = +numeral(range[0]).format('0')
      if (r0 <= heightMinMax[0]) return null
      return r0
    }(),
    function(){
      const r1 = +numeral(range[1]).format('0')
      if (r1 >= heightMinMax[1]) return null
      return r1
    }(),
  ]
}
function mapHeightRangeToWidgetRange(heightRange: NumRangeNullable): NumRange {
  return [
    function(){
      if (heightRange[0] === null) return heightMinMax[0]
      if (heightRange[0] < heightMinMax[0]) return heightMinMax[0]
      return heightRange[0]
    }(),
    function(){
      if (heightRange[1] === null) return heightMinMax[1]
      if (heightRange[1] > heightMinMax[1]) return heightMinMax[1]
      return heightRange[1]
    }(),
  ]
}