import { UserRepository } from '../repository_services/UserService'
import { TUser } from '../models/TUser'
import { getUser } from '../services/auth'

export class ClientYandexApiUserRepository implements UserRepository {
  async getCurrent(): Promise<TUser> {
    return getUser()
  }
}
