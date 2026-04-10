import { mergeMappedIf } from '@utils/array/arrayDiffUtils.ts'
import HourglassGradIc
  from 'src/components/elems/icons/GradSvgIcons/pack/special/HourglassGradIc.tsx'
import { useStateMapperSync } from '@utils/react/state/useStateMapperSync.ts'
import React, { useState } from 'react'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import ModalRangePicker from 'src/components/widgets/modals/ModalRangePicker/ModalRangePicker.tsx'
import { NumRange, NumRangeEndNullable } from '@utils/base/math/rangeUtils.ts'



const ageMinMax: NumRange = [18, 41]


const overlayName = 'partnerAge'



const PartnerAgeOption = React.memo(() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = {
    any: optionText.any.toLowerCase(),
    from: optionText.from.toLowerCase(),
    to: optionText.to.toLowerCase(),
    yearsOld: optionText.yearsOld.toLowerCase(),
  }
  
  
  /* const partnerAgeOptions = useMemo(
    () => [
      {
        value: '18_TO_25',
        text: `18-25 ${text.yearsOld}`,
      },{
        value: '25_TO_30',
        text: `25-30 ${text.yearsOld}`,
      },{
        value: '30_TO_35',
        text: `30-35 ${text.yearsOld}`,
      },{
        value: '35_TO_40',
        text: `35-40 ${text.yearsOld}`,
      },{
        value: '40_MORE',
        text: `40+ ${text.yearsOld}`,
      },{
        value: '',
        text: text.notSelected,
      }
    ] satisfies PartnerAgeUiOptions,
    [text]
  ) */
  
  
  
  // props.value
  const [ageRange, setAgeRange] = useState<NumRangeEndNullable>([18, null])
  const [widgetRange, setWidgetRange] = useState<NumRange>(
    () => mapDataRangeToWidgetRange(ageRange)
  )
  
  useStateMapperSync(
    ageRange, widgetRange,
    setAgeRange, setWidgetRange,
    (w, h) => mergeMappedIf(
      h, w,
      mapWidgetRangeToDataRange(w), mapDataRangeToWidgetRange(h)
    ),
    (h, w) => mergeMappedIf(
      w, h,
      mapDataRangeToWidgetRange(h), mapWidgetRangeToDataRange(w)
    )
  )
  
  const textValue = function() {
    const [from, to] = ageRange
    if (from === null && to === null) return text.any
    if (from === null) return `${text.to} ${to} ${text.yearsOld}`
    if (to === null) return `${from}+ ${text.yearsOld}`
    if (from === to) return `${from} ${text.yearsOld}`
    return `${from} - ${to} ${text.yearsOld}`
  }()
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  return (
    <>
      <OptionItem
        icon={<HourglassGradIc/>}
        title={titleText.partnerAge}
        value={textValue}
        onClick={open}
      />
      
      
      <ModalRangePicker
        isOpen={isOpen}
        close={close}
        title={titleText.partnerAge}
        text={textValue}
        
        range={widgetRange}
        setRange={setWidgetRange}
        minMax={ageMinMax}
      />
      
    </>
  )
})
PartnerAgeOption.displayName = 'PartnerAgeOption'
export default PartnerAgeOption



function mapWidgetRangeToDataRange(range: NumRange): NumRangeEndNullable {
  return [
    function() {
      const r0 = Math.round(range[0])
      if (r0 <= ageMinMax[0]) return ageMinMax[0]
      return r0
    }(),
    function() {
      const r1 = Math.round(range[1])
      if (r1 >= ageMinMax[1]) return null
      return r1
    }(),
  ]
}
function mapDataRangeToWidgetRange(dataRange: NumRangeEndNullable): NumRange {
  return [
    function() {
      if (dataRange[0] < ageMinMax[0]) return ageMinMax[0]
      return dataRange[0]
    }(),
    function() {
      if (dataRange[1] === null) return ageMinMax[1]
      if (dataRange[1] > ageMinMax[1]) return ageMinMax[1]
      return dataRange[1]
    }(),
  ]
}
