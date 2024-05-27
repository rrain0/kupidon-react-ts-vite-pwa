import { TypeUtils } from '@util/common/TypeUtils.ts'
import numeral from 'numeral'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { ProfilePageValidation } from 'src/ui/pages/Profile/validation.ts'
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
import ValueOrMapper = TypeUtils.ValueOrMapper
import isFunction = TypeUtils.isFunction




const heightMinMax: NumRange = [129, 231]


const overlayName = 'height'


const PartnerHeightOption =
React.memo(
(props: ValidationWrapRenderProps<UserValues['partnerHeight']>)=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  
  const text = {
    any: optionText.any.toLowerCase(),
    from: optionText.from.toLowerCase(),
    to: optionText.to.toLowerCase(),
    cm: optionText.cm.toLowerCase(),
  }
  
  
  // props.value
  const [heightRange, setHeightRange] = useState<NumRangeNullable>([null, null])
  
  const textValue = function(){
    const [from, to] = heightRange
    if (from===null && to===null) return text.any
    if (from===null) return `${text.to} ${numeral(to).format('0')} ${text.cm}`
    if (to===null) return `${numeral(from).format('0')}+ ${text.cm}`
    return `${numeral(from).format('0')} - ${numeral(to).format('0')} ${text.cm}`
  }()
  
  
  
  const uiRange = useMemo<NumRange>(
    ()=>mapHeightRangeToUiRange(heightRange),
    [...heightRange]
  )
  
  const setUiRange = useCallback((range: ValueOrMapper<NumRange>)=>{
    if (isFunction(range))
      setHeightRange(s=>mapUiRangeToHeightRange(range(mapHeightRangeToUiRange(s))))
    else setHeightRange(mapUiRangeToHeightRange(range))
  }, [])
  
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
      
      range={uiRange}
      setRange={setUiRange}
      minMax={heightMinMax}
    />
    
  </>
})
export default PartnerHeightOption




function mapUiRangeToHeightRange(range: NumRange): NumRangeNullable {
  return [
    function(){
      if (range[0] <= heightMinMax[0]) return null
      return range[0]
    }(),
    function(){
      if (range[1] >= heightMinMax[1]) return null
      return range[1]
    }(),
  ]
}
function mapHeightRangeToUiRange(heightRange: NumRangeNullable): NumRange {
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