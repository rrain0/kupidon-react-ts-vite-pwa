import React, { useMemo, useState } from 'react'
import { Gender } from 'src/api/model/Gender.ts'
import { Option } from 'src/ui-data/models/Option.ts'
import ModalRadio from 'src/ui/widgets/modals/ModalRadio/ModalRadio.tsx'
import { useOverlayUrl } from 'src/ui/components/UseOverlayUrl/useOverlayUrl.ts'
import { SvgGradIcons } from 'src/ui/elements/icons/SvgGradIcons/SvgGradIcons.tsx'
import { OptionUiText } from 'src/ui-data/translations/OptionUiText.ts'
import { TitleUiText } from 'src/ui-data/translations/TitleUiText.ts'
import OptionItem from 'src/ui/widgets/OptionItem/OptionItem.tsx'
import { ValidationWrapRenderProps } from 'src/mini-libs/form-validation/components/ValidationWrap.tsx'
import { useUiValues } from 'src/mini-libs/ui-text/useUiText.ts'
import GenderGradIc = SvgGradIcons.GenderGradIc



const overlayName = 'dateGenre'



const DateGenreOption =
React.memo(
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
        text: 'Романтическое свидание: Вечер в заведении, прогулка под луной, ужин при свечах и тд.',
      }, {
        value: '2',
        text: 'Приключенческое свидание: Активные виды досуга, такие как '
          + 'велосипедные прогулки, восхождение на гору, путешествия и экскурсии.',
      }, {
        value: '3',
        text: 'Культурное свидание: Посещение музеев, галерей и выставок искусства, театров, кинофильмов.',
      }, {
        value: '4',
        text: 'Спортивное свидание: Совместные занятия спортом, '
          + 'например, игра в теннис, боулинг или даже просто фитнес-занятия вместе.',
      }, {
        value: '5',
        text: 'Кулинарное свидание: Готовка или посещение кулинарных мастер-классов, '
          + 'дегустации вин или рестораны с необычной кухней.',
      }, {
        value: '6',
        text: 'Интеллектуальный жанр: «Рекомендация игр-головоломок и квестов. '
          + 'Подсказки по участию в интеллектуальных соревнованиях и викторинах».',
      }, {
        value: '7',
        text: 'Музыкальный жанр: «Рекомендация концертов и выступлений местных музыкантов. '
          + 'Подсказки по посещению ночных клубов или баров с живой музыкой».',
      }, {
        value: '8',
        text: 'Фотографический жанр: «Рекомендация красивых мест для фотосессий. '
          + 'Советы по организации фотосафари или фотовыставок».',
      }, {
        value: '9',
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
      title={'Жанр свидания'}
      value={value}
      onClick={open}
    />
    
    <ModalRadio
      isOpen={isOpen}
      close={close}
      title={'Жанр свидания'}
      options={genderOptions}
      value={selected}
      onSelect={setSelected}
    />
  </>
})
export default DateGenreOption



