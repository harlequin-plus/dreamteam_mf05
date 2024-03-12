import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import InputPassword from '../InputPassword/InputPassword'

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

interface ModalInput {
  id: string
  name: string
  type: 'text' | 'password'
  isPassword?: boolean
}

type OwnProps = {
  title: string
  inputs: ModalInput[]
}

type Props = FC<OwnProps>

const BasicModal: Props = ({ ...otherProps }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { title, inputs } = otherProps
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box component={'form'}>
            {inputs.map(input => {
              if (input.isPassword) {
                return (
                  <InputPassword
                    key={input.id}
                    label={input.name}
                    id={input.id}
                  />
                )
              }
              return (
                <FormControl
                  key={input.id}
                  sx={{ m: 1, width: '25rem' }}
                  variant="outlined">
                  <InputLabel htmlFor="login-in-loginform">
                    {input.name}
                  </InputLabel>
                  <OutlinedInput
                    sx={{ fontSize: '1.2rem' }}
                    id="login-in-loginform"
                    type={input.type}
                    label={input.name}
                  />
                  <FormHelperText error>неправильный ввод</FormHelperText>
                </FormControl>
              )
            })}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModal
