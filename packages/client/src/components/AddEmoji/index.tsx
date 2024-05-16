import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import IconButton from '@mui/material/IconButton'
import { AddReactionOutlined } from '@mui/icons-material'
import { emodjisList } from '../../emojisList'
import { Box } from '@mui/material'

type Prop = {
  fontSize: number
  horizontal: number | 'center' | 'left' | 'right'
  insertEmoji: (emoji: string) => void
}

export default function AddEmoji({ fontSize, horizontal, insertEmoji }: Prop) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'popover' : undefined
  return (
    <>
      <Tooltip placement="bottom-start" title="Emoji">
        <IconButton aria-describedby={id} onClick={handleClick}>
          <AddReactionOutlined />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal,
        }}>
        <Box
          sx={{
            display: 'flex',
            gap: '5px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '200px',
            padding: '5px',
          }}>
          {emodjisList.map((unicode, index) => (
            <span
              style={{ cursor: 'pointer', fontSize: `${fontSize}rem` }}
              onClick={() => {
                insertEmoji(unicode)
                handleClose()
              }}
              key={index}>
              {unicode}
            </span>
          ))}
          //{' '}
        </Box>
      </Popover>
    </>
  )
}
