import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import {
  createEmoji,
  getEmojisByMessageID,
  deleteUserByIds,
} from './models/emoji'

import express from 'express'
// import { createClientAndConnect } from './db'
import { dbConnect } from './init'

const app = express()
app.use(cors())
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001

// createClientAndConnect()
dbConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

// ?messageID=1  query параметры
app.get(`/api/emoji`, async (req, res) => {
  const messageID = Number(req.query.messageID)
  if (!messageID) res.status(400).send({ reason: 'bad request' })
  const emojis = await getEmojisByMessageID({ messageID })
  console.log('emojis', emojis)
  if (emojis.length === 0)
    res.status(400).send({ reason: 'emojis does not exist' })
  res.send(emojis)
})

app.post(`/api/emoji`, async (req, res) => {
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

app.delete(`/api/emoji`, async (req, res) => {
  const { messageID, userID } = req.body
  if (
    !messageID ||
    !userID ||
    typeof messageID !== 'number' ||
    typeof userID !== 'number'
  )
    res.status(400).send({ reason: 'bad request' })
  const emoji = await deleteUserByIds(req.body)
  console.log('emoji', emoji)
  if (!emoji) res.status(400).send({ reason: 'emoji does not exist' })
  res.status(200).send()
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
