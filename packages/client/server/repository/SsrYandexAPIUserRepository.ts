import axios from 'axios'
const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

export type TUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

export class SsrYandexAPIUserRepository {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrent(): Promise<TUser> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      headers: {
        cookie: this._cookieHeader,
      },
    })
    // console.log(data)
    return data
  }
}
