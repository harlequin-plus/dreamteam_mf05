import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'

dbConnect()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/topic', TopicRouter)
const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
