import { TUser } from './TUser'

export type TComment = {
  id: number
  content: string
  date: string
  User: TUser
}

export type TComments = Array<TComment>

export type TCreateCommentResponse = {
  id: number
}
