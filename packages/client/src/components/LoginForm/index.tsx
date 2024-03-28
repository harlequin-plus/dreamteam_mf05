import { useState, SyntheticEvent } from 'react'
import { CustomFormControl } from '../CustomFormControl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { signIn } from '../../services/apiService'
import { useAppDispatch } from '../../hooks/reduxTsHook'
import { fetchUser } from '../../store/userState'

const userInitValue = {
  login: '',
  password: '',
}
const errorInitValue = {
  login: false,
  password: false,
}

type Props = {
  toggleShow: () => void
}
export function LoginForm({ toggleShow }: Props) {
  const [user, setUser] = useState(userInitValue)
  const [errorValue, setErrorValue] = useState(errorInitValue)
  const dispatch = useAppDispatch()

  const onChangeUserValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    const value = target.value
    setUser({ ...user, [name]: value })
  }

  const onChangeErrorValue = (value: boolean, name: string) => {
    setErrorValue({ ...errorValue, [name]: value })
  }
  const onSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (user.login === '') {
      setErrorValue({ ...errorValue, login: true })
      return
    }
    if (user.password === '') {
      setErrorValue({ ...errorValue, password: true })
      return
    }
    if (errorValue.login || errorValue.password) return
    await signIn(user) //запрос на вход
    dispatch(fetchUser())
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
      gap={1}
      p={2}
      onSubmit={onSubmitHandler}>
      <Typography variant="h3" gutterBottom>
        Вход
      </Typography>
      <CustomFormControl
        isPassword={false}
        type="text"
        name="login"
        id="login-in-loginform"
        label="Логин"
        autoComplete="login"
        value={user.login}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.login}
        onSetError={onChangeErrorValue}
      />
      <CustomFormControl
        isPassword={true}
        type="password"
        name="password"
        id="password-in-loginform"
        label="Пароль"
        autoComplete="password_game"
        value={user.password}
        onChangeValue={onChangeUserValue}
        isErrorValue={errorValue.password}
        onSetError={onChangeErrorValue}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ width: '12rem', height: '3rem' }}>
        Войти
      </Button>
      <Button
        variant="text"
        size="medium"
        sx={{ height: '3rem' }}
        onClick={toggleShow}>
        Зарегистрироваться
      </Button>
      {/* <Typography variant="caption" gutterBottom>
        Забыли пароль?
      </Typography> */}
    </Box>
  )
}
