import { useState, SyntheticEvent } from 'react'
import { CustomFormControl } from '../custom-formcontrol/customFormControl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function LoginForm() {
  const [loginValue, setLoginValue] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const onChangeLoginValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setLoginValue(target.value)
  }
  const onChangePassValue = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setPasswordValue(target.value)
  }
  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    if (loginError || passwordError) return
    console.log('логин:', loginValue, 'пароль:', passwordValue)
    setLoginValue('')
    setPasswordValue('')
    setLoginError(false)
    setPasswordError(false)
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
      gap={2}
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
        value={loginValue}
        onChangeValue={onChangeLoginValue}
        isErrorValue={loginError}
        onSetError={setLoginError}
      />
      <CustomFormControl
        isPassword={true}
        type="password"
        name="password"
        id="password-in-loginform"
        label="Пароль"
        autoComplete="password"
        value={passwordValue}
        onChangeValue={onChangePassValue}
        isErrorValue={passwordError}
        onSetError={setPasswordError}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ width: '12rem', height: '3rem' }}>
        Войти
      </Button>
      <Button
        type="submit"
        variant="text"
        size="medium"
        sx={{ height: '3rem' }}>
        Зарегистрироваться
      </Button>
      <Typography variant="caption" gutterBottom>
        Забыли пароль?
      </Typography>
    </Box>
  )
}
