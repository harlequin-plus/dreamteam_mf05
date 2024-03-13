export function validate(
  name: string,
  value: string
): { isNorm: boolean; errorText: string } {
  if (value.trim() === '') {
    return {
      isNorm: false,
      errorText: 'Поле не должно быть пустым',
    }
  }
  if (name === 'first_name' || name === 'second_name') {
    const regexp = /^[A-ZА-ЯЁ]+([A-Za-zА-яЁа-яё-]+)*$/u
    const isNorm = regexp.test(value)
    return {
      isNorm,
      errorText: 'Имя и фамилия должны начинаться с заглавной буквы',
    }
  }
  if (name === 'login') {
    const regexp = /(?=^.{3,20}$)(\w*[a-zA-Z-_]\w*)/
    const isNorm = regexp.test(value)
    return {
      isNorm,
      errorText: 'Логин должен содержать от 3 до 20 латинских символов',
    }
  }
  if (name === 'email') {
    const regexp = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/u // /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/u проверить \.  no-useless-escape
    const isNorm = regexp.test(value)
    return { isNorm, errorText: 'Проверьте правильность email' }
  }
  if (name === 'password' || name === 'newPassword') {
    const regexp = /(?=^.{8,40}$)(?=.*\d)(?=.*[A-ZА-ЯЁ])/
    const isNorm = regexp.test(value)
    return {
      isNorm,
      errorText:
        'Пароль должен быть более 8 символов и содержать цифры и заглавные буквы',
    }
  }

  if (name === 'phone') {
    const regexp = /(?=^.{10,15}$)(^\+?\d+$)/
    const isNorm = regexp.test(value)
    return {
      isNorm,
      errorText: 'Проверьте правильность номера телефона',
    }
  }
  // if (name === "chatName") {
  //     if (value.trim() === "") return false;
  // }

  return {
    isNorm: true,
    errorText: '',
  }
}
