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
import { FC, HTMLAttributes, useState } from 'react'
import InputPassword from '../InputPassword'

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
  type?: 'text' | 'password'
}

type OwnProps = {
  modalTitle: string
  inputs: ModalInput[]
  handleSubmitForm: (data: DataBasicModalForm) => void
  successText?: string
} & HTMLAttributes<HTMLDivElement>

type Props = FC<OwnProps>

export type DataBasicModalForm = Record<string, string>

const BasicModal: Props = ({ ...otherProps }) => {
  const [openSucces, setOpenSucces] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData]: [
    DataBasicModalForm,
    React.Dispatch<React.SetStateAction<DataBasicModalForm>>
  ] = useState({})
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenSucces = () => setOpenSucces(true)
  const handleCloseSucces = () => setOpenSucces(false)

  const handleOnChange = (value: string, id: string) => {
    data[id] = value
    setData(data)
  }

  const { modalTitle, successText, inputs, handleSubmitForm } = otherProps

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        {modalTitle}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Box
            component={'form'}
            onSubmit={event => {
              event.preventDefault()
              handleSubmitForm(data)
              handleOpenSucces()
              handleClose()
            }}>
            {inputs.map(input => {
              input.type = input.type ? input.type : 'text'
              if (input.type === 'password') {
                return (
                  <InputPassword
                    onChange={handleOnChange}
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
                  <InputLabel htmlFor={input.id}>{input.name}</InputLabel>
                  <OutlinedInput
                    sx={{ fontSize: '1.2rem' }}
                    id={input.id}
                    type={input.type}
                    label={input.name}
                  />
                  <FormHelperText error>неправильный ввод</FormHelperText>
                </FormControl>
              )
            })}
            <Button type="submit" variant="contained">
              Изменить
            </Button>
            <Button onClick={handleClose}>Отменить</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openSucces} onClose={handleCloseSucces}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ m: 1 }}>
            {modalTitle}
          </Typography>
          <Typography color="secondary">{successText}</Typography>

          <Button onClick={handleCloseSucces}>Ok</Button>
        </Box>
      </Modal>
    </div>
  )
}
BasicModal.defaultProps = { successText: 'Успешно!' }
export default BasicModal
