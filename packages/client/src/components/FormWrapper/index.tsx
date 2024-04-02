import Box from '@mui/material/Box'
import { ReactNode } from 'react'

const background = {
  background: `radial-gradient(68.61% 68.61% at 50.03% 31.39%,rgb(246, 216, 166)0%,rgb(244, 177, 148) 100%), 
  radial-gradient(68.61% 68.61% at 50.03% 31.39%, rgb(246, 216, 166) 0%,rgb(244, 177, 148) 100%)`,
}
type Props = {
  children: ReactNode
}
export function FormWrapper({ children }: Props) {
  return (
    <Box
      width="100wh"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={background}>
      {children}
    </Box>
  )
}
