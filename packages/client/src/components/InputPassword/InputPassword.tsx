import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { FC, useState } from 'react'

type OwnProps = {
  label: string
  id: string
}

type Props = FC<OwnProps>

const InputPassword: Props = ({ ...otherProps }) => {
  const [showPassword, setShowPassword] = useState(false)
  const { label, id } = otherProps
  return (
    <FormControl sx={{ m: 1, width: '25rem' }} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        sx={{ fontSize: '1.2rem' }}
        id={id}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(showPassword => !showPassword)}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        autoComplete="password"
      />
      <FormHelperText error>неправильный ввод</FormHelperText>
    </FormControl>
  )
}

export default InputPassword
