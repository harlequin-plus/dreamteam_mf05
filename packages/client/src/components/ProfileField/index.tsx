import { Stack, Typography } from '@mui/material'

type OwnProps = {
  value: string
  label: string
}

const ProfileField = (props: OwnProps) => {
  const { value, label } = props
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography color={'#973232'}>{label}</Typography>
      <Typography color={'#973232'}>{value}</Typography>
    </Stack>
  )
}

export default ProfileField
