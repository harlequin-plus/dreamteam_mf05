import { generalCss } from '../../styles'

export const container: Record<string, string> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  margin: 'auto',
  padding: '20px',

  width: '80%',
  minWidth: '500px',
  maxWidth: '550px',
  height: '80%',
  maxHeight: '500px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: 'rgb(205, 193, 180)',
  font: generalCss.font,
}

export const breakline: Record<string, string> = {
  width: '100%',
}
