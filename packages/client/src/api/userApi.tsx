import { baseURL } from '../constants'
import { User } from './authApi'

import { APIError, ChangePass } from './type'
const userHost = `${baseURL}/user`

export default class UserApi {
  async changePassword(data: ChangePass): Promise<void | APIError> {
    const response = await fetch(`${userHost}/password`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return
        } else {
          return response.json()
        }
      })
      .then(data => {
        if (!data) return
        console.log('AuthApi.signIn', data)
        return data
      })
    return response
  }

  async changeAvatar(file: FormData): Promise<APIError | User> {
    const response = await fetch(`${userHost}/profile/avatar`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      body: file,
    })
      .then(response => {
        if (response.ok) {
          return
        } else {
          return response.json()
        }
      })
      .then(data => {
        if (!data) return
        console.log('AuthApi.signIn', data)
        return data
      })
    return response
  }
}
