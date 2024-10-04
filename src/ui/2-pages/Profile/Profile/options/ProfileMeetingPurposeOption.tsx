import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/1-widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import ModalSingleSelectList
  from 'src/ui/1-widgets/modals/ModalSingleSelectList/ModalSingleSelectList'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import WineBottleAlcoholGradIc = SvgGradIcons.WineBottleAlcoholGradIc
import GoalGradIc = SvgGradIcons.GoalGradIc







const overlayName = 'meetingPurpose'





const ProfileMeetingPurposeOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    const [selected, setSelected] = useState('')
    
    
    const options = useMemo(
      () => [
        {
          id: 'Свидание',
          text: 'Свидание',
        }, {
          id: 'Общение онлайн',
          text: 'Общение онлайн',
        }, {
          id: 'Деловое общение',
          text: 'Деловое общение',
        }, {
          id: 'Новый опыт',
          text: 'Новый опыт',
        }, {
          id: '',
          text: text.notSelected,
        },
      ],
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = options.find(opt => opt.id === selected)?.text ?? ''
    
    
    return (
      <>
        <OptionItem
          icon={<GoalGradIc />}
          title={'Цель знакомства'}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={close}
          title={'Цель знакомства'}
          options={options}
          selected={selected}
          setSelected={setSelected}
          notSelectedValue={''}
        />
      </>
    )
  }
)
export default ProfileMeetingPurposeOption



