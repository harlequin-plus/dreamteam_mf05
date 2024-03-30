import { useState, useEffect } from 'react'
import { Modal, Button, Typography, Box } from '@mui/material'
import { container, img } from './styles'

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
        <Typography variant="h6">Rules:</Typography>

        <Typography width="80%" variant="body1">
          1. Arrows keyboard for game control
        </Typography>
        <Box
          component="img"
          sx={{
            width: '30%',
          }}
          alt="keyboard arrows"
          src={img.keyArrows}
        />

        <Typography width="80%" variant="body1">
          2. Collide equale blocks to summarize two into one
        </Typography>
        <Box
          component="img"
          sx={{
            width: '60%',
          }}
          alt="blocks example"
          src={img.blocks}
        />

        <Typography width="80%" variant="body1">
          3. Collect 2048 in a single block to win!
        </Typography>
        <Typography variant="h6"> The game starts in {countdown}</Typography>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Start
        </Button>
      </div>
    </Modal>
  )
}

export default InfoModal
