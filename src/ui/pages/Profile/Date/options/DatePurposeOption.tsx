import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/util/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/util/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc



const overlayName = 'datePurpose'



const ProfileSmokeOption = React.memo(
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
          value: '1',
          text: 'Романтика',
        }, {
          value: '2',
          text: 'Дружба',
        }, {
          value: '3',
          text: 'Серьезные отношения',
        }, {
          value: '4',
          text: 'Свой ответ',
        }, {
          value: '',
          text: text.notSelected,
        },
      ],
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = genderOptions.find(opt => opt.value === selected)?.text ?? ''
    
    
    return <>
      <OptionItem
        //icon={<GenderGradIc />}
        title={'Цель свидания'}
        value={value}
        onClick={open}
      />
      
      <ModalRadio
        isOpen={isOpen}
        close={close}
        title={'Цель свидания'}
        options={genderOptions}
        value={selected}
        onSelect={setSelected}
      />
    </>
  }
)
export default ProfileSmokeOption



