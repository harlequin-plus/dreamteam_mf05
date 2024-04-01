import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { FC, FormEvent, useEffect, useState, SyntheticEvent } from 'react'
import Comment from '../Comment'
import { CommentType } from '../../types'
import { getTopics } from '../../mocks/topics.mock'
import { useAppSelector } from '../../hooks/reduxTsHook'

type OwnProps = {
  name: string
}

const Topic: FC<OwnProps> = ({ name }) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [comment, setComment] = useState('')

  const user = useAppSelector(state => state.userState.item)

  const onChangeComment = (event: SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as HTMLInputElement
    setComment(target.value)
  }

  useEffect(() => {
    const topics = getTopics() //Имитация получения списка тем из АПИ
    const currentTopic = topics.find(topic => topic.name === name)
    if (currentTopic) setComments(currentTopic.comments)
  }, [name])

  const addComment = async (event: FormEvent) => {
    event.preventDefault()
    const newComment: CommentType = {
      content: comment,
      id: comments[comments.length - 1].id + 1,
      date: new Date(),
      user,
    }
    setComments([...comments, newComment]) // addComment(topicName, newComment) api
    setComment('')
  }

  return (
    <>
      <Typography component="h3">{name}</Typography>
      {comments.map((comment, index) => (
        <Comment
          key={comment.id}
          content={comment.content}
          date={comment.date}
          user={comment.user}
          ordinalNumber={index + 1}
        />
      ))}
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
    </>
  )
}

export default Topic
