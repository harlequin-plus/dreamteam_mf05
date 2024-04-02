import {
  useState,
  SyntheticEvent,
  useImperativeHandle,
  forwardRef,
} from 'react'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormHelperText from '@mui/material/FormHelperText'
import { validate } from '../../utils/validate'
import { InputAutocomlete, InputName, InputType } from '../../types'

type OwnProps = {
  isPassword?: boolean
  type?: InputType
  name: InputName
  label: string
  autoComplete?: InputAutocomlete
}

export const ControlledInput = forwardRef(
  (
    { isPassword = false, type = 'text', name, label, autoComplete }: OwnProps,
    ref
  ) => {
    const [value, setValue] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')

    useImperativeHandle(ref, () => ({
      getValue: () => {
        const { isNorm, errorText } = validate(name, value || '')
        if (!isNorm) {
          setError(true)
          setErrorText(errorText)
          return false
        }
        setError(false)
        return value
      },
      resetInput: () => {
        setError(false)
        setValue('')
      },
    }))

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement
      setValue(target.value)
    }

    const onBlurHandle = (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement
      const { isNorm, errorText } = validate(name, target.value || '')

      if (!isNorm) {
        setError(true)
        setErrorText(errorText)
        return
      }
      setError(false)
      setErrorText('')
    }

    return (
      <FormControl
        sx={{ m: 1, minWidth: '18rem', width: '100%' }}
        variant="outlined"
        error={error}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          sx={{ fontSize: '1.2rem' }}
          id={name}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          name={name}
          onBlur={e => onBlurHandle(e)}
          onChange={onChangeValue}
          value={value}
          endAdornment={
            isPassword && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(showPassword => !showPassword)}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
          label={label}
          autoComplete={autoComplete}
        />
        {error && <FormHelperText error>{errorText}</FormHelperText>}
      </FormControl>
    )
  }
)
