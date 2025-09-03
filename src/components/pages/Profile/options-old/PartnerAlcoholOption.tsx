import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import ModalRadio from 'src/components/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'







const overlayName = 'partnerAlcohol'





const PartnerAlcoholOption =
React.memo(
() => {
  const optionText = useUiValues(OptionUiText)
  const titleText = useUiValues(TitleUiText)
  
  const text = useMemo(() => ({
    notSelected: optionText.notSelected,
  }), [titleText, optionText])
  
  
  const [selected, setSelected] = useState('')
  
  
  const genderOptions = useMemo(
    () => [
      {
        id: '1',
        text: 'Абсолютно не употребляет алкоголь',
      },{
        id: '2',
        text: 'Употребляю алкоголь редко, только по особым случаям',
      },{
        id: '3',
        text: 'Употребляю алкоголь социально, в компании друзей',
      },{
        id: '4',
        text: 'Употребляю алкоголь время от времени',
      },{
        id: '5',
        text: 'Алкоголь является частью моей жизни и развлечений',
      },{
        id: '',
        text: text.notSelected,
      }
    ] satisfies Option<string>[],
    [text]
  )
  
  
  
  const { isOpen, open, close } = useOverlayUrl(overlayName)
  const value = genderOptions.find(opt => opt.id === selected)?.text ?? ''
  
  
  return <>
    <OptionItem
      //icon={<GenderGradIc/>}
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



