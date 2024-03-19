import { ChangePass, User } from './type'
import BaseApi from './baseApi'

const baseApi = new BaseApi('/user')
class UserApi {
  async changePassword(req: ChangePass): Promise<void> {
    baseApi.put<void, ChangePass>('password', req)
  }

  public async changeAvatar(file: File): Promise<User> {
    const user = await baseApi.putWithoutHeaders<User>('/profile/avatar', file)
    return user
  }
}

const userApi = new UserApi()

export default userApi
