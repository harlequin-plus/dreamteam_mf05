import {
  createReply,
  deleteReply,
  editReply,
  getReplyAuthorByReplyId,
} from '../services/replies'
import { getUserIdFromApi } from '../api/auth'
import express from 'express'
import checkId from '../utils/checkId'
import { getCommentById } from '../services/comments'

const ReplyRouter = express.Router()

ReplyRouter.post('', async (req, res) => {
  const UserId = await getUserIdFromApi(req)
  const { commentId, content } = req.body
  if (
    commentId &&
    content &&
    typeof commentId == 'number' &&
    typeof content == 'string'
  ) {
    const comment = await getCommentById(commentId)
    if (!comment) {
      res.status(400).send({ reason: 'comment is not exist' })
      return
    }
    const id = await createReply({ content, CommentId: commentId, UserId })
    res.status(200).send({ id })
    return
  }
  res.status(400).send({ reason: 'Bad request' })
})

ReplyRouter.put('', async (req, res) => {
  const UserId = await getUserIdFromApi(req)
  const { replyId, newContent } = req.body

  if (
    replyId &&
    newContent &&
    typeof replyId == 'number' &&
    typeof newContent == 'string'
  ) {
    const replyAuthor = await getReplyAuthorByReplyId(replyId)

    if (UserId != replyAuthor) {
      res.status(405).send({ reason: 'This reply belongs to another user' })
      return
    }

    await editReply({ content: newContent, id: replyId })
    res.sendStatus(200)
    return
  }
  res.status(400).send({ reason: 'Bad request' })
})

ReplyRouter.delete('/:id', async (req, res) => {
  const UserId = await getUserIdFromApi(req)

  const id = checkId(req.params.id, res)
  if (!id) return

  const replyAuthor = await getReplyAuthorByReplyId(id)
  if (UserId != replyAuthor) {
    res.status(405).send({ reason: 'This reply belongs to another user' })
    return
  }

  const reply = await deleteReply(id)
  if (!reply) {
    res.status(400).send({ reason: 'Reply does not exist' })
    return
  }
  res.sendStatus(200)
})

export default ReplyRouter
