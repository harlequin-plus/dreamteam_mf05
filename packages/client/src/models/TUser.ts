export type TUserDTO = {
  id: number
  first_name: string
  second_name: string
  display_name: string | undefined
  phone: string
  login: string
  avatar: string | undefined
  email: string
  password: string
}

export type TUser = Omit<TUserDTO, 'password'>
