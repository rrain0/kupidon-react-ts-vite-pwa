import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'dateFavoriteCuisine'





const DateFavoriteCuisineOption =
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
        id: '1',
        text: 'Японская',
      },{
        id: '2',
        text: 'Итальянская',
      },{
        id: '3',
        text: 'Мексиканская',
      },{
        id: '4',
        text: 'Другая («Текст»)',
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
      //icon={<GenderGradIc />}
      title={'Любимая кухня'}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={'Любимая кухня'}
      options={genderOptions}
      value={selected}
      onSelect={setSelected}
    />
  </>
})
export default DateFavoriteCuisineOption



