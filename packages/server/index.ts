import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import axios from 'axios'
dotenv.config()

import express from 'express'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'

dbConnect()
const app = express()

app.use(cors())

app.use('*', cookieParser())

app.use('', async (_req, _res, next) => {
  console.log('middleware')
  // const { data } = await axios.get(
  //   `https://ya-praktikum.tech/api/v2/auth/user`,
  //   {
  //     headers: {
  //       cookie: req.headers['cookie'],
  //     },
  //   }
  // )
  // console.log(req.headers['cookie'])
  // console.log(data)
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
