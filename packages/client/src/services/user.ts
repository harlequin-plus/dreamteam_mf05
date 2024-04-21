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
  const response = await userApi.changeAvatar(file)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data as TUser
}

export { changePassword, changeAvatar }
