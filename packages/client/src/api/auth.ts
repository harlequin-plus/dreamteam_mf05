const HOST = 'https://ya-praktikum.tech/api/v2'

class AuthApi {
  // async create(data: CreateUser): Promise<SignUpResponse> {
  //     return authApi.post<SignUpResponse>('/signup', {data})
  // }

  async login(data: LoginRequestData): Promise<void | APIError> {
    const response = await fetch(`${HOST}/auth/signin`, {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await response.json()
  }

  async me() {
    const response = await fetch(`${HOST}/auth//user`, {
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
  }

  // async logout(): Promise<void | APIError> {
}
const authApi = new AuthApi()
export default authApi
