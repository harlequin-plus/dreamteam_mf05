import { Replies } from '../../models/Replies'
import { IReplies } from '../../models/types'

export const createReply = async ({
  content,
  CommentId,
  UserId,
}: Pick<IReplies, 'content' | 'CommentId' | 'UserId'>) => {
  const comment = await Replies.create({ content, CommentId, UserId })
  return comment.id
}

export const editReply = async ({
  id,
  content,
}: Pick<IReplies, 'id' | 'content'>) => {
  await Replies.update(
    {
      content,
    },
    {
      where: {
        id,
      },
    }
  )
}

export const deleteReply = async (id: number) => {
  return await Replies.destroy({ where: { id } })
}

export const getReplyAuthorByReplyId = async (id: number) => {
  const comment = await Replies.findOne({
    where: {
      id,
    },
    attributes: ['UserId'],
  })
  return comment?.UserId
}
