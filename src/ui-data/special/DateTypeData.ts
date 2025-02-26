import { ObjectU } from '@util/common/ObjectU.ts'
import { UiText } from 'src/mini-libs/ui-text/UiText.ts'
import { SvgIconsPack } from 'src/ui/0-elements/icons/SvgIcons/SvgIconsPack.tsx'
import ObjectKeys = ObjectU.ObjectKeys
import GlassAndDishIc = SvgIconsPack.GlassAndDishIc
import SimpleSvgIconProps = SvgIconsPack.SimpleSvgIconProps
import SoupIc = SvgIconsPack.SoupIc
import CoffeeCupIc = SvgIconsPack.CoffeeCupIc
import FountainIc = SvgIconsPack.FountainIc
import VaseMuseumIc = SvgIconsPack.VaseMuseumIc
import PictureArtIc = SvgIconsPack.PictureArtIc
import MasksTheatreIc = SvgIconsPack.MasksTheatreIc
import Film2Ic = SvgIconsPack.Film2Ic
import PresentationScreenIc = SvgIconsPack.PresentationScreenIc




export type DateType =
  // romantic
  | 'restaurant'
  | 'cafe'
  | 'coffeeHouse' // Кофейня
  | 'walking' // Прогулки на свежем воздухе
  // cultural
  | 'museum'
  | 'gallery'
  | 'theatre'
  | 'cinema'
  // active
  //// | 'sports'
  //// | 'extreme'
  //// | 'outdoorActivities' // Активный отдых на свежем воздухе
  // entertaining
  //// | 'excitingEntertainment' // Драйвовые развлечения
  //// | 'interactive' // Интерактивные развлечения
  //// | 'eveningEntertainment' // Вечерние развлечения
  // nonstandard
  | 'masterClasses' // Мастер-классы
  //// | 'streamCocktails' // Центры паровых коктейлей
  //// | 'volunteering' // Волонтёрство



export const DateTypeData: Record<DateType, {
  color: string
  icon: React.FC<SimpleSvgIconProps>
  name: UiText
}> = {
  
  restaurant: {
    color: '#AA0A0A',
    icon: GlassAndDishIc,
    name: {
      'ru-RU': 'Ресторан',
    },
  },
  cafe: {
    color: '#FFB422',
    icon: SoupIc,
    name: {
      'ru-RU': 'Кафе',
    },
  },
  coffeeHouse: {
    color: '#754010',
    icon: CoffeeCupIc,
    name: {
      'ru-RU': 'Кофейня',
    },
  },
  walking: {
    color: '#1888AB',
    icon: FountainIc,
    name: {
      'ru-RU': 'Прогулки на свежем воздухе',
    },
  },
  
  
  museum: {
    color: '#754010',
    icon: VaseMuseumIc,
    name: {
      'ru-RU': 'Музеи',
    },
  },
  gallery: {
    color: '#1888AB',
    icon: PictureArtIc,
    name: {
      'ru-RU': 'Галереи',
    },
  },
  theatre: {
    color: '#FFB422',
    icon: MasksTheatreIc,
    name: {
      'ru-RU': 'Театры',
    },
  },
  cinema: {
    color: '#AA0A0A',
    icon: Film2Ic,
    name: {
      'ru-RU': 'Кинотеатры',
    },
  },
  
  
  masterClasses: {
    color: '#1888AB',
    icon: PresentationScreenIc,
    name: {
      'ru-RU': 'Мастер-классы',
    },
  },
}


export const allDateTypes: DateType[] = ObjectKeys(DateTypeData)