import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from '@util/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from '@util/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc







const overlayName = 'smoke'





const ProfileSmokeOption =
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
        text: 'Абсолютно не курю и негативно отношусь к курению',
      },{
        value: '2',
        text: 'Не курю и предпочитаю партнера, который также не курит',
      },{
        value: '3',
        text: 'Не курю, но меня не беспокоит, если партнер курит социально',
      },{
        value: '4',
        text: 'Курю редко, только на особых случаях',
      },{
        value: '5',
        text: 'Курю периодически, но не ежедневно',
      },{
        value: '6',
        text: 'Курю регулярно, но не считаю это проблемой',
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
      title={'Отношение к курению'}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={'Отношение к курению'}
      options={genderOptions}
      value={selected}
      onSelect={setSelected}
    />
  </>
})
export default ProfileSmokeOption



