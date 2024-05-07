import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import axios from 'axios'
dotenv.config()

import express from 'express'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'
import { getUserFromApi } from './api/auth'
import { createUserInDB, getUserByIdFromDB } from './services/users'
import CommentRouter from './routes/CommentRouter'
import ReplyRouter from './routes/ReplyRouter'
import helmet from 'helmet'

dbConnect()
const app = express()

app.use(helmet())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use('', async (req, res, next) => {
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

app.use(express.json())

app.use('/topic', TopicRouter)
app.use('/forum/comment', CommentRouter)
app.use('/forum/reply', ReplyRouter)
const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
