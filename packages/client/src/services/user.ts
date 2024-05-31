import UserApi from '../api/user'
import { TChangePasswordInput } from '../models/TChangePasswordInput'
import { responseHasError } from '../utils/api.utils'
import { TUser } from '../models/TUser'

const userApi = new UserApi()

const changePassword = async (data: TChangePasswordInput) => {
  const response = await userApi.changePassword(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const changeAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await userApi.changeAvatar(formData)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data as TUser
}

const getUserByID = async (id: number) => {
  const response = await userApi.getUserByID(id)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data as TUser
}

export { changePassword, changeAvatar, getUserByID }
