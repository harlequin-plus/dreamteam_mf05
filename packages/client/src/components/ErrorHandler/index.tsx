import React from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export function ErrorHandler(error: { error: { message: string } }) {
  return (
    <Box
      width="100%"
      height="100vh"
      display={'flex'}
      alignItems="center"
      flexDirection="column"
      padding="0"
      justifyContent="center"
      sx={{ background: 'lightgrey' }}>
      <Box
        display={'flex'}
        alignItems="center"
        width={600}
        borderRadius={'15px'}
        flexDirection="column"
        border="1px solid #2E9AFF"
        sx={{ background: 'white' }}
        padding="30px">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ошибка на странице
        </Typography>
        <Typography variant="h4" gutterBottom textAlign="center" color="grey">
          Упс, что-то пошло не так. Пожалуйста, попробуйте позднее.
        </Typography>
        <pre>msg: {error.error.message}</pre>
      </Box>
    </Box>
  )
}
