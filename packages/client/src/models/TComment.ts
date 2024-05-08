import { TUser } from './TUser'

export type TComment = {
  commentId: number // TODO rename to id
  content: string
  date: string
  author: TUser
}

export type TComments = Array<TComment>

export type TCreateCommentResponse = {
  id: number
}
