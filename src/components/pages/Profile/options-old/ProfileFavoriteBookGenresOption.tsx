import React, { useMemo, useState } from 'react'
import BookGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/BookGradIc.tsx'
import ModalMultiSelectList from 'src/components/widgets/modals/ModalMultiSelectList/ModalMultiSelectList'
import {
  useMultiSelectOneEditableOption
} from 'src/components/widgets/modals/ModalMultiSelectList/useMultiSelectOneEditableOption'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'
import { ArrayU } from 'src/utils/common/ArrayU'







const overlayName = 'favoriteBookGenres'





const ProfileFavoriteBookGenresOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
      favoriteBookGenres: 'Любимые жанры книг',
    }), [titleText, optionText])
    
    
    const options0 = useMemo(() => {
      return [
        {
          id: '1',
          text: 'Научпоп',
        },
        {
          id: '2',
          text: 'Наука',
        },
        {
          id: '3',
          text: 'Драма',
        },
        {
          id: '4',
          text: 'Детектив',
        },
        {
          id: '6',
          text: 'Манга',
        },
        {
          id: '7',
          text: 'Приключения',
        },
        {
          id: '8',
          text: 'Научная фантастика',
        },
        {
          id: 'CUSTOM',
          text: '',
        },
      ]
    }, [text])
    
    
    const [selected, setSelected] = useState([] as string[])
    
    const onSelect = (id: string) => setSelected(ArrayU.toggleTo(selected, id))
    const onClear = () => setSelected([])
    
    const { options, add, edit, setOptionText } = useMultiSelectOneEditableOption(
      'CUSTOM', options0, selected, setSelected
    )
    
    const valueText = selected
      .map(v => options.find(o => o.id === v))
      .filter(o => !!o)
      .map(o => o!.text)
      .join(', ')
      || text.notSelected
    
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    
    return (
      <>
        <OptionItem
          icon={<BookGradIc/>}
          title={text.favoriteBookGenres}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          onClose={close}
          title={text.favoriteBookGenres}
          options={options}
          selected={selected}
          add={add}
          edit={edit}
          onSelect={onSelect}
          setOptionText={setOptionText}
          onClear={onClear}
        />
        
        
      </>
    )
  }
)
export default ProfileFavoriteBookGenresOption



