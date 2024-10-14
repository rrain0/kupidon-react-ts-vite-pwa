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
import MapLocationGradIc = SvgGradIcons.MapLocationGradIc







const overlayName = 'profilePlaceOfResidence'





const ProfilePlaceOfResidenceOption = React.memo(
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
          id: '1',
          text: 'Октябрьский округ',
        },
        {
          id: '2',
          text: 'Свердловский округ',
        },
        {
          id: '3',
          text: 'Правобережный округ',
        },
        {
          id: '4',
          text: 'Ленинский округ',
        },
        {
          id: '',
          text: text.notSelected,
        },
      ] satisfies Option<string>[],
      [text]
    )
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    const value = options.find(opt => opt.id === selected)?.text ?? ''
    
    
    return (
      <>
        <OptionItem
          icon={<MapLocationGradIc />}
          title={'Место проживания'}
          value={value}
          onClick={open}
        />
        
        
        <ModalSingleSelectList
          isOpen={isOpen}
          close={close}
          title={'Место проживания'}
          options={options}
          selected={selected}
          setSelected={setSelected}
          notSelectedValue={''}
        />
      </>
    )
  }
)
export default ProfilePlaceOfResidenceOption



