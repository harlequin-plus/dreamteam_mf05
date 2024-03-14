export type APIError = {
  reason: string
}

export type UserDTO = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
  password: string
}

export type CreateUser = Omit<UserDTO, 'id' | 'avatar' | 'display_name'>

export type SignUpResponse = Pick<UserDTO, 'id'>

export type LoginReqData = Pick<UserDTO, 'login' | 'password'>

export type User = Omit<UserDTO, 'password'>

export type changeUser = Omit<User, 'id' | 'avatar'>

export type ChangePass = {
  oldPassword: string
  newPassword: string
}
