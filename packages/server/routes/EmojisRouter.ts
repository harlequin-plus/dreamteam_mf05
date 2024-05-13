import {
  createEmoji,
  getEmojisByCommentID,
  deleteUserByIds,
} from '../services/emojis'

import express from 'express'

export const EmojiRouter = express.Router()

// ?commentID=1  query параметры
EmojiRouter.get(``, async (req, res) => {
  const commentID = Number(req.query.commentID)
  if (!commentID) res.status(400).send({ reason: 'bad request' })

  const emojis = await getEmojisByCommentID({ commentID })
  if (emojis.length === 0)
    res.status(400).send({ reason: 'emojis does not exist' })

  res.send(emojis)
})

EmojiRouter.post(``, async (req, res) => {
  const { messageID, unicod, userID } = req.body
  if (
    !messageID ||
    !unicod ||
    !userID ||
    typeof messageID !== 'number' ||
    typeof unicod !== 'string' ||
    typeof userID !== 'number'
  )
    res.status(400).send({ reason: 'bad request' })

  const emoji = await createEmoji(req.body)
  if (!emoji) res.status(400).send({ reason: 'emoji already exist' })

  res.send(emoji)
})

EmojiRouter.delete(``, async (req, res) => {
  const { commentID, userID } = req.body
  if (
    !commentID ||
    !userID ||
    typeof commentID !== 'number' ||
    typeof userID !== 'number'
  )
    res.status(400).send({ reason: 'bad request' })

  const emoji = await deleteUserByIds(req.body)
  if (!emoji) res.status(400).send({ reason: 'emoji does not exist' })

  res.status(200).send()
})
