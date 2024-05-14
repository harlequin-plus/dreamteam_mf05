import {
  createEmoji,
  getEmojisByCommentId,
  deleteUserByIds,
} from '../services/emojis'

import express from 'express'

export const EmojiRouter = express.Router()

// ?CommentId=1  query параметры
EmojiRouter.get(``, async (req, res) => {
  const CommentId = Number(req.query.CommentId)
  if (!CommentId) res.status(400).send({ reason: 'bad request' })

  const emojis = await getEmojisByCommentId({ CommentId })
  if (emojis.length === 0)
    res.status(400).send({ reason: 'emojis does not exist' })

  res.send(emojis)
})

EmojiRouter.post(``, async (req, res) => {
  const { CommentId, unicod, UserId } = req.body
  if (
    !CommentId ||
    !unicod ||
    !UserId ||
    typeof CommentId !== 'number' ||
    typeof unicod !== 'string' ||
    typeof UserId !== 'number'
  )
    res.status(400).send({ reason: 'bad request' })

  const emoji = await createEmoji(req.body)
  if (!emoji) res.status(400).send({ reason: 'emoji already exist' })

  res.send(emoji)
})

EmojiRouter.delete(``, async (req, res) => {
  const { CommentId, UserId } = req.body
  if (
    !CommentId ||
    !UserId ||
    typeof CommentId !== 'number' ||
    typeof UserId !== 'number'
  )
    res.status(400).send({ reason: 'bad request' })

  const emoji = await deleteUserByIds(req.body)
  if (!emoji) res.status(400).send({ reason: 'emoji does not exist' })

  res.status(200).send()
})
