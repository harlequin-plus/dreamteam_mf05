import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import express from 'express'
import helmet from 'helmet'
// import equal from 'deep-equal'
import { dbConnect } from './init'
import { TopicRouter } from './routes/TopicRouter'
// import { getUserFromApi } from './api/auth'
// import { createUserInDB, getUserByIdFromDB, updateUser } from './services/users'
import CommentRouter from './routes/CommentRouter'
import ReplyRouter from './routes/ReplyRouter'
import ThemeRouter from './routes/ThemeRouter'

dbConnect()
const app = express()

app.use(helmet()).use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
//   .use('', async (req, res, next) => {
//     try {
//       const user = await getUserFromApi(req)
//       const userDB = await getUserByIdFromDB(user.id)
//       if (!userDB) {
//         await createUserInDB(user)
//       } else {
//         console.log(equal(user, userDB.dataValues))
//         if (!equal(user, userDB.dataValues)) {
//           await updateUser(user)
//         }
//       }
//       res.status(200)
//       next()
//     } catch (e) {
//       res.status(403).send({ reason: 'Forbidden' })
//       return
//     }
//   })

app
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
