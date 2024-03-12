import { FormControl, Input, InputAdornment } from '@mui/material'

type OwnProps = {
  id: string
  value: string
  label: string
}

const InputProfile = (props: OwnProps) => {
  const { id, value, label } = props
  return (
    <FormControl hiddenLabel sx={{ width: '35rem' }} variant="standard">
      <Input
        fullWidth
        readOnly
        type="text"
        id={id}
        value={value}
        endAdornment={<InputAdornment position="end">{label}</InputAdornment>}
      />
    </FormControl>
  )
}

export default InputProfile
