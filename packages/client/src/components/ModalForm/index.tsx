import { Box, Button, Modal, Typography } from '@mui/material'
import { FC, HTMLAttributes, useCallback, useState } from 'react'
import { DataModalForm } from '../../types'
import Form, { ModalInput } from '../Form'

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
  backgroundColor?: string
  modalTitle: string
  inputs: ModalInput[]
  handleSubmitForm: (data: DataModalForm) => Promise<boolean>
  successText?: string
  submitButtonText?: string
  cancelButtonText?: string
} & HTMLAttributes<HTMLDivElement>

type Props = FC<OwnProps>

const ModalForm: Props = ({
  modalTitle,
  successText = 'Успешно!',
  inputs,
  handleSubmitForm,
  submitButtonText = 'Изменить',
  cancelButtonText = 'Отмена',
  backgroundColor: backGroundColor = 'black',
}) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenSuccess = () => setOpenSuccess(true)
  const handleCloseSuccess = () => setOpenSuccess(false)

  const submitData = useCallback(
    async (data: DataModalForm) => {
      if (await handleSubmitForm(data)) {
        handleOpenSuccess()
        handleClose()
      }
    },
    [handleSubmitForm]
  )

  return (
    <div>
      <Button
        sx={{ color: `${backGroundColor}`, borderColor: `${backGroundColor}` }}
        variant="outlined"
        onClick={handleOpen}>
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
          <Form
            inputs={inputs}
            submitData={submitData}
            onCancel={handleClose}
            submitButtonText={submitButtonText}
            cancelButtonText={cancelButtonText}
          />
        </Box>
      </Modal>
      <Modal open={openSuccess} onClose={handleCloseSuccess}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ m: 1 }}>
            {modalTitle}
          </Typography>
          <Typography color="secondary">{successText}</Typography>

          <Button onClick={handleCloseSuccess}>Ok</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalForm
