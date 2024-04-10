import * as React from 'react'
import Typography from '@mui/material/Typography'
import './style.scss'
import Box from '@mui/material/Box'

export function NotFound() {
  return (
    <React.Fragment>
      <Box className="error">
        <div className="error-404">
          <div className="error-404__item">4</div>
          <div className="error-404__item">0</div>
          <div className="error-404__item">4</div>
        </div>
        <Typography mt={2} variant="h1" gutterBottom>
          Ошибка
        </Typography>
        <Typography
          textTransform="uppercase"
          fontWeight={500}
          fontSize={25}
          color="darkgreen"
          variant="h2"
          gutterBottom>
          Такой страницы у нас нет
        </Typography>
        <Typography
          mt={5}
          textTransform="uppercase"
          fontWeight={500}
          color="brown"
          variant="h3"
          gutterBottom>
          Зато есть другие :)
        </Typography>
      </Box>
    </React.Fragment>
  )
}
