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

  async changeAvatar(data: FormData): Promise<TResult<TUser | TAPIError>> {
    return http.put<TUser>(`${baseURL}/user/profile/avatar`, data, {
      headers: {},
    })
  }

  async getUserByID(id: number): Promise<TResult<TUser | TAPIError>> {
    return http.get<TUser>(`${baseURL}/user/${id}`)
  }
}
