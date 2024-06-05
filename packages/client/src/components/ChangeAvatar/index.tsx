import {
  Avatar,
  Box,
  Button,
  FormControl,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { FC, HTMLAttributes, SyntheticEvent, useState } from 'react'
import { TupleUseState } from '../../types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type OwnProps = {
  avatar: string | null
  handleChangeAvatar: (data: File) => void
} & HTMLAttributes<HTMLDivElement>

type Props = FC<OwnProps>

const ChangeAvatar: Props = ({ ...otherProps }) => {
  const [open, setOpen] = useState(false)
  const [data, setData]: TupleUseState<File | undefined> = useState()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { avatar, handleChangeAvatar } = otherProps

  const handleOnChange = (event: SyntheticEvent) => {
    const files = (event.target as HTMLInputElement).files
    if (files) {
      setData(files[0])
    }
  }

  const handleOnSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    try {
      if (!data) {
        return
      }
      handleChangeAvatar(data)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Avatar
        alt="avatar"
        src={avatar ? avatar : ''}
        onClick={handleOpen}
        sx={{ width: 120, height: 120, backgroundColor: '#973232' }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} component={'form'} onSubmit={handleOnSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменить аватар
          </Typography>
          <FormControl>
            <OutlinedInput
              onChange={handleOnChange}
              margin="none"
              inputProps={{ accept: 'image/png, image/jpeg' }}
              type="file"
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Изменить
          </Button>
          <Button onClick={handleClose}>Отменить</Button>
        </Box>
      </Modal>
    </>
  )
}
export default ChangeAvatar
