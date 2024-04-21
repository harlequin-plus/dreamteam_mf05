import { TChangePasswordInput } from '../models/TChangePasswordInput'
import { TUser } from '../models/TUser'
import { TAPIError } from '../models/TAPIError'
import { baseURL } from '../constants'
import { http, TResult } from '../utils/http'

export default class UserApi {
  async changePassword(
    data: TChangePasswordInput
  ): Promise<TResult<void | TAPIError>> {
    return http.put<void>(`${baseURL}/user/password`, data)
  }

  async changeAvatar(file: File): Promise<TResult<TUser | TAPIError>> {
    const formData = new FormData()
    formData.append('avatar', file)

    return http.put<TUser>(`${baseURL}/user/profile/avatar`, formData, {
      headers: {},
    })
  }
}
