import React, { useMemo, useState } from 'react'
import { OPTION_CUSTOM } from 'src/ui-data/models/Option'
import ModalMultiSelectList from 'src/ui/1-widgets/modals/ModalMultiSelectList/ModalMultiSelectList'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import BookGradIc = SvgGradIcons.BookGradIc







const overlayName = 'favoriteBookGenres'





const ProfileFavoriteBookGenresOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
    
    
    
    
    
    
    const [selected, setSelected] = useState([] as string[])
    const [customOptionText, setCustomOptionText] = useState('')
    
    const options = useMemo(
      () => [
        {
          value: '1',
          text: 'Научпоп',
        }, {
          value: '2',
          text: 'Наука',
        }, {
          value: '3',
          text: 'Драма',
        }, {
          value: '4',
          text: 'Детектив',
        }, {
          value: '6',
          text: 'Манга',
        }, {
          value: '7',
          text: 'Приключения',
        }, {
          value: '8',
          text: 'Научная фантастика',
        }, {
          value: OPTION_CUSTOM,
          text: '',
        },
      ],
      [text]
    )
    
    const value = selected
      .map(v => options.find(o => o.value === v))
      .filter(o => !!o)
      .map(o => o!.text)
      .join(', ')
      || text.notSelected
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    
    return (
      <>
        <OptionItem
          icon={<BookGradIc />}
          title={'Любимые жанры книг'}
          value={value}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          close={close}
          title={'Любимые жанры книг'}
          options={options}
          selected={selected}
          setSelected={setSelected}
          customOptionText={customOptionText}
          setCustomOptionText={setCustomOptionText}
        />
        
        
      </>
    )
  }
)
export default ProfileFavoriteBookGenresOption



