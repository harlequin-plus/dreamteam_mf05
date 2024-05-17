import serialize from 'serialize-javascript'
import {
  createComment,
  deleteComment,
  editComment,
  getCommentById,
  getCommentsAuthorByCommentId,
} from '../services/comments'
import { getUserIdFromApi } from '../api/auth'
import express from 'express'
import checkId from '../utils/checkId'
import { getTopicbyId } from '../services/topics'
const CommentRouter = express.Router()

CommentRouter.post('', async (req, res) => {
  const UserId = res.locals.user
  console.log(res.locals.user)
  const { topicId, content } = req.body
  if (
    topicId &&
    content &&
    typeof topicId == 'number' &&
    typeof content == 'string'
  ) {
    const topic = await getTopicbyId(topicId)
    if (!topic) {
      res.status(400).send({ reason: 'Topic is not exist' })
      return
    }
    const TopicId = await createComment({
      content: serialize(content),
      TopicId: topicId,
      UserId,
    })
    res.status(200).send({ id: TopicId })
    return
  }
  res.status(400).send({ reason: 'Bad request' })
})

CommentRouter.put('/edit', async (req, res) => {
  const UserId = await getUserIdFromApi(req)
  const { commentId, newContent } = req.body
  if (
    commentId &&
    newContent &&
    typeof commentId == 'number' &&
    typeof newContent == 'string'
  ) {
    const commentAuthor = await getCommentsAuthorByCommentId(commentId)
    if (UserId != commentAuthor) {
      res.status(405).send({ reason: 'This comment belongs to another user' })
      return
    }

    await editComment({ content: serialize(newContent), id: commentId })
    res.sendStatus(200)
    return
  }
  res.status(400).send({ reason: 'Bad request' })
})

CommentRouter.get('/:id', async (req, res) => {
  const id = checkId(req.params.id, res)
  if (!id) return
  const comment = await getCommentById(id)
  if (!comment) {
    res.status(400).send({ reason: 'Comment does not exist' })
    return
  }
  res.status(200).send(comment)
})

CommentRouter.delete('/:id', async (req, res) => {
  const id = checkId(req.params.id, res)
  if (!id) return
  const comment = await deleteComment(id)
  if (!comment) {
    res.status(400).send({ reason: 'Comment does not exist' })
    return
  }
  res.sendStatus(200)
})

export default CommentRouter
