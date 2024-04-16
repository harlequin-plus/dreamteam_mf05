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
  | 'topicName'

export type InputAutocomlete =
  | 'email'
  | 'tel'
  | 'password'
  | 'login'
  | 'first_name'
  | 'second_name'

export type LoadStatus = 'success' | 'loading' | 'failed' | 'noloaded'

export type UserState = {
  item: User
  loadStatus: LoadStatus
  isLoading: boolean
}

export type CommentType = {
  user: User
  content: string
  date: Date
  id: string
}

export type TopicType = {
  id: string
  comments: CommentType[]
  name: string
  author: User
}