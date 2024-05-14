import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'
import { getUserFromApi } from './api/auth'
import { createUserInDB, getUserByIdFromDB } from './services/users'
import CommentRouter from './routes/CommentRouter'
import ReplyRouter from './routes/ReplyRouter'
import { EmojiRouter } from './routes/EmojisRouter'
import helmet from 'helmet'
import ThemeRouter from './routes/ThemeRouter'

dbConnect()
const app = express()

app
  .use(helmet())
  .use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )
  .use('', async (req, res, next) => {
    try {
      const user = await getUserFromApi(req)
      const userDB = await getUserByIdFromDB(user.id)
      if (!userDB) {
        await createUserInDB(user)
      }
      res.status(200)
      next()
    } catch (e) {
      res.status(403).send({ reason: 'Forbidden' })
      return
    }
  })

app
  .use(express.json())
  .use('/topic', TopicRouter)
  .use('/forum/comment', CommentRouter)
  .use('/forum/reply', ReplyRouter)
  .use('/forum/emoji', EmojiRouter)
  .use('/theme', ThemeRouter)

const port = Number(process.env.SERVER_PORT) || 3001

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  console.log(`Вывод переменной из .env: ${process.env.AWESOME_VAR}`)
})
