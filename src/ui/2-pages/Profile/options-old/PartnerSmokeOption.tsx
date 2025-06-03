import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { GradSvgIconsPack } from 'src/ui/0-elements/icons/GradSvgIcons/GradSvgIconsPack.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { FormFieldWrapRenderProps } from 'src/mini-libs/form-data/components/FormFieldWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = GradSvgIconsPack.GenderGradIc







const overlayName = 'partnerSmoke'





const PartnerSmokeOption =
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
        text: 'Абсолютно не курит и негативно относится к курению',
      },{
        id: '2',
        text: 'Не курит и предпочитает партнера, который также не курит',
      },{
        id: '3',
        text: 'Не курит, но не беспокоит, если партнер курит социально',
      },{
        id: '4',
        text: 'Курит редко, только на особых случаях',
      },{
        id: '5',
        text: 'Курит периодически, но не ежедневно',
      },{
        id: '6',
        text: 'Курит регулярно, но не считает это проблемой',
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
      title={'Отношение партнёра к курению'}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={'Отношение партнёра к курению'}
      options={genderOptions}
      value={selected}
      onSelect={setSelected}
    />
  </>
})
export default PartnerSmokeOption



