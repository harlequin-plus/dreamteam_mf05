import express from 'express'
import {
  createTopicEntry,
  deleteTopicEntry,
  // getTopics,
} from '../services/topics'
import { createComment, getCommentsByTopicId } from '../services/comments'
import { getUserIdFromApi } from '../api/auth'
import serialize from 'serialize-javascript'

export const TopicRouter = express.Router()

TopicRouter.get('', async (_req, res) => {
  // const topics = await getTopics()
  res.statusCode = 200
  res.send()
})

TopicRouter.post('', async (req, res) => {
  const UserId = await getUserIdFromApi(req)
  const { title, comment } = req.body
  if (
    title &&
    comment &&
    typeof title == 'string' &&
    typeof comment == 'string'
  ) {
    const TopicId = await createTopicEntry({ title: serialize(title), UserId })
    await createComment({ content: serialize(comment), TopicId, UserId })
    res.status(200).send({ id: TopicId })
    return
  }
  res.status(400).send({ reason: 'Bad request' })
})

TopicRouter.get(`/:id/comments`, async (req, res) => {
  const reqId = req.params.id
  const id = Number(reqId)
  if (!id) {
    res.status(400).send({ reason: 'Id is not a number' })
    return
  }
  const comments = await getCommentsByTopicId({ id })
  if (comments) {
    res.status(200).send(comments)
    return
  }

  res.status(400).send({ reason: 'There is no topic with this id' })
})

TopicRouter.delete('/:id', async (req, res) => {
  const reqId = req.params.id
  const id = Number(reqId)
  if (!id) {
    res.status(400).send({ reason: 'Id is not a number' })
    return
  }
  const topic = await deleteTopicEntry(id)
  if (!topic) {
    res.status(400).send({ reason: 'Topic does not exist' })
    return
  }
  res.sendStatus(200)
})
