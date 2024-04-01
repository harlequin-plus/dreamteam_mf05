import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { FC, FormEvent, useEffect, useState } from 'react'
import Comment from '../Comment'
import { CommentType } from '../../types'
import { getTopics } from '../../mocks/topics.mock'

type OwnProps = {
  name: string
}

const Topic: FC<OwnProps> = ({ name }) => {
  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    const topics = getTopics() //Имитация получения списка тем из АПИ
    const currentTopic = topics.find(topic => topic.name === name)
    if (currentTopic) setComments(currentTopic.comments)
  })

  const addComment = async (event: FormEvent) => {
    event.preventDefault()
    return true
  }

  const clear = () => {
    console.log('jxbcnbnm')
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
          />
          <Button type="submit">Ответить</Button>
        </FormControl>
      </Container>
    </>
  )
}

export default Topic
