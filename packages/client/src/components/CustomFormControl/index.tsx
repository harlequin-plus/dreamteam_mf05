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
  name:
    | 'first_name'
    | 'second_name'
    | 'login'
    | 'email'
    | 'password'
    | 'phone'
    | 'repeat_password'
  label: string
  autoComplete:
    | 'email'
    | 'phone'
    | 'password_game'
    | 'login'
    | 'first_name'
    | 'second_name'
    | 'repeat_password_game'
  value: string
  onChangeValue: (value: SyntheticEvent) => void
  isErrorValue: boolean
  onSetError: (isErrorValue: boolean, name: string) => void
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
  const [errorText, setErrorText] = useState('')

  const onBlurHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    const { isNorm, errorText } = validate(name, target.value || '')

    if (!isNorm) {
      onSetError(true, name)
      setErrorText(errorText)
    }
  }
  const onFocusHandler = () => {
    onSetError(false, name)
    setErrorText('')
  }

  return (
    <FormControl
      sx={{ m: 1, minWidth: '18rem', width: '100%' }}
      variant="outlined"
      error={isErrorValue}>
      <InputLabel htmlFor={id} sx={{ '&.Mui-focused': { color: '#973232' } }}>
        {label}
      </InputLabel>
      <OutlinedInput
        sx={{
          fontSize: '1.2rem',
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#973232',
            },
        }}
        id={id}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        name={name}
        color="secondary"
        onBlur={e => onBlurHandler(e)}
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
