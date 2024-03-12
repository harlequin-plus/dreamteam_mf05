import { Avatar } from '@mui/material'
import { useState } from 'react'

const ChangeAvatar = () => {
  const [avatar, setAvatar] = useState(undefined)
  return <Avatar src={avatar} />
}
export default ChangeAvatar
