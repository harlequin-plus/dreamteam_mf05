import { Button } from '@mui/material'
import CloseFullscreenIcon from '../../assets/close_fullscreen.svg'
import OpenFullscreenIcon from '../../assets/open_fullscreen.svg'
import { useEffect } from 'react'

export function FullscreenButton({
  isFullscreenEnabled,
  setFullscreenEnabled,
}: {
  isFullscreenEnabled: boolean
  setFullscreenEnabled: CallableFunction
}) {
  const getTheFullscreenOn = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'а':
      case 'f':
      case 'А':
      case 'F':
        setFullscreenEnabled((prev: boolean) => !prev)
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', getTheFullscreenOn)

    return window.removeEventListener('keydown', getTheFullscreenOn)
  }, [getTheFullscreenOn])

  return (
    <Button
      className="fullscreen-btn"
      aria-label="OpenInFull"
      onClick={() => setFullscreenEnabled((prev: boolean) => !prev)}
      sx={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 75,
        height: 75,
      }}>
      <img
        src={isFullscreenEnabled ? CloseFullscreenIcon : OpenFullscreenIcon}
        alt={
          isFullscreenEnabled
            ? 'Close fullscreen button'
            : 'Open fullscreen button'
        }
      />
    </Button>
  )
}
