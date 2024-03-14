import { ChangePass } from '../api/type'
import UserApi from '../api/userApi'
import { apiHasError } from '../utils/apiHasError'

const userApi = new UserApi()

const changePassword = async (data: ChangePass) => {
  const response = await userApi.changePassword(data)
  if (apiHasError(response)) {
    throw new Error(response.reason)
  }
  return response
}

const changeAvatar = async (data: File) => {
  const file = new FormData()
  file.append('avatar', data)
  const response = await userApi.changeAvatar(file)
  if (apiHasError(response)) {
    throw new Error(response.reason)
  }
  return response
}
export { changePassword, changeAvatar }
