import { TChangePasswordInput } from '../models/TChangePasswordInput'
import { TUser } from '../models/TUser'
import { baseURL } from '../constants'
import { HTTPTransport } from '../utils/http'

const userApi = new HTTPTransport()

export default class UserApi {
  async changePassword(data: TChangePasswordInput) {
    return userApi.put<void>(`${baseURL}/user/password`, undefined, data)
  }

  async changeAvatar(data: FormData) {
    return userApi.put<TUser>(
      `${baseURL}/user/profile/avatar`,
      {
        headers: {},
      },
      data
    )
  }

  async getUserByID(id: number) {
    return userApi.get<TUser>(`${baseURL}/user/${id}`)
  }
}
