import React, { useState } from 'react'
import Box from '@mui/material/Box'
// import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Box
      component="form"
      //   height={200}
      //   width={200}
      my={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      p={2}
      onSubmit={e => {
        e.preventDefault()
        console.log('submit')
      }}>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <FormControl sx={{ m: 1, width: '25rem' }} variant="outlined">
        <InputLabel htmlFor="login-in-loginform">Login</InputLabel>
        <OutlinedInput
          sx={{ fontSize: '1.2rem' }}
          id="login-in-loginform"
          type="text"
          label="Login"
          autoComplete="login"
        />
        <FormHelperText error>неправильный ввод</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, width: '25rem' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          sx={{ fontSize: '1.2rem' }}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(showPassword => !showPassword)}
                //   onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          autoComplete="password"
        />
        <FormHelperText error>неправильный ввод</FormHelperText>
      </FormControl>
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
