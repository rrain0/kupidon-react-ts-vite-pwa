import { css } from '@emotion/react'
import { ArrayU } from 'src/util/common/ArrayU.ts'
import { RangeU } from 'src/util/common/RangeU'
import { ReactU } from 'src/util/common/ReactU.ts'
import { TypeU } from 'src/util/common/TypeU.ts'
import { useStateMapperSync } from 'src/util/react-state/useStateMapperSync.ts'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import numeral from 'numeral'
import React, { useState } from 'react'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import Button from 'src/ui/0-elements/buttons/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/0-elements/buttons/Button/ButtonStyle.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { ProfilePageValidation } from 'src/ui/2-pages/Profile/validation.ts'
import { EmotionCommon } from 'src/ui-data/styles/EmotionCommon.ts'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import ModalRangePicker from 'src/ui/1-widgets/modals/ModalRangePicker/ModalRangePicker.tsx'
import RulerVerticalGradIc = SvgGradIcons.RulerVerticalGradIc
import UserValues = ProfilePageValidation.UserValues
import NumRangeNullable = RangeU.NumRangeNullable
import NumRange = RangeU.NumRange
import rowWrap = EmotionCommon.rowWrap




const heightMinMax: NumRange = [129, 231]

const tilesHeightValues: NumRangeNullable[] = [
  [null, null], [null, 160], [160, 170], [170, 180], [180, 190], [190, null]
]

const overlayName = 'partnerHeight'


const PartnerHeightOption =
React.memo(
(props: ValidationWrapRenderProps<UserValues['partnerHeight']>) => {
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
  
  
  const [heightRange, setHeightRange] = [props.value, props.setValue]
  //const [heightRange, setHeightRange] = useState<NumRangeNullable>([null, null])
  const [widgetRange, setWidgetRange] = useState<NumRange>(
    () => mapHeightRangeToWidgetRange(heightRange)
  )
  
  useStateMapperSync(
    heightRange, widgetRange,
    setHeightRange, setWidgetRange,
    (w, h) => ReactU.arrMerge(
      h, w,
      mapWidgetRangeToHeightRange(w), mapHeightRangeToWidgetRange(h)
    ),
    (h, w) => ReactU.arrMerge(
      w, h,
      mapHeightRangeToWidgetRange(h), mapWidgetRangeToHeightRange(w)
    )
  )
  
  const textValue = (heightRange: NumRangeNullable) => {
    const [from, to] = heightRange
    if (from===null && to===null) return text.any
    if (from===null) return `${text.to} ${to} ${text.cm}`
    if (to===null) return `${from}+ ${text.cm}`
    if (from===to) return `${from} ${text.cm}`
    return `${from} - ${to} ${text.cm}`
  }
  
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  
  
  const activeBtn = ButtonStyle.filledRoundedNormalAccent
  const inactiveBtn = ButtonStyle.outlinedRoundedNormalAccent
  
  return <>
    <OptionItem
      icon={<RulerVerticalGradIc />}
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
        {tilesHeightValues.map(it=><Button
          css={ArrayU.eq(heightRange, it) ? activeBtn : inactiveBtn}
          key={it.join(' ')}
          onClick={()=>setHeightRange(it)}
        >
          {textValue(it)}
        </Button>)}
      </div>
    </ModalRangePicker>
    
  </>
})
export default PartnerHeightOption




const tilesGrid = (t: AppTheme.Theme) => css`
  ${rowWrap};
  //justify-content: space-around;
  gap: 8px 30px;
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