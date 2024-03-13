import { useState, SyntheticEvent } from 'react'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormHelperText from '@mui/material/FormHelperText'
import { validate } from '../../utils/validate'

type OwnProps = {
  id: string
  isPassword: boolean
  type: 'email' | 'tel' | 'text' | 'password'
  name: 'first_name' | 'second_name' | 'login' | 'email' | 'password' | 'phone'
  label: string
  autoComplete:
    | 'email'
    | 'tel'
    | 'password'
    | 'login'
    | 'first_name'
    | 'second_name'
  value: string
  onChangeValue: (value: SyntheticEvent) => void
  isErrorValue: boolean
  onSetError: (isErrorValue: boolean) => void
}

export function CustomFormControl({
  id,
  isPassword,
  type,
  name,
  label,
  autoComplete,
  value,
  onChangeValue,
  isErrorValue,
  onSetError,
}: OwnProps) {
  const [showPassword, setShowPassword] = useState(false)
  //   const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const onBlurHandle = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const { isNorm, errorText } = validate(name, target.value || '')

    if (!isNorm) {
      onSetError(true)
      setErrorText(errorText)
    }
  }
  const onFocusHandler = () => {
    onSetError(false)
    setErrorText('')
  }

  return (
    <FormControl
      sx={{ m: 1, minWidth: '18rem', width: '100%' }}
      variant="outlined"
      error={isErrorValue}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        sx={{ fontSize: '1.2rem' }}
        id={id}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        name={name}
        onBlur={e => onBlurHandle(e)}
        onFocus={onFocusHandler}
        onChange={onChangeValue}
        value={value}
        endAdornment={
          isPassword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(showPassword => !showPassword)}
                //   onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        label={label}
        autoComplete={autoComplete}
      />
      {isErrorValue && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  )
}
