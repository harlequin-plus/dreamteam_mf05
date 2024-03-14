import { baseURL } from '../constants'
import { APIError, User } from './type'

export default class AuthApi {
  async getUser(): Promise<User | APIError> {
    const getUser = await fetch(`${baseURL}/auth/user`, {
      credentials: 'include',
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        console.log('AuthApi.getUser', data)
        return data
      })
    return getUser
  }
}
