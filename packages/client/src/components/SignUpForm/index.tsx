import { useState, SyntheticEvent } from 'react'
import { CustomFormControl } from '../CustomFormControl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const userInitValue = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  password: '',
  repeat_password: '',
}
const errorInitValue = {
  first_name: false,
  second_name: false,
  login: false,
  email: false,
  phone: false,
  password: false,
  repeat_password: false,
}
type Props = {
  isShown: () => void
}

export function SignUpForm({ isShown }: Props) {
  const [user, setUser] = useState(userInitValue)
  const [errorValue, setErrorValue] = useState(errorInitValue)

  const onChangeUserValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    const value = target.value
    setUser({ ...user, [name]: value })
  }

  const onChangeErrorValue = (value: boolean, name: string) => {
    setErrorValue({ ...errorValue, [name]: value })
  }

  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    if (user.password !== user.repeat_password) {
      setErrorValue({ ...errorValue, repeat_password: true })
      return
    }
    if (user.first_name === '') {
      setErrorValue({ ...errorValue, first_name: true })
      return
    }
    if (user.second_name === '') {
      setErrorValue({ ...errorValue, second_name: true })
      return
    }
    if (user.login === '') {
      setErrorValue({ ...errorValue, login: true })
      return
    }
    if (user.email === '') {
      setErrorValue({ ...errorValue, email: true })
      return
    }
    if (user.phone === '') {
      setErrorValue({ ...errorValue, phone: true })
      return
    }
    if (user.password === '') {
      setErrorValue({ ...errorValue, password: true })
      return
    }

    if (
      errorValue.email ||
      errorValue.first_name ||
      errorValue.login ||
      errorValue.password ||
      errorValue.phone ||
      errorValue.repeat_password ||
      errorValue.second_name
    )
      return
    console.log(user)
    setUser(userInitValue)
    setErrorValue(errorInitValue)
  }

  return (
    <Box
      component="form"
      //   height={200}
      width={370}
      my={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={0.7}
      p={2}
      onSubmit={onSubmitHandler}>
      <Typography variant="h3" gutterBottom>
        Регистрация
      </Typography>
      <CustomFormControl
        isPassword={false}
        type="text"
        name="first_name"
        id="first_name_in_signup_form"
        label="Имя"
        autoComplete="first_name"
        value={user.first_name}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.first_name}
        onSetError={onChangeErrorValue}
      />
      <CustomFormControl
        isPassword={false}
        type="text"
        name="second_name"
        id="second_name_in_signup_form"
        label="Фамилия"
        autoComplete="second_name"
        value={user.second_name}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.second_name}
        onSetError={onChangeErrorValue}
      />
      <CustomFormControl
        isPassword={false}
        type="text"
        name="login"
        id="login_in_signup_form"
        label="Логин"
        autoComplete="login"
        value={user.login}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.login}
        onSetError={onChangeErrorValue}
      />
      <CustomFormControl
        isPassword={false}
        type="email"
        name="email"
        id="email_in_signup_form"
        label="email"
        autoComplete="email"
        value={user.email}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.email}
        onSetError={onChangeErrorValue}
      />
      <CustomFormControl
        isPassword={false}
        type="tel"
        name="phone"
        id="phone_in_signup_form"
        label="Номер телефона"
        autoComplete="phone"
        value={user.phone}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.phone}
        onSetError={onChangeErrorValue}
      />
      <CustomFormControl
        isPassword={true}
        type="password"
        name="password"
        id="password_in_signup_form"
        label="Пароль"
        autoComplete="password_game"
        value={user.password}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.password}
        onSetError={onChangeErrorValue}
      />
      <CustomFormControl
        isPassword={true}
        type="password"
        name="repeat_password"
        id="repeate_password_in_signup_form"
        label="Повторите пароль"
        autoComplete="repeat_password_game"
        value={user.repeat_password}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.repeat_password}
        onSetError={onChangeErrorValue}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ width: '12rem', height: '3rem' }}>
        Зарегистрироваться
      </Button>
      <Button
        variant="text"
        size="medium"
        sx={{ height: '3rem' }}
        onClick={isShown}>
        уже есть аккаунт, войти
      </Button>
      {/* <Typography variant="caption" gutterBottom>
        Забыли пароль?
      </Typography> */}
    </Box>
  )
}
