import {
  Box,
  Typography,
  Container,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material'
import { addTopic, getTopics } from '../../mocks/topics.mock'
import { formatDate } from '../../utils/formatDate'
import { Link } from 'react-router-dom'
import ModalForm from '../ModalForm'
import { CommentType, DataModalForm, TopicType } from '../../types'
import { useAppSelector } from '../../hooks/reduxTsHook'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

const GameForum = () => {
  const [topics, setTopics] = useState(getTopics()) //Имитация получения списка тем из АПИ

  const user = useAppSelector(state => state.userState.item)

  const handleCreateTopic = async (data: DataModalForm) => {
    console.log(data.addComment)

    const comment: CommentType = {
      content: data.addComment,
      date: new Date(),
      id: uuid(),
      user,
    }

    const topic: TopicType = {
      comments: [comment],
      name: data.topicName,
      author: user,
      id: uuid(),
    }

    setTopics([...topics, topic])
    addTopic(topic)
  }

  return (
    <Container maxWidth="lg" style={{ flex: '1 1 auto' }}>
      <Box
        display={'flex'}
        alignItems="center"
        flexDirection="column"
        minHeight={'80vh'}>
        <Typography variant="h4" component="h1" m={5}>
          Форум игры 2048
        </Typography>
        <Box alignSelf={'flex-end'}>
          <ModalForm
            modalTitle="Создать новую тему"
            handleSubmitForm={handleCreateTopic}
            submitButtonText="Создать тему"
            inputs={[
              {
                label: 'Название темы',
                name: 'topicName',
              },
              {
                label: 'Сообщение',
                name: 'addComment',
              },
            ]}
          />
        </Box>
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
                  <Typography variant="body1">
                    <Link to={topic.id.toString()}>{topic.name}</Link>
                  </Typography>
                  <Typography variant="caption" color={'text.secondary'}>
                    {topic.author.first_name}
                  </Typography>
                </TableCell>
                <TableCell align="center">{topic.comments.length}</TableCell>
                <TableCell align="right">
                  <Typography variant="caption" color={'text.secondary'}>
                    {formatDate(topic.comments[topic.comments.length - 1].date)}
                  </Typography>
                  <Typography variant="body2">
                    {`Автор: ${
                      topic.comments[topic.comments.length - 1].user.first_name
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
