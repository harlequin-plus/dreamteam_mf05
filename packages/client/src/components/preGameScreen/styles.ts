import { generalCss } from '../../styles'
import colideImg from './../../assets/colideMethod.svg'

export const container: Record<string, string> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  margin: 'auto',
  padding: '20px',

  width: '80%',
  maxWidth: '500px',
  height: '80%',
  maxHeight: '500px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: generalCss.background,
  font: generalCss.font,
}

export const img: Record<string, string> = {
  keyArrows:
    'https://images.vexels.com/media/users/3/153199/isolated/preview/c0facb164c02a5815d7efea4eb898a98-keyboard-arrow-keys-stroke-icon-by-vexels.png',
  blocks: colideImg,
}
