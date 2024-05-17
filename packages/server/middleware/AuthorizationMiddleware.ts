import { getUserFromApi } from '../api/auth'
import { Response, Request, NextFunction } from 'express'
import {
  createUserInDB,
  getUserByIdFromDB,
  updateUser,
} from '../services/users'
import deepEqual from 'deep-equal'
export const AuthorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserFromApi(req)
    const userDB = await getUserByIdFromDB(user.id)
    if (!userDB) {
      await createUserInDB(user)
    } else {
      console.log(deepEqual(user, userDB.dataValues))
      if (!deepEqual(user, userDB.dataValues)) {
        await updateUser(user)
      }
    }
    res.locals.user = user
    res.status(200)
    next()
  } catch (e) {
    res.status(401).send({ reason: 'Unauthorized' })
    return
  }
}
