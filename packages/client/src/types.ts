import { TUser } from './models/TUser'

export type TupleUseState<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export type DataModalForm = Record<string, string>

export type InputType = 'email' | 'tel' | 'text' | 'password'

export type InputName =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'tel'
  | 'oldPassword'
  | 'newPassword'
  | 'comment'
  | 'title'

export type InputAutocomlete =
  | 'email'
  | 'tel'
  | 'password'
  | 'login'
  | 'first_name'
  | 'second_name'

export type LoadStatus = 'success' | 'loading' | 'failed' | 'noloaded'

export type UserState = {
  item: TUser
  loadStatus: LoadStatus
  isLoading: boolean
}
