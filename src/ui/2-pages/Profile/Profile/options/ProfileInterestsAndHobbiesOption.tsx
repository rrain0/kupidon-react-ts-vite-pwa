import React, { useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option'
import ModalTileSelect from 'src/ui/1-widgets/modals/ModalTileSelect/ModalTileSelect'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import TelescopeGradIc = SvgGradIcons.TelescopeGradIc







const overlayName = 'interestsAndHobbies'





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
    
    const [selected, setSelected] = useState<string[]>(['travel', 'music', 'sport'])
    
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
    
    const valueText = selected
      .map(v => options.find(o => o.id === v))
      .filter(o => !!o)
      .map(o => o.text)
      .join(' ')
      || text.notSelected
     
     
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    
    return (
      <>
        <OptionItem
          icon={<TelescopeGradIc />}
          title={text.interestsAndHobbies}
          value={valueText}
          onClick={open}
        />
        
        
        <ModalTileSelect
          isOpen={isOpen}
          close={close}
          title={text.interestsAndHobbies}
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
      </>
    )
  }
)
export default ProfileInterestsAndHobbiesOption



