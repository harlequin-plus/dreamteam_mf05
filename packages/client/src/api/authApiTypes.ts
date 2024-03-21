export type SignUpDataType = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}
export type SignUpResponse = {
  id: number
}
export type APIError = {
  reason: string
}

export type SignInDataType = {
  login: string
  password: string
}
export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}
