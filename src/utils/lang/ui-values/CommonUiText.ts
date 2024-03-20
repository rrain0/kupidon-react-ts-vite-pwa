import { Lang } from 'src/utils/lang/Lang'
import { UiText, UiValues } from 'src/utils/lang/UiText'
import AppLangEnum = Lang.AppLangEnum




export const CommonUiText = {
  
  
  loginEmailPlaceholder: [
    {
      value: 'loginPlaceholder',
      lang: AppLangEnum.eng,
      text: 'login (email)',
    },{
      value: 'loginPlaceholder',
      lang: AppLangEnum.rus,
      text: 'логин (email)',
    },
  ] satisfies UiText<'loginPlaceholder'>[],
  
  
  emailLoginPlaceholder: [
    {
      value: 'emailPlaceholder',
      lang: AppLangEnum.eng,
      text: 'email (login)',
    },{
      value: 'emailPlaceholder',
      lang: AppLangEnum.rus,
      text: 'email (логин)',
    },
  ] satisfies UiText<'emailPlaceholder'>[],
  
  
  currentPwdPlaceholder: [
    {
      value: 'currentPwdPlaceholder',
      lang: AppLangEnum.eng,
      text: 'current password',
    },{
      value: 'currentPwdPlaceholder',
      lang: AppLangEnum.rus,
      text: 'текущий пароль',
    },
  ] satisfies UiText<'currentPwdPlaceholder'>[],
  pwdPlaceholder: [
    {
      value: 'pwdPlaceholder',
      lang: AppLangEnum.eng,
      text: 'password',
    },{
      value: 'pwdPlaceholder',
      lang: AppLangEnum.rus,
      text: 'пароль',
    },
  ] satisfies UiText<'pwdPlaceholder'>[],
  newPwdPlaceholder: [
    {
      value: 'newPwdPlaceholder',
      lang: AppLangEnum.eng,
      text: 'new password',
    },{
      value: 'newPwdPlaceholder',
      lang: AppLangEnum.rus,
      text: 'новый пароль',
    },
  ] satisfies UiText<'newPwdPlaceholder'>[],
  repeatPwdPlaceholder: [
    {
      value: 'repeatPwdPlaceholder',
      lang: AppLangEnum.eng,
      text: 'repeat password',
    }, {
      value: 'repeatPwdPlaceholder',
      lang: AppLangEnum.rus,
      text: 'повторите пароль',
    },
  ] satisfies UiText<'repeatPwdPlaceholder'>[],
  
  
  namePlaceholder: [
    {
      value: 'namePlaceholder',
      lang: AppLangEnum.eng,
      text: 'name',
    },{
      value: 'namePlaceholder',
      lang: AppLangEnum.rus,
      text: 'имя',
    },
  ] satisfies UiText<'namePlaceholder'>[],
  
  
  birthDatePlaceholder: [
    {
      value: 'birthDatePlaceholder',
      lang: AppLangEnum.eng,
      text: 'birth date (yyyy-MM-dd) (2002-01-01)',
    },{
      value: 'birthDatePlaceholder',
      lang: AppLangEnum.rus,
      text: 'дата рождения (гггг-ММ-дд) (2002-01-01)',
    },
  ] satisfies UiText<'birthDatePlaceholder'>[],
  
  
  login: [
    {
      value: 'login',
      lang: AppLangEnum.eng,
      text: 'Login',
    },{
      value: 'login',
      lang: AppLangEnum.rus,
      text: 'Вход',
    },
  ] satisfies UiText<'login'>[],
  
  
  doLogin: [
    {
      value: 'doLogin',
      lang: AppLangEnum.eng,
      text: 'Login',
    },{
      value: 'doLogin',
      lang: AppLangEnum.rus,
      text: 'Войти',
    },
  ] satisfies UiText<'doLogin'>[],
  
  
  loggingIn: [
    {
      value: 'loggingIn',
      lang: AppLangEnum.eng,
      text: 'Logging In',
    },{
      value: 'loggingIn',
      lang: AppLangEnum.rus,
      text: 'Вход',
    },
  ] satisfies UiText<'loggingIn'>[],
  
  
  loginCompleted: [
    {
      value: 'loginCompleted',
      lang: AppLangEnum.eng,
      text: 'Login is completed',
    },{
      value: 'loginCompleted',
      lang: AppLangEnum.rus,
      text: 'Вход выполнен',
    },
  ] satisfies UiText<'loginCompleted'>[],
  
  
  signup: [
    {
      value: 'signup',
      lang: AppLangEnum.eng,
      text: 'Sign up',
    },{
      value: 'signup',
      lang: AppLangEnum.rus,
      text: 'Зарегистрироваться',
    },
  ] satisfies UiText<'signup'>[],
  
  
  registration: [
    {
      value: 'signingUp',
      lang: AppLangEnum.eng,
      text: 'Registration',
    },{
      value: 'signingUp',
      lang: AppLangEnum.rus,
      text: 'Регистрация',
    },
  ] satisfies UiText<'signingUp'>[],
  
  
  update: [
    {
      value: 'update',
      lang: AppLangEnum.eng,
      text: 'Update',
    },{
      value: 'update',
      lang: AppLangEnum.rus,
      text: 'Обновление',
    },
  ] satisfies UiText<'update'>[],
  
  
  updated: [
    {
      value: 'updated',
      lang: AppLangEnum.eng,
      text: 'Updated',
    },{
      value: 'updated',
      lang: AppLangEnum.rus,
      text: 'Обновлено',
    },
  ] satisfies UiText<'updated'>[],
  
  
  registrationCompleted: [
    {
      value: 'registrationCompleted',
      lang: AppLangEnum.eng,
      text: 'Registration completed',
    },{
      value: 'registrationCompleted',
      lang: AppLangEnum.rus,
      text: 'Регистрация завершена',
    },
  ] satisfies UiText<'registrationCompleted'>[],
  
  
  userSuccessfullyRegistered: [
    {
      value: 'userSuccessfullyRegistered',
      lang: AppLangEnum.eng,
      text: 'User successfully registered',
    },{
      value: 'userSuccessfullyRegistered',
      lang: AppLangEnum.rus,
      text: 'Пользователь успешно зарегистрирован',
    },
  ] satisfies UiText<'userSuccessfullyRegistered'>[],
  
  
  changePwd: [
    {
      value: 'changePwd',
      lang: AppLangEnum.eng,
      text: 'Change password',
    },{
      value: 'changePwd',
      lang: AppLangEnum.rus,
      text: 'Смена пароля',
    },
  ] satisfies UiText<'changePwd'>[],
  
  
  doChangePwd: [
    {
      value: 'doChangePwd',
      lang: AppLangEnum.eng,
      text: 'Change password',
    },{
      value: 'doChangePwd',
      lang: AppLangEnum.rus,
      text: 'Изменить пароль',
    },
  ] satisfies UiText<'doChangePwd'>[],
  
  
  pwdRecovery: [
    {
      value: 'pwdRecovery',
      lang: AppLangEnum.eng,
      text: 'Password recovery',
    },{
      value: 'pwdRecovery',
      lang: AppLangEnum.rus,
      text: 'Восстановление пароля',
    },
  ] satisfies UiText<'pwdRecovery'>[],
  
  
  logOutFromAccount: [
    {
      value: 'logOutFromAccount',
      lang: AppLangEnum.eng,
      text: 'Log out of your account',
    },{
      value: 'logOutFromAccount',
      lang: AppLangEnum.rus,
      text: 'Выйти из аккаунта',
    },
  ] satisfies UiText<'logOutFromAccount'>[],
  
  
  deleteAccount: [
    {
      value: 'deleteAccount',
      lang: AppLangEnum.eng,
      text: 'Delete Account',
    },{
      value: 'deleteAccount',
      lang: AppLangEnum.rus,
      text: 'Удалить Аккаунт',
    },
  ] satisfies UiText<'deleteAccount'>[],
  
  
  profile: [
    {
      value: 'profile',
      lang: AppLangEnum.eng,
      text: 'Profile',
    },{
      value: 'profile',
      lang: AppLangEnum.rus,
      text: 'Профиль',
    },
  ] satisfies UiText<'profile'>[],
  
  
  currentPwd: [
    {
      value: 'currentPwd',
      lang: AppLangEnum.eng,
      text: 'Current pwd',
    },{
      value: 'currentPwd',
      lang: AppLangEnum.rus,
      text: 'Текущий пароль',
    },
  ] satisfies UiText<'currentPwd'>[],
  pwd: [
    {
      value: 'pwd',
      lang: AppLangEnum.eng,
      text: 'Password',
    },{
      value: 'pwd',
      lang: AppLangEnum.rus,
      text: 'Пароль',
    },
  ] satisfies UiText<'pwd'>[],
  newPwd: [
    {
      value: 'newPwd',
      lang: AppLangEnum.eng,
      text: 'New password',
    },{
      value: 'newPwd',
      lang: AppLangEnum.rus,
      text: 'Новый пароль',
    },
  ] satisfies UiText<'newPwd'>[],
  repeatPwd: [
    {
      value: 'repeatPwd',
      lang: AppLangEnum.eng,
      text: 'Repeat password',
    },{
      value: 'repeatPwd',
      lang: AppLangEnum.rus,
      text: 'Повторите пароль',
    },
  ] satisfies UiText<'repeatPwd'>[],
  
  
  name: [
    {
      value: 'name',
      lang: AppLangEnum.eng,
      text: 'Name',
    },
    {
      value: 'name',
      lang: AppLangEnum.rus,
      text: 'Имя',
    },
  ] satisfies UiText<'name'>[],
  
  
  birthDate: [
    {
      value: 'birthDate',
      lang: AppLangEnum.eng,
      text: 'Birth date',
    },
    {
      value: 'birthDate',
      lang: AppLangEnum.rus,
      text: 'Дата рождения',
    },
  ] satisfies UiText<'birthDate'>[],
  
  
  gender: [
    {
      value: 'gender',
      lang: AppLangEnum.eng,
      text: 'Sex',
    },
    {
      value: 'gender',
      lang: AppLangEnum.rus,
      text: 'Пол',
    },
  ] satisfies UiText<'gender'>[],
  
  
  male: [
    {
      value: 'male',
      lang: AppLangEnum.eng,
      text: 'Male',
    },{
      value: 'male',
      lang: AppLangEnum.rus,
      text: 'Мужской',
    },
  ] satisfies UiText<'male'>[],
  
  
  female: [
    {
      value: 'female',
      lang: AppLangEnum.eng,
      text: 'Female',
    },{
      value: 'female',
      lang: AppLangEnum.rus,
      text: 'Женский',
    },
  ] satisfies UiText<'female'>[],
  
  
  chat: [
    {
      value: 'chat',
      lang: AppLangEnum.eng,
      text: 'Chat',
    },{
      value: 'chat',
      lang: AppLangEnum.rus,
      text: 'Чат',
    },
  ] satisfies UiText<'chat'>[],
  
  
  settings: [
    {
      value: 'settings',
      lang: AppLangEnum.eng,
      text: 'Settings',
    },{
      value: 'settings',
      lang: AppLangEnum.rus,
      text: 'Настройки',
    },
  ] satisfies UiText<'settings'>[],
  
  
  theme: [
    {
      value: 'theme',
      lang: AppLangEnum.eng,
      text: 'Theme',
    },{
      value: 'theme',
      lang: AppLangEnum.rus,
      text: 'Тема',
    },
  ] satisfies UiText<'theme'>[],
  systemTheme: [
    {
      value: 'systemTheme',
      lang: AppLangEnum.eng,
      text: 'System theme',
    },{
      value: 'systemTheme',
      lang: AppLangEnum.rus,
      text: 'Тема системы',
    },
  ] satisfies UiText<'systemTheme'>[],
  lightTheme: [
    {
      value: 'lightTheme',
      lang: AppLangEnum.eng,
      text: 'Light theme',
    },{
      value: 'lightTheme',
      lang: AppLangEnum.rus,
      text: 'Светлая тема',
    },
  ] satisfies UiText<'lightTheme'>[],
  darkTheme: [
    {
      value: 'darkTheme',
      lang: AppLangEnum.eng,
      text: 'Dark theme',
    },{
      value: 'darkTheme',
      lang: AppLangEnum.rus,
      text: 'Тёмная тема',
    },
  ] satisfies UiText<'darkTheme'>[],
  preferredLightTheme: [
    {
      value: 'preferredLightTheme',
      lang: AppLangEnum.eng,
      text: 'Preferred light theme',
    },{
      value: 'preferredLightTheme',
      lang: AppLangEnum.rus,
      text: 'Предпочитаемая светлая тема',
    },
  ] satisfies UiText<'preferredLightTheme'>[],
  preferredDarkTheme: [
    {
      value: 'preferredDarkTheme',
      lang: AppLangEnum.eng,
      text: 'Preferred dark theme',
    },{
      value: 'preferredDarkTheme',
      lang: AppLangEnum.rus,
      text: 'Предпочитаемая тёмная тема',
    },
  ] satisfies UiText<'preferredDarkTheme'>[],
  
  
  language: [
    {
      value: 'language',
      lang: AppLangEnum.eng,
      text: 'Language',
    },{
      value: 'language',
      lang: AppLangEnum.rus,
      text: 'Язык',
    },
  ] satisfies UiText<'language'>[],
  systemLanguage: [
    {
      value: 'systemLanguage',
      lang: AppLangEnum.eng,
      text: 'System language',
    },{
      value: 'systemLanguage',
      lang: AppLangEnum.rus,
      text: 'Язык системы',
    },
  ] satisfies UiText<'systemLanguage'>[],
  russian: [
    {
      value: 'russian',
      lang: AppLangEnum.rus,
      text: 'Русский',
    },
  ] satisfies UiText<'russian'>[],
  english: [
    {
      value: 'english',
      lang: AppLangEnum.eng,
      text: 'English',
    },
  ] satisfies UiText<'english'>[],
  
  
  accountSettings: [
    {
      value: 'accountSettings',
      lang: AppLangEnum.eng,
      text: 'Account Settings',
    },{
      value: 'accountSettings',
      lang: AppLangEnum.rus,
      text: 'Настройки Аккаунта',
    },
  ] satisfies UiText<'accountSettings'>[],
  
  
  appSettings: [
    {
      value: 'appSettings',
      lang: AppLangEnum.eng,
      text: 'Application settings',
    },{
      value: 'appSettings',
      lang: AppLangEnum.rus,
      text: 'Настройки приложения',
    },
  ] satisfies UiText<'appSettings'>[],
  
  
  account: [
    {
      value: 'account',
      lang: AppLangEnum.eng,
      text: 'Account',
    },{
      value: 'account',
      lang: AppLangEnum.rus,
      text: 'Аккаунт',
    },
  ] satisfies UiText<'account'>[],
  
  
  testPage: [
    {
      value: 'testPage',
      lang: AppLangEnum.eng,
      text: 'Test page',
    },{
      value: 'testPage',
      lang: AppLangEnum.rus,
      text: 'Тестовая страница',
    },
  ] satisfies UiText<'testPage'>[],
  
  
  reloading: [
    {
      value: 'reloading',
      lang: AppLangEnum.eng,
      text: 'Reloading',
    },{
      value: 'reloading',
      lang: AppLangEnum.rus,
      text: 'Перезагрузка',
    },
  ] satisfies UiText<'reloading'>[],
  
  
  yes: [
    {
      value: 'yes',
      lang: AppLangEnum.eng,
      text: 'Yes',
    },{
      value: 'yes',
      lang: AppLangEnum.rus,
      text: 'Да',
    },
  ] satisfies UiText<'yes'>[],
  
  
  no: [
    {
      value: 'no',
      lang: AppLangEnum.eng,
      text: 'No',
    },{
      value: 'no',
      lang: AppLangEnum.rus,
      text: 'Нет',
    },
  ] satisfies UiText<'no'>[],
  
  
  reset: [
    {
      value: 'reset',
      lang: AppLangEnum.eng,
      text: 'Reset',
    },{
      value: 'reset',
      lang: AppLangEnum.rus,
      text: 'Сброс',
    },
  ] satisfies UiText<'reset'>[],
  
  
  
  
  
  
  
  
  clearAppData: [
    {
      value: 'clearAppData',
      lang: AppLangEnum.eng,
      text: 'Clear app data',
    },{
      value: 'clearAppData',
      lang: AppLangEnum.rus,
      text: 'Очистить данные приложения',
    },
  ] satisfies UiText<'clearAppData'>[],
  
  installApp: [
    {
      value: 'installApp',
      lang: AppLangEnum.eng,
      text: 'Install App',
    },{
      value: 'installApp',
      lang: AppLangEnum.rus,
      text: 'Установить Приложение',
    },
  ] satisfies UiText<'installApp'>[],
  
  
  
  
  
  
  notSelected: [
    {
      value: 'notSelected',
      lang: AppLangEnum.eng,
      text: "Not selected",
    },{
      value: 'notSelected',
      lang: AppLangEnum.rus,
      text: 'Не выбрано',
    },
  ] satisfies UiText<'notSelected'>[],
  
  
  ofGuys: [
    {
      value: 'ofGuys',
      lang: AppLangEnum.eng,
      text: "Guys",
    },{
      value: 'ofGuys',
      lang: AppLangEnum.rus,
      text: 'Парней',
    },
  ] satisfies UiText<'ofGuys'>[],
  
  ofGirls: [
    {
      value: 'ofGirls',
      lang: AppLangEnum.eng,
      text: "Girls",
    },{
      value: 'ofGirls',
      lang: AppLangEnum.rus,
      text: 'Девушек',
    },
  ] satisfies UiText<'ofGirls'>[],
  
  ofGuysAndGirls: [
    {
      value: 'ofGuysAndGirls',
      lang: AppLangEnum.eng,
      text: "Guys and girls",
    },{
      value: 'ofGuysAndGirls',
      lang: AppLangEnum.rus,
      text: 'Парней и девушек',
    },
  ] satisfies UiText<'ofGuysAndGirls'>[],
  
  
  loginNotEntered: [
    {
      value: 'loginNotEntered',
      lang: AppLangEnum.eng,
      text: 'Login is not entered',
    },
    {
      value: 'loginNotEntered',
      lang: AppLangEnum.rus,
      text: 'Логин не введён',
    },
  ] satisfies UiText<'loginNotEntered'>[],
  
  
  loginFormatIsIncorrect: [
    {
      value: 'loginFormatIsIncorrect',
      lang: AppLangEnum.eng,
      text: 'Login format is incorrect',
    },{
      value: 'loginFormatIsIncorrect',
      lang: AppLangEnum.rus,
      text: 'Некорректный формат логина',
    },
  ] satisfies UiText<'loginFormatIsIncorrect'>[],
  
  
  emailNotEntered: [
    {
      value: 'emailNotEntered',
      lang: AppLangEnum.eng,
      text: 'Email is not entered',
    },{
      value: 'emailNotEntered',
      lang: AppLangEnum.rus,
      text: 'Email не введён',
    },
  ] satisfies UiText<'emailNotEntered'>[],
  
  
  emailFormatIsIncorrect: [
    {
      value: 'emailFormatIsIncorrect',
      lang: AppLangEnum.eng,
      text: 'Email format is incorrect',
    },{
      value: 'emailFormatIsIncorrect',
      lang: AppLangEnum.rus,
      text: 'Некорректный формат email',
    },
  ] satisfies UiText<'emailFormatIsIncorrect'>[],
  
  
  pwdNotEntered: [
    {
      value: 'pwdNotEntered',
      lang: AppLangEnum.eng,
      text: 'Password not entered',
    },{
      value: 'pwdNotEntered',
      lang: AppLangEnum.rus,
      text: 'Пароль не введён',
    },
  ] satisfies UiText<'pwdNotEntered'>[],
  
  
  pwdFormatIsIncorrect: [
    {
      value: 'pwdFormatIsIncorrect',
      lang: AppLangEnum.eng,
      text: 'Password must be at least 6 characters long',
    },{
      value: 'pwdFormatIsIncorrect',
      lang: AppLangEnum.rus,
      text: 'Пароль должен быть не короче 6 символов',
    },
  ] satisfies UiText<'pwdFormatIsIncorrect'>[],
  
  
  passwordsDoNotMatch: [
    {
      value: 'passwordsDoNotMatch',
      lang: AppLangEnum.eng,
      text: 'Passwords do not match',
    },{
      value: 'passwordsDoNotMatch',
      lang: AppLangEnum.rus,
      text: 'Пароли не совпадают',
    },
  ] satisfies UiText<'passwordsDoNotMatch'>[],
  
  
  nameIsNotEntered: [
    {
      value: 'firstNameIsNotEntered',
      lang: AppLangEnum.eng,
      text: 'First name is not entered',
    },{
      value: 'firstNameIsNotEntered',
      lang: AppLangEnum.rus,
      text: 'Имя не введено',
    },
  ] satisfies UiText<'firstNameIsNotEntered'>[],
  
  
  noUserWithSuchId: [
    {
      value: 'noUserWithSuchId',
      lang: AppLangEnum.eng,
      text: 'No user with such id',
    },{
      value: 'noUserWithSuchId',
      lang: AppLangEnum.rus,
      text: 'Нет пользователя с таким id',
    },
  ] satisfies UiText<'noUserWithSuchId'>[],
  
  
  genderIsNotChosen: [
    {
      value: 'genderIsNotChosen',
      lang: AppLangEnum.eng,
      text: 'Sex is not chosen',
    },{
      value: 'genderIsNotChosen',
      lang: AppLangEnum.rus,
      text: 'Пол не выбран',
    },
  ] satisfies UiText<'genderIsNotChosen'>[],
  
  
  birthDateIsNotEntered: [
    {
      value: 'birthDateIsNotEntered',
      lang: AppLangEnum.eng,
      text: 'Birth date is not entered',
    },{
      value: 'birthDateIsNotEntered',
      lang: AppLangEnum.rus,
      text: 'Дата рождения не введена',
    },
  ] satisfies UiText<'birthDateIsNotEntered'>[],
  
  
  birthDateIsIncorrect: [
    {
      value: 'birthDateIsIncorrect',
      lang: AppLangEnum.eng,
      text: 'Birth date is incorrect',
    },{
      value: 'birthDateIsIncorrect',
      lang: AppLangEnum.rus,
      text: 'Дата рождения не корректна',
    },
  ] satisfies UiText<'birthDateIsIncorrect'>[],
  
  
  birthDateHasIncorrectFormat: [
    {
      value: 'birthDateHasIncorrectFormat',
      lang: AppLangEnum.eng,
      text: 'Birth date has incorrect format',
    },{
      value: 'birthDateHasIncorrectFormat',
      lang: AppLangEnum.rus,
      text: 'Некорректный формат даты рождения',
    },
  ] satisfies UiText<'birthDateHasIncorrectFormat'>[],
  
  
  dateNotExists: [
    {
      value: 'dateNotExists',
      lang: AppLangEnum.eng,
      text: 'Date does not exists',
    },{
      value: 'dateNotExists',
      lang: AppLangEnum.rus,
      text: 'Дата не существует',
    },
  ] satisfies UiText<'dateNotExists'>[],
  
  
  youMustBeAtLeast18YearsOld: [
    {
      value: 'youMustBeAtLeast18YearsOld',
      lang: AppLangEnum.eng,
      text: 'You must be at least 18 years old',
    },{
      value: 'youMustBeAtLeast18YearsOld',
      lang: AppLangEnum.rus,
      text: 'Вам нет 18 лет',
    },
  ] satisfies UiText<'youMustBeAtLeast18YearsOld'>[],
  
  
  descriptionMaxLenIs2000: [
    {
      value: 'descriptionMaxLenIs2000',
      lang: AppLangEnum.eng,
      text: 'Description max length is 2000 chars',
    },{
      value: 'descriptionMaxLenIs2000',
      lang: AppLangEnum.rus,
      text: 'Максимальная длина описания - 2000 символов',
    },
  ] satisfies UiText<'descriptionMaxLenIs2000'>[],
  
  
  emailMaxLenIs100: [
    {
      value: 'emailMaxLenIs100',
      lang: AppLangEnum.eng,
      text: 'Email max length is 100 chars',
    },{
      value: 'emailMaxLenIs100',
      lang: AppLangEnum.rus,
      text: 'Максимальная длина email - 100 символов',
    },
  ] satisfies UiText<'emailMaxLenIs100'>[],
  
  
  pwdMaxLenIs200: [
    {
      value: 'pwdMaxLenIs200',
      lang: AppLangEnum.eng,
      text: 'Password max length is 200 chars',
    },{
      value: 'pwdMaxLenIs200',
      lang: AppLangEnum.rus,
      text: 'Максимальная длина пароля - 200 символов',
    },
  ] satisfies UiText<'pwdMaxLenIs200'>[],
  
  
  nameMaxLenIs100: [
    {
      value: 'nameMaxLenIs100',
      lang: AppLangEnum.eng,
      text: 'Name max length is 100 chars',
    },{
      value: 'nameMaxLenIs100',
      lang: AppLangEnum.rus,
      text: 'Максимальная длина имени - 100 символов',
    },
  ] satisfies UiText<'nameMaxLenIs100'>[],
  
  
  noUserWithSuchLoginPwd: [
    {
      value: 'noUserWithSuchLoginPwd',
      lang: AppLangEnum.eng,
      text: 'There is no user with such login-password',
    },{
      value: 'noUserWithSuchLoginPwd',
      lang: AppLangEnum.rus,
      text: 'Не найдено пользователя с таким логином-паролем',
    },
  ] satisfies UiText<'noUserWithSuchLoginPwd'>[],
  
  
  userWithSuchEmailAlreadyRegistered: [
    {
      value: 'userWithSuchEmailAlreadyRegistered',
      lang: AppLangEnum.eng,
      text: 'User with such email is already registered',
    },{
      value: 'userWithSuchEmailAlreadyRegistered',
      lang: AppLangEnum.rus,
      text: 'Пользователь с таким email уже зарегестрирован',
    },
  ] satisfies UiText<'userWithSuchEmailAlreadyRegistered'>[],
  
  
  connectionError: [
    {
      value: 'connectionError',
      lang: AppLangEnum.eng,
      text: 'Error connecting to the server, perhaps something with the Internet',
    },{
      value: 'connectionError',
      lang: AppLangEnum.rus,
      text: 'Ошибка соединения с сервером, возможно что-то с интернетом',
    },
  ] satisfies UiText<'connectionError'>[],
  
  
  unknownError: [
    {
      value: 'unknownError',
      lang: AppLangEnum.eng,
      text: 'Unknown error',
    },{
      value: 'unknownError',
      lang: AppLangEnum.rus,
      text: 'Неизвестная ошибка',
    },
  ] satisfies UiText<'unknownError'>[],
  
  
} satisfies UiValues