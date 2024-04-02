import { useState, SyntheticEvent } from 'react'
import { CustomFormControl } from '../CustomFormControl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { signUp } from '../../services/apiService'
import { useAppDispatch } from '../../hooks/reduxTsHook'
import { fetchUser } from '../../store/userState'
import { useLocation, useNavigate } from 'react-router-dom'

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
  toggleShow: () => void
}

export function SignUpForm({ toggleShow }: Props) {
  const [user, setUser] = useState(userInitValue)
  const [errorValue, setErrorValue] = useState(errorInitValue)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const onChangeUserValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    const value = target.value
    setUser({ ...user, [name]: value })
  }

  const onChangeErrorValue = (value: boolean, name: string) => {
    setErrorValue({ ...errorValue, [name]: value })
  }

  const isEmptyValueError = (obj: typeof user) => {
    let key: keyof typeof obj
    const temp: Partial<typeof errorValue> = {}
    let error = false
    for (key in obj) {
      if (obj[key] === '') {
        temp[key] = true
        error = true
      }
    }
    if (error) setErrorValue({ ...errorValue, ...temp })
    return error
  }

  const onSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (user.password !== user.repeat_password) {
      setErrorValue({ ...errorValue, repeat_password: true })
      return
    }
    if (isEmptyValueError(user)) return
    if (
      Object.keys(errorValue).every(
        name => errorValue[name as keyof typeof errorValue] === false
      )
    ) {
      await signUp(user) //запрос на регистрацию
      dispatch(fetchUser())
      setUser(userInitValue)
      setErrorValue(errorInitValue)
      // Возврат на страницу, с которой пришли
      const back =
        location.state?.back && location.state?.back !== location.pathname
          ? location.state?.back
          : '/'
      navigate(back)
    }
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
      <Typography variant="h3" gutterBottom color={'#973232'}>
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
        sx={{ width: '12rem', height: '3rem', bgcolor: '#973232' }}>
        Зарегистрироваться
      </Button>
      <Button
        variant="text"
        size="medium"
        sx={{ height: '3rem', color: '#973232' }}
        onClick={toggleShow}>
        уже есть аккаунт, войти
      </Button>
      {/* <Typography variant="caption" gutterBottom>
        Забыли пароль?
      </Typography> */}
    </Box>
  )
}
