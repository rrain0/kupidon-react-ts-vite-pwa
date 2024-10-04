import React, { useMemo, useState } from 'react'
import ModalMultiSelectList from 'src/ui/1-widgets/modals/ModalMultiSelectList/ModalMultiSelectList'
import {
  useMultiSelectOneEditableOption
} from 'src/ui/1-widgets/modals/ModalMultiSelectList/useMultiSelectOneEditableOption'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import FilmGradIc = SvgGradIcons.FilmGradIc







const overlayName = 'favoriteMovieGenres'





const ProfileFavoriteMovieGenresOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
    }), [titleText, optionText])
  
  
  
    const [selected, setSelected] = useState([] as string[])
    const [customOptionText, setCustomOptionText] = useState('')
    
    const options0 = useMemo(
      () => [
        {
          id: '1',
          text: 'Боевик',
        }, {
          id: '2',
          text: 'Наука',
        }, {
          id: '3',
          text: 'Драма',
        }, {
          id: '4',
          text: 'Детектив',
        }, {
          id: '5',
          text: 'Комедия',
        }, {
          id: '6',
          text: 'Аниме',
        }, {
          id: '7',
          text: 'Приключения',
        }, {
          id: '8',
          text: 'Научная фантастика',
        }, {
          id: 'CUSTOM',
          text: '',
        },
      ],
      [text]
    )
    
    
    const { options, add, edit, setOptionText } = useMultiSelectOneEditableOption(
      'CUSTOM', options0, selected, setSelected
    )
  
  
    const valueText = selected
      .map(v => options.find(o => o.id === v))
      .filter(o => !!o)
      .map(o => o.text)
      .join(', ')
      || text.notSelected
    
  
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    
    return (
      <>
        <OptionItem
          icon={<FilmGradIc />}
          title={'Любимые жанры фильмов'}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalMultiSelectList
          isOpen={isOpen}
          close={close}
          title={'Любимые жанры фильмов'}
          options={options}
          selected={selected}
          add={add}
          edit={edit}
          setSelected={setSelected}
          setOptionText={setOptionText}
        />
        
        
      </>
    )
  }
)
export default ProfileFavoriteMovieGenresOption



