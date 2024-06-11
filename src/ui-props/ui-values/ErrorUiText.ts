import { UiValues } from '@util/ui-text/UiText.ts'




export const ErrorUiText = {
  
  unknownError: {
    'en-US': 'Unknown error',
    'ru-RU': 'Неизвестная ошибка',
  },
  unknownErrorTemplate: {
    'en-US': (err: string)=>`Unknown error: ${err}`,
    'ru-RU': (err: string)=>`Неизвестная ошибка: ${err}`,
  },
  connectionError: {
    'en-US': 'Error connecting to the server, perhaps something with the Internet',
    'ru-RU': 'Ошибка соединения с сервером, возможно что-то с интернетом',
  },
  
  
  emailIsNotEntered: {
    'en-US': 'Email is not entered',
    'ru-RU': 'Email не введён',
  },
  emailFormatIsIncorrect: {
    'en-US': 'Email format is incorrect',
    'ru-RU': 'Некорректный формат email',
  },
  emailMaxLenIs100: {
    'en-US': 'Email max length is 100 chars',
    'ru-RU': 'Максимальная длина email - 100 символов',
  },
  userWithSuchEmailAlreadyRegistered: {
    'en-US': 'User with such email is already registered',
    'ru-RU': 'Пользователь с таким email уже зарегестрирован',
  },
  
  
  pwdIsNotEntered: {
    'en-US': 'Password is not entered',
    'ru-RU': 'Пароль не введён',
  },
  pwdFormatIsIncorrect: {
    'en-US': 'Password must be at least 6 characters long',
    'ru-RU': 'Пароль должен быть не короче 6 символов',
  },
  pwdMaxLenIs200: {
    'en-US': 'Password max length is 200 chars',
    'ru-RU': 'Максимальная длина пароля - 200 символов',
  },
  wrongPwd: {
    'en-US': 'Wrong password',
    'ru-RU': 'Неправильный пароль',
  },
  repeatPwd: {
    'en-US': 'Repeat password',
    'ru-RU': 'Повторите пароль',
  },
  passwordsDoNotMatch: {
    'en-US': 'Passwords do not match',
    'ru-RU': 'Пароли не совпадают',
  },
  currentPwdNotEntered: {
    'en-US': 'Current password is not entered',
    'ru-RU': 'Текущий пароль не введён',
  },
  currentPwdMaxLenIs200: {
    'en-US': 'Current password max length is 200 chars',
    'ru-RU': 'Максимальная длина текущего пароля - 200 символов',
  },
  
  
  nameIsNotEntered: {
    'en-US': 'Name is not entered',
    'ru-RU': 'Имя не введено',
  },
  nameMaxLenIs100: {
    'en-US': 'Name max length is 100 chars',
    'ru-RU': 'Максимальная длина имени - 100 символов',
  },
  
  
  noUserWithSuchId: {
    'en-US': 'No user with such id',
    'ru-RU': 'Нет пользователя с таким id',
  },
  
  
  birthDateIsNotEntered: {
    'en-US': 'Birth date is not entered',
    'ru-RU': 'Дата рождения не введена',
  },
  birthDateHasIncorrectFormat: {
    'en-US': 'Birth date has incorrect format',
    'ru-RU': 'Некорректный формат даты рождения',
  },
  dateNotExists: {
    'en-US': 'Date does not exists',
    'ru-RU': 'Дата не существует',
  },
  youMustBeAtLeast18YearsOld: {
    'en-US': 'You must be at least 18 years old',
    'ru-RU': 'Вам нет 18 лет',
  },
  
  
  genderIsNotChosen: {
    'en-US': 'Sex is not chosen',
    'ru-RU': 'Пол не выбран',
  },
  
  
  descriptionMaxLenIs2000: {
    'en-US': 'Description max length is 2000 chars',
    'ru-RU': 'Максимальная длина описания - 2000 символов',
  },
  
  
  loginIsNotEntered: {
    'en-US': 'Login is not entered',
    'ru-RU': 'Логин не введён',
  },
  loginFormatIsIncorrect: {
    'en-US': 'Login format is incorrect',
    'ru-RU': 'Некорректный формат логина',
  },
  
  
  noUserWithSuchLoginPwd: {
    'en-US': 'There is no user with such login-password',
    'ru-RU': 'Не найдено пользователя с таким логином-паролем',
  },
  
  
} satisfies UiValues