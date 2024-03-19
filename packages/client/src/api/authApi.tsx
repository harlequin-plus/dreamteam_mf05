import { LoginReqData, User } from './type'
import BaseApi from './baseApi'

const baseApi = new BaseApi('/auth')

class AuthApi {
  async getUser(): Promise<User> {
    const user = await baseApi.get<User>('/user')
    return user
  }

  async signIn(reqData: LoginReqData): Promise<void> {
    await baseApi.post<User, LoginReqData>(`signin`, {
      ...reqData,
    })
  }
}

const authApi = new AuthApi()

export default authApi
