import { Lang } from 'src/utils/lang/Lang'
import { CommonUiText } from 'src/utils/lang/ui-values/CommonUiText'
import { UiText, UiValues } from 'src/utils/lang/UiText'
import AppLangEnum = Lang.AppLangEnum




export const ProfileUiText = {
  
  
  profile: CommonUiText.profile,
  
  reset: CommonUiText.reset,
  
  name: CommonUiText.name,
  namePlaceholder: CommonUiText.namePlaceholder,
  birthDate: CommonUiText.birthDate,
  birthDatePlaceholder: CommonUiText.birthDatePlaceholder,
  gender: CommonUiText.gender,
  male: CommonUiText.male,
  female: CommonUiText.female,
  
  
  aboutMe: [
    {
      value: 'aboutMe',
      lang: AppLangEnum.eng,
      text: 'About me',
    },{
      value: 'aboutMe',
      lang: AppLangEnum.rus,
      text: 'Обо мне',
    },
  ] satisfies UiText<'aboutMe'>[],
  
  
  imLookingFor: [
    {
      value: 'imLookingFor',
      lang: AppLangEnum.eng,
      text: "I'm looking for",
    },{
      value: 'imLookingFor',
      lang: AppLangEnum.rus,
      text: 'Я ищу',
    },
  ] satisfies UiText<'imLookingFor'>[],
  
  
  notSelected: CommonUiText.notSelected,
  ofGuys: CommonUiText.ofGuys,
  ofGirls: CommonUiText.ofGirls,
  ofGuysAndGirls: CommonUiText.ofGuysAndGirls,
  
  
  update: CommonUiText.update,
  updated: CommonUiText.updated,
  
  
  
  nameIsNotEntered: CommonUiText.nameIsNotEntered,
  nameMaxLenIs100: CommonUiText.nameMaxLenIs100,
  noUserWithSuchId: CommonUiText.noUserWithSuchId,
  birthDateIsNotEntered: CommonUiText.birthDateIsNotEntered,
  birthDateHasIncorrectFormat: CommonUiText.birthDateHasIncorrectFormat,
  dateNotExists: CommonUiText.dateNotExists,
  youMustBeAtLeast18YearsOld: CommonUiText.youMustBeAtLeast18YearsOld,
  genderIsNotChosen: CommonUiText.genderIsNotChosen,
  descriptionMaxLenIs2000: CommonUiText.descriptionMaxLenIs2000,
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  
} satisfies UiValues