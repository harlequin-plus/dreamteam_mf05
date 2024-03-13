import {
  Avatar,
  Box,
  Button,
  FormControl,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

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

const ChangeAvatar = () => {
  const [avatar, setAvatar] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmitForm = () => {
    console.log(avatar)
  }
  return (
    <>
      <Avatar src={avatar} onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={style}
          component={'form'}
          onSubmit={event => {
            event.preventDefault()
            handleSubmitForm()
            handleClose()
          }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменить аватар
          </Typography>
          <FormControl>
            <OutlinedInput
              onChange={event => setAvatar(event.target.value)}
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
