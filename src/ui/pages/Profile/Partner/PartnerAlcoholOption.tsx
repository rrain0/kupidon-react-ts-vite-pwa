import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui/model/Option.ts'
import ModalRadio from 'src/ui/widgets/modal-element/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-props/ui-values/OptionUiText.ts'
import { TitleUiText } from 'src/ui-props/ui-values/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'partnerAlcohol'





const PartnerAlcoholOption =
React.memo(
()=>{
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(()=>({
    notSelected: optionText.notSelected,
  }), [titleText, optionText])
  
  
  const [selected, setSelected] = useState('')
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: '1',
        text: 'Абсолютно не употребляет алкоголь',
      },{
        value: '2',
        text: 'Употребляю алкоголь редко, только по особым случаям',
      },{
        value: '3',
        text: 'Употребляю алкоголь социально, в компании друзей',
      },{
        value: '4',
        text: 'Употребляю алкоголь время от времени',
      },{
        value: '5',
        text: 'Алкоголь является частью моей жизни и развлечений',
      },{
        value: '',
        text: text.notSelected,
      }
    ],
    [text]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  const value = genderOptions.find(opt => opt.value === selected)?.text ?? ''
  
  
  return <>
    <OptionItem
      //icon={<GenderGradIc />}
      title={'Отношение партнера к алкоголю'}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={'Отношение партнера к алкоголю'}
      options={genderOptions}
      value={selected}
      onSelect={setSelected}
    />
  </>
})
export default PartnerAlcoholOption



