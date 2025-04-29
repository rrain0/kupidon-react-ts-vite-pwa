import React, { useMemo, useState } from 'react'
import { Option } from 'src/ui-data/models/Option'
import ModalTileSelect from 'src/ui/1-widgets/modals/ModalTileSelect/ModalTileSelect'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/hook/useOverlayUrl.ts'
import { SvgGradIconsPack } from 'src/ui/0-elements/icons/SvgGradIcons/SvgGradIconsPack.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/1-widgets/OptionItem/OptionItem.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import PlanetFrameGradIc = SvgGradIconsPack.PlanetFrameGradIc







const overlayName = 'profileLangs'


interface LangOption extends Option<string> {
  tag: string
}


const ProfileLangsOption = React.memo(
  () => {
    const optionText = useUiValues(OptionUiText)
    const titleText = useUiValues(TitleUiText)
    
    const text = useMemo(() => ({
      notSelected: optionText.notSelected,
      langs: 'Языки',
    }), [titleText, optionText])
    
    
    const options = useMemo(() => [
      {
        id: 'ru',
        text: 'Русский',
        tag: '#ru',
      },
      {
        id: 'en',
        text: 'Английский',
        tag: '#en',
      },
      {
        id: 'es',
        text: 'Испанский',
        tag: '#es',
      },
      {
        id: 'pt',
        text: 'Португальский',
        tag: '#pt',
      },
      {
        id: 'id',
        text: 'Индонезийский',
        tag: '#id',
      },
      {
        id: 'fr',
        text: 'Французский',
        tag: '#fr',
      },
      {
        id: 'tr',
        text: 'Турецкий',
        tag: '#tr',
      },
      {
        id: 'de',
        text: 'Немецкий',
        tag: '#de',
      },
      {
        id: 'zh',
        text: 'Китайский',
        tag: '#zh',
      },
      {
        id: 'ar',
        text: 'Арабский',
        tag: '#ar',
      },
      {
        id: 'vi',
        text: 'Вьетнамский',
        tag: '#vi',
      },
      {
        id: 'it',
        text: 'Итальянский',
        tag: '#it',
      },
      {
        id: 'ko',
        text: 'Корейский',
        tag: '#ko',
      },
      {
        id: 'ja',
        text: 'Японский',
        tag: '#ja',
      },
      {
        id: 'pl',
        text: 'Польский',
        tag: '#pl',
      },
      {
        id: 'hi',
        text: 'Хинди',
        tag: '#hi',
      },
    ] satisfies LangOption[], [text])
    
    
    
    const [saved, setSaved] = useState<string[]>(['ru', 'en', 'fr'])
    const [selected, setSelected] = useState<string[]>(saved)
    
    const onClear = () => setSelected([])
    const onCancel = () => setSelected(saved)
    
    
    const { isOpen, open, close } = useOverlayUrl(overlayName)
    
    const onClose = () => {
      setSaved(selected)
      close()
    }
    
    const valueText = selected
      .map(v => options.find(o => o.id === v))
      .filter(o => !!o)
      .map(o => o.tag)
      .join(' ')
      || text.notSelected
    
    
    return (
      <>
        <OptionItem
          icon={<PlanetFrameGradIc/>}
          title={text.langs}
          value={valueText}
          onClick={open}
        />
        
        <ModalTileSelect
          isOpen={isOpen}
          onClose={onClose}
          title={text.langs}
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
export default ProfileLangsOption



