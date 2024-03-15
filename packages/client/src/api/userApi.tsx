import { baseURL } from '../constants'
import axios, { AxiosError } from 'axios'
import { ChangePass, User } from './type'

const userAxios = axios.create({
  baseURL: `${baseURL}/user`,
})

const avatarAxios = axios.create({
  baseURL: `${baseURL}/user`,
})
avatarAxios.defaults.withCredentials = true
userAxios.defaults.headers.post = { 'Content-Type': 'application/json' }
userAxios.defaults.withCredentials = true
class UserApi {
  async changePassword(req: ChangePass): Promise<void> {
    try {
      await userAxios.put<User>('password', { ...req })
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.reason) {
        throw new Error(error.response?.data.reason)
      } else {
        throw error
      }
    }
  }

  public async changeAvatar(file: File): Promise<User> {
    try {
      const { data } = await avatarAxios.putForm<User>(`profile/avatar`, {
        avatar: file,
      })
      return data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.reason) {
        throw new Error(error.response?.data.reason)
      } else {
        throw error
      }
    }
  }
}

const userApi = new UserApi()

export default userApi
