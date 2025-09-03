import React, { useMemo, useState } from 'react'
import { Option } from 'src/models/ui/Option.ts'
import TelescopeGradIc from 'src/components/elems/icons/GradSvgIcons/pack/special/TelescopeGradIc.tsx'
import ModalTileSelect from 'src/components/widgets/modals/ModalTileSelect/ModalTileSelect'
import { useOverlayUrl } from 'src/components/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { OptionUiText } from 'src/locales/translations/OptionUiText.ts'
import { TitleUiText } from 'src/locales/translations/TitleUiText.ts'
import OptionItem from 'src/components/widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from '@libs/ui-text/useUiText.ts'




const overlayName = 'profileInterestsAndHobbies'


const ProfileInterestsAndHobbiesOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
      interestsAndHobbies: 'Интересы и хобби',
      hashTravel: '#путешествия',
      hashMusic: '#музыка',
      hashSport: '#спорт',
      hashMovie: '#кино',
      hashArt: '#искусство',
      hashAnime: '#аниме',
    }), [titleText, optionText])
    
    const options = useMemo(() => [
      {
        id: 'travel',
        text: text.hashTravel,
      },
      {
        id: 'music',
        text: text.hashMusic,
      },
      {
        id: 'sport',
        text: text.hashSport,
      },
      {
        id: 'movie',
        text: text.hashMovie,
      },
      {
        id: 'art',
        text: text.hashArt,
      },
      {
        id: 'anime',
        text: text.hashAnime,
      },
    ] satisfies Option<string>[], [text])
    
    
    const [saved, setSaved] = useState<string[]>(['travel', 'music', 'sport'])
    const [selected, setSelected] = useState<string[]>(saved)
    
    const onClear = () => setSelected([])
    const onCancel = () => setSelected(saved)
    
    const valueText = selected
      .map(v => options.find(o => o.id === v))
      .filter(o => !!o)
      .map(o => o.text)
      .join(' ')
      || text.notSelected
     
     
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onClose = () => {
      setSaved(selected)
      close()
    }
    
    
    return (
      <>
        <OptionItem
          icon={<TelescopeGradIc/>}
          title={text.interestsAndHobbies}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalTileSelect
          isOpen={isOpen}
          onClose={onClose}
          title={text.interestsAndHobbies}
          options={options}
          selected={selected}
          setSelected={setSelected}
          onClear={onClear}
          onCancel={onCancel}
        />
      </>
    )
  }
)
export default ProfileInterestsAndHobbiesOption



