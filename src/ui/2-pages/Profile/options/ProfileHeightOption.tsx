import React, { useEffect, useMemo, useState } from 'react'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import ModalSlider from 'src/ui/1-widgets/modals/ModalSlider/ModalSlider'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import { RangeU } from 'src/util/common/RangeU'
import RulerVerticalGradIc = SvgGradIcons.RulerVerticalGradIc
import NumRange = RangeU.NumRange




const overlayName = 'profileHeight'


const ProfileHeightOption = React.memo(
  () => {
    const titleText = useUiValues(TitleUiText)
    const optionText = useUiValues(OptionUiText)
    
    const text = useMemo(() => ({
      height: titleText.height,
      heightL: titleText.height.toLowerCase(),
      notSpecified: optionText.notSpecified,
      cm: optionText.cm.toLowerCase(),
      lower2: 'менее',
      greater2: 'более',
    }), [titleText, optionText])
    
    const [saved, setSaved] = useState<number | null>(null)
    
    const [minMax, setMinMax] = useState<NumRange>([99, 231])
    const [height, setHeight] = useState<number | null>(saved)
    
    const onCancel = () => setHeight(saved)
    
    useEffect(() => {
      setHeight(saved)
    }, [saved])
    
    const textValue = (height: number | null) => {
      if (height === null) return text.notSpecified
      if (height <= minMax[0]) return `${text.lower2} ${minMax[0] + 1} ${text.cm}`
      if (height >= minMax[1]) return `${text.greater2} ${minMax[1] - 1} ${text.cm}`
      return `${height} ${text.cm}`
    }
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onClose = () => {
      setSaved(height)
      close()
    }
    
    const onValueDragEnd = (value: number) => {
      // set value to external world
      setHeight(Math.round(value))
    }
    const onValue = (value: number) => {
      setHeight(Math.round(value))
    }
    const onClear = () => {
      setHeight(null)
    }
    
    return (
      <>
        <OptionItem
          icon={<RulerVerticalGradIc />}
          title={text.height}
          value={textValue(height)}
          //value={props.value}
          //data-error={props.highlight}
          onClick={open}
        />
        
        <ModalSlider
          isOpen={isOpen}
          onClose={onClose}
          title={text.height}
          text={textValue(height)}
          
          value={height ?? 0}
          setValue={onValue}
          minMax={minMax}
          onValueDragEnd={onValueDragEnd}
          isHideBar={height === null}
          onClear={onClear}
          onCancel={onCancel}
        />
        
      </>
    )
  }
)
export default ProfileHeightOption


