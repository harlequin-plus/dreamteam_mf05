import { useState, useEffect } from 'react'
import { Modal, Button, Typography, Box } from '@mui/material'
import { container, breakline } from './styles'

const InfoModal = () => {
  const [open, setOpen] = useState(true)
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount === 1) {
          clearInterval(interval)
          setOpen(false)
          return prevCount - 1
        }
        return prevCount - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={container}>
        <Typography variant="h6">Для того чтобы собрать 2048:</Typography>

        <Typography width="80%" variant="body1">
          1 Смахните влево и вправо несколько раз (необязательно). Начните новую
          игру, после чего быстро смахните влево и вправо. Продолжайте до тех
          пор, пока не сформируется пара рядов с числами 2, 4 и 8.
        </Typography>

        <hr style={breakline} />

        <Typography width="80%" variant="body1">
          2 Создавайте плитку с большим числом в углу. Объединяйте плитки с
          малым номиналом в 16 и 32 и двигайте в угол. Ваша цель — оставлять
          плитку на одном месте как можно дольше.
        </Typography>

        <hr style={breakline} />

        <Typography width="80%" variant="body1">
          3 Оставляйте ряд с самой крупной плиткой заполненным. Например, если
          самая крупная плитка находится в правом верхнем углу, заполните
          плитками весь верхний ряд.
        </Typography>

        <Typography variant="h6"> Игра начнётся {countdown}</Typography>

        <Button variant="contained" color="warning" onClick={handleClose}>
          Start
        </Button>
      </div>
    </Modal>
  )
}

export default InfoModal
