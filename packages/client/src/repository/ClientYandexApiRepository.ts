import { UserRepository } from '../api/UserService'
import { User } from '../api/type'
import { baseURL } from '../constants'
import { makeRequest } from '../utils/makeRequest'

export class ClientYandexApiRepository implements UserRepository {
  async getCurrent(): Promise<User> {
    const response = await makeRequest(`${baseURL}/auth/user`)
    return response.json()
  }
}
