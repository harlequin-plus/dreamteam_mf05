import { baseURL } from '../constants'
import axios, { AxiosError } from 'axios'
import { LoginReqData, User } from './type'

const authAxios = axios.create({
  baseURL: `${baseURL}/auth`,
})
authAxios.defaults.headers.post = { 'Content-Type': 'application/json' }
authAxios.defaults.withCredentials = true

class AuthApi {
  async getUser(): Promise<User> {
    try {
      const { data } = await authAxios.get<User>('/user')
      return data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.reason) {
        throw new Error(error.response?.data.reason)
      } else {
        throw error
      }
    }
  }

  public async signIn(reqData: LoginReqData): Promise<void> {
    try {
      await authAxios.post<User>(`signin`, {
        ...reqData,
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.reason) {
        throw new Error(error.response?.data.reason)
      } else {
        throw error
      }
    }
  }
}

const authApi = new AuthApi()

export default authApi
