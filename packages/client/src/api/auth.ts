const HOST = 'https://ya-praktikum.tech/api/v2'

export default class AuthApi {
  // async create(data: CreateUser): Promise<SignUpResponse> {
  //     return authApi.post<SignUpResponse>('/signup', {data})
  // }

  // async login(data: LoginRequestData): Promise<void | APIError> {
  //     return authApi.post('/signin', {data});
  // }

  async me() {
    const response = await fetch(`${HOST}/user`, {
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // async logout(): Promise<void | APIError> {
  //     return authApi.post('/logout')
  // }
}
