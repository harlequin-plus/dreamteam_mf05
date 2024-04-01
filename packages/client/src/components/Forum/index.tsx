import { Box, Button, Typography, Container } from '@mui/material'
import Topic from '../Topic'

const GameForum = () => {
  return (
    <Container maxWidth="lg">
      <Box display={'flex'} alignItems="center" flexDirection="column">
        <Typography variant="h3" component="h1">
          Форум игры 2048
        </Typography>
        <Button>Создать новую тему</Button>
        <Topic name="Как набрать 2048?"></Topic>
      </Box>
    </Container>
  )
}

export default GameForum
