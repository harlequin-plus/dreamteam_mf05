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
import {
  FormEvent,
  useEffect,
  useState,
  SyntheticEvent,
  useCallback,
} from 'react'
import Comment from '../Comment'
import { useAppSelector } from '../../hooks/reduxTsHook'
import { useParams } from 'react-router-dom'
import NotFoundPage from '../../pages/NotFoundPage'
import {
  createComment,
  deleteCommentById,
  getCommentsByTopicId,
  getTopics,
} from '../../services/forum'
import { TTopic } from '../../models/TTopic'
import { TComments } from '../../models/TComment'

const Topic = () => {
  const [comment, setComment] = useState('')
  const [topic, setTopic] = useState<TTopic>()
  const [comments, setComments] = useState<TComments>([])

  const { id } = useParams()
  const user = useAppSelector(state => state.userState.item)

  const onChangeComment = (event: SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as HTMLInputElement
    setComment(target.value)
  }

  // get current topic
  // TODO use redux to escape use api twice
  useEffect(() => {
    getTopics()
      .then(topics => {
        const currentTopic = topics.find(topic => topic.id.toString() === id)
        setTopic(currentTopic)
      })
      .catch(error => {
        console.log('forum error', error)
      })
  }, [id])

  useEffect(() => {
    getCommentsByTopicId(Number(id))
      .then(comments => {
        setComments(comments)
      })
      .catch(error => {
        console.log('forum error', error)
      })
  }, [id])

  const handleDeleteComment = useCallback(
    (id: number) => {
      deleteCommentById(id)
        .then(() => {
          setComments(comments.filter(comment => comment.commentId !== id))
        })
        .catch(error => {
          console.log('delete comment error', error)
        })
    },
    [comments]
  )

  const addComment = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      if (topic) {
        createComment(topic.id, comment)
          .then(id => {
            setComments([
              ...comments,
              {
                commentId: id,
                content: comment,
                date: new Date().toISOString(),
                author: user,
              },
            ])
          })
          .catch(error => {
            console.log('create comment error', error)
          })
      }
    },
    [comment, comments, topic, user]
  )

  return topic ? (
    <>
      <Container maxWidth="lg" style={{ flex: '1 1 auto' }}>
        <Box
          display={'flex'}
          alignItems="center"
          flexDirection="column"
          minHeight={'80vh'}>
          <Typography component="h1" variant="h4" m={4}>
            {topic?.title}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Информация о пользователе</TableCell>
                <TableCell>Сообщение</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments?.map((comment, index) => (
                <Comment
                  key={comment.commentId}
                  content={comment.content}
                  date={comment.date}
                  user={comment.author}
                  ordinalNumber={index + 1}
                  handleDeleteComment={() =>
                    handleDeleteComment(comment.commentId)
                  }
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
