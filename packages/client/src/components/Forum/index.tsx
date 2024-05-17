import {
  Box,
  Typography,
  Container,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import ModalForm from '../ModalForm'
import { DataModalForm } from '../../types'
import { useAppSelector } from '../../hooks/reduxTsHook'
import { useCallback, useEffect, useState } from 'react'
import { createTopic, deleteTopicById, getTopics } from '../../services/forum'
import { TTopics } from '../../models/TTopic'
import { format, parseISO } from 'date-fns'

const GameForum = () => {
  const [topics, setTopics] = useState<TTopics>([]) //Имитация получения списка тем из АПИ
  const user = useAppSelector(state => state.userState.item)

  useEffect(() => {
    getTopics()
      .then(topics => {
        setTopics(topics)
      })
      .catch(error => {
        console.log('forum error', error)
      })
    console.log(topics)
  }, [])

  const handleCreateTopic = useCallback(
    async (data: DataModalForm) => {
      createTopic(data.title, data.comment)
        .then(id => {
          setTopics([
            ...topics,
            {
              id: id,
              title: data.title,
              User: user,
              last_message: {
                User: user,
                time: new Date().toISOString(),
              },
            },
          ])
        })
        .catch(error => {
          console.log('create topic error', error)
        })
      return true
    },
    [topics, user]
  )

  const handleDeleteTopic = useCallback(
    (id: number) => {
      deleteTopicById(id)
        .then(() => {
          setTopics(topics.filter(topic => topic.id !== id))
        })
        .catch(error => {
          console.log('delete topic error', error)
        })
    },
    [topics]
  )

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
                name: 'title',
              },
              {
                label: 'Сообщение',
                name: 'comment',
              },
            ]}
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Тема/Автор</TableCell>
              <TableCell align="right">Последний сообщение</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics.map(topic => (
              <TableRow key={topic.id}>
                <TableCell width={'65%'}>
                  <Typography variant="body1">
                    <Link to={topic.id.toString()}>{topic.title}</Link>
                  </Typography>
                  <Typography variant="caption" color={'text.secondary'}>
                    {topic.User.first_name + topic.User.second_name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption" color={'text.secondary'}>
                    {topic.last_message
                      ? format(
                          parseISO(topic.last_message.time),
                          'dd.MM.yyyy hh:mm'
                        )
                      : 'Нет комментариев'}
                  </Typography>
                  <Typography variant="body2">
                    {`Автор: ${
                      topic.last_message
                        ? topic.last_message.User.first_name
                        : 'Нет автора'
                    }`}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteTopic(topic.id)}>
                    Delete
                  </Button>
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
