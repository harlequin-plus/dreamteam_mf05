import * as React from 'react'
import Typography from '@mui/material/Typography'
import './style.scss'
import Box from '@mui/material/Box'

export function InternalServerError() {
  return (
    <React.Fragment>
      <Box className="error">
        <div className="error-500">
          <div className="error-404__item">5</div>
          <div className="error-404__item">0</div>
          <div className="error-404__item">0</div>
        </div>
        <Typography mt={2} variant="h1" gutterBottom>
          Ошибка
        </Typography>
        <Typography
          fontWeight={500}
          fontSize={25}
          color="darkgreen"
          variant="h2"
          gutterBottom>
          На сервере произошла ошибка. Попробуйте позднее.
        </Typography>
      </Box>
    </React.Fragment>
  )
}
