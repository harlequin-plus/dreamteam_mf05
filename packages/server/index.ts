import dotenv from 'dotenv'
// import cors from 'cors'
dotenv.config()

import express from 'express'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'
import { getUserFromApi } from './api/auth'
import { createUserInDB, getUserByIdFromDB } from './services/users'

dbConnect()
const app = express()

const processCors = (
  _req: any,
  res: { header: (arg0: string, arg1: string) => void },
  next: () => void
) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
}
// app.use(cors())
app.use(processCors)

app.use('', async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'POST')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  console.log('midllware')
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
const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
