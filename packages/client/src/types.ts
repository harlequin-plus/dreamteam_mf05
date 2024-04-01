import { User } from './api/type'

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
  | 'addComment'

export type InputAutocomlete =
  | 'email'
  | 'tel'
  | 'password'
  | 'login'
  | 'first_name'
  | 'second_name'

export type CommentType = {
  user: User
  content: string
  date: Date
  id: number
}

export type TopicType = {
  comments: CommentType[]
  name: string
}