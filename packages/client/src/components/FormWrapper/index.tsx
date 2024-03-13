import Box from '@mui/material/Box'
import { ReactNode } from 'react'

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
      alignItems="center">
      {children}
    </Box>
  )
}
