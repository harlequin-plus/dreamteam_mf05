import { UserRepository } from '../api/UserService'
import { TUser } from '../models/TUser'
import { getUser } from '../services/auth'

export class ClientYandexApiRepository implements UserRepository {
  async getCurrent(): Promise<TUser> {
    return getUser()
  }
}
