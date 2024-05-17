import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import express from 'express'
import helmet from 'helmet'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'
import CommentRouter from './routes/CommentRouter'
import ReplyRouter from './routes/ReplyRouter'
import ThemeRouter from './routes/ThemeRouter'
import { AuthorizationMiddleware } from './middleware/AuthorizationMiddleware'

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
  .use('', AuthorizationMiddleware)
  .use(express.json())
  .use('/forum/topic', TopicRouter)
  .use('/forum/comment', CommentRouter)
  .use('/forum/reply', ReplyRouter)
  .use('/theme', ThemeRouter)

const port = Number(process.env.SERVER_PORT) || 3001

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  console.log(`Вывод переменной из .env: ${process.env.AWESOME_VAR}`)
  console.log(`Вывод переменной из .env: ${process.env.POSTGRES_PASSWORD}`)
})
