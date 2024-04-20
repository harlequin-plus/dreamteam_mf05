import { TUser } from '../models/TUser'

export interface UserRepository {
  getCurrent(): Promise<TUser>
}

// TODO: найти подходящее место
export class UserService {
  constructor(private _repo: UserRepository) {}
  getCurrentUser() {
    return this._repo.getCurrent()
  }
}
