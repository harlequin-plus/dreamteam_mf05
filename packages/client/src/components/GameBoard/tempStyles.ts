import { generalCss } from '../../styles'

export const styles: Record<string, string> = {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',

  width: '100%',
  height: '100%',
  minHeight: '80vh',
  background: generalCss.background,

  color: generalCss.color,
  font: generalCss.font,

  justifyContent: 'center',
  alignItems: 'center',
}
