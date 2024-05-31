import { Users } from '../../models/Users'
import { IUser } from '../../models/types'

export const createUserInDB = async (user: IUser) => {
  const newUser = await Users.create(user)
  return newUser.id
}

export const getUserByIdFromDB = async (id: number) => {
  const user = await Users.findOne({
    where: { id },
  })
  return user
}
