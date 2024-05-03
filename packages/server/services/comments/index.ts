import { IComments } from '../../models/types'
import { Comments } from '../../models/comments'
import { Users } from '../../models/users'

export const createComment = async ({ content, topic, author }: IComments) => {
  const comment = await Comments.create({ content, topic, author })
  return comment.id
}

export const getCommentById = async (
  commentsId: Pick<IComments, 'commentsId'>
) => {
  const comment = await Comments.findOne({
    where: {
      commentsId,
    },
    include: {
      model: Users,
      attributes: [
        'first_name',
        'second_name',
        'avatar',
        'email',
        'login',
        'phone',
      ],
    },
  })
  return comment
}

export const delComment = async (commentsId: Pick<IComments, 'commentsId'>) => {
  return await Comments.destroy({ where: { commentsId } })
}

export const editComment = async ({
  commentsId,
  content,
}: Pick<IComments, 'commentsId' | 'content'>) => {
  await Comments.update(
    {
      content,
    },
    {
      where: {
        commentsId,
      },
    }
  )
}
