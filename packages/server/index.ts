import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import axios from 'axios'
dotenv.config()

import express from 'express'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'

dbConnect()
const app = express()
function processCors(
  _req: any,
  res: { header: (arg0: string, arg1: string) => void },
  next: () => void
) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET')
  next()
}

app.use(cors())
app.use(processCors)

app.use('*', cookieParser())

app.use('', async (req, res, next) => {
  console.log('middleware')
  try {
    const { data } = await axios.get(
      `https://ya-praktikum.tech/api/v2/auth/user`,
      {
        headers: {
          cookie: req.headers['cookie'],
        },
      }
    )
    console.log(data)
  } catch (e) {
    res.status(403).send()
    console.log('unaautor')
  }
  next()
})

app.use(express.json())

app.use('/topic', TopicRouter)
const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
