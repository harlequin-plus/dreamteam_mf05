import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material'
import Topic from '../Topic'
import { getTopics } from '../../mocks/topics.mock'
import { useEffect } from 'react'
import { formatDate } from '../../utils/formatDate'

const GameForum = () => {
  const topics = getTopics() //Имитация получения списка тем из АПИ

  return (
    <Container maxWidth="lg">
      <Box display={'flex'} alignItems="center" flexDirection="column">
        <Typography variant="h3" component="h1">
          Форум игры 2048
        </Typography>
        <Button>Создать новую тему</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Тема/Автор</TableCell>
              <TableCell align="center">Ответов</TableCell>
              <TableCell align="right">Последний сообщение</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics.map(topic => (
              <TableRow key={topic.id}>
                <TableCell width={'65%'}>
                  <Typography variant="body1">{topic.name}</Typography>
                  <Typography variant="caption" color={'text.secondary'}>
                    {topic.author.display_name}
                  </Typography>
                </TableCell>
                <TableCell align="center">{topic.comments.length}</TableCell>
                <TableCell align="right">
                  <Typography variant="caption" color={'text.secondary'}>
                    {formatDate(topic.comments[topic.comments.length - 1].date)}
                  </Typography>
                  <Typography variant="body2">
                    {`Автор: ${
                      topic.comments[topic.comments.length - 1].user
                        .display_name
                    }`}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}

export default GameForum
