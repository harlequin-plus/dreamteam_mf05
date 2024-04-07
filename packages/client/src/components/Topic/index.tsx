import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { FormEvent, useEffect, useState, SyntheticEvent } from 'react'
import Comment from '../Comment'
import { CommentType, TopicType } from '../../types'
import { getTopics } from '../../mocks/topics.mock'
import { useAppSelector } from '../../hooks/reduxTsHook'
import { useParams } from 'react-router-dom'
import NotFoundPage from '../../pages/NotFoundPage'
import { v4 as uuid } from 'uuid'

const Topic = () => {
  const [comment, setComment] = useState('')
  const [topic, setTopic] = useState<TopicType>()

  const { id } = useParams()
  const user = useAppSelector(state => state.userState.item)

  const onChangeComment = (event: SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as HTMLInputElement
    setComment(target.value)
  }

  const topics = getTopics() //Имитация получения списка тем из АПИ
  useEffect(() => {
    const currentTopic = topics.find(topic => topic.id === id)

    setTopic(currentTopic)
  }, [topics, id])

  const addComment = async (event: FormEvent) => {
    event.preventDefault()
    const newComment: CommentType = {
      content: comment,
      id: uuid(),
      date: new Date(),
      user,
    }
    topic?.comments.push(newComment)
    setTopic(topic) // addComment(topicName, newComment) api
    setComment('')
  }

  return topic ? (
    <>
      <Container maxWidth="lg" style={{ flex: '1 1 auto' }}>
        <Box
          display={'flex'}
          alignItems="center"
          flexDirection="column"
          minHeight={'80vh'}>
          <Typography component="h1" variant="h4" m={4}>
            {topic?.name}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Информация о пользователе</TableCell>
                <TableCell>Сообщение</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topic?.comments.map((comment, index) => (
                <Comment
                  key={comment.id}
                  content={comment.content}
                  date={comment.date}
                  user={comment.user}
                  ordinalNumber={index + 1}
                />
              ))}
            </TableBody>
          </Table>
          <Container component={'form'} maxWidth="sm" onSubmit={addComment}>
            <FormControl
              margin="normal"
              sx={{ m: 1, width: '100%' }}
              variant="outlined">
              <InputLabel htmlFor="newComment">Сообщение</InputLabel>
              <OutlinedInput
                id="newComment"
                label="Сообщение"
                multiline
                minRows={5}
                value={comment}
                onChange={onChangeComment}
              />
              <Button type="submit">Ответить</Button>
            </FormControl>
          </Container>
        </Box>
      </Container>
    </>
  ) : (
    <NotFoundPage />
  )
}

export default Topic
