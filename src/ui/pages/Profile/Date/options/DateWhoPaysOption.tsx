import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'dateWhoPays'





const DateWhoPaysOption =
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
        text: 'Я',
      },{
        value: '2',
        text: 'Партнёр',
      },{
        value: '3',
        text: 'Раздельно',
      },{
        value: '4',
        text: 'Как пойдёт',
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
      title={'Кто предпочтительнее оплачивает счет '}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={'Кто предпочтительнее оплачивает счет '}
      options={genderOptions}
      value={selected}
      onSelect={setSelected}
    />
  </>
})
export default DateWhoPaysOption


