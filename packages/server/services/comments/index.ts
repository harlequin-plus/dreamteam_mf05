import { IComments, ITopic } from '../../models/types'
import { Comments } from '../../models/Comments'
import { Users } from '../../models/Users'
import { Replies } from '../../models/Replies'
import { Topics } from '../../models/Topics'

export const createComment = async ({
  content,
  TopicId,
  UserId,
}: Pick<IComments, 'content' | 'TopicId' | 'UserId'>) => {
  const comment = await Comments.create({ content, TopicId, UserId })
  return comment.id
}

export const getCommentById = async (id: number) => {
  const comment = await Comments.findOne({
    where: {
      id,
    },
    attributes: ['id', 'content', ['createdAt', 'date']],
    include: [
      {
        model: Users,
        attributes: [
          'id',
          'first_name',
          'second_name',
          'avatar',
          'email',
          'login',
          'phone',
        ],
      },
      {
        model: Replies,
        attributes: ['id', 'content', ['createdAt', 'date']],
        include: [
          {
            model: Users,
            attributes: [
              'id',
              'first_name',
              'second_name',
              'avatar',
              'email',
              'login',
              'phone',
            ],
          },
        ],
      },
    ],
  })
  return comment
}

export const deleteComment = async (id: number) => {
  return await Comments.destroy({ where: { id } })
}

export const editComment = async ({
  id,
  content,
}: Pick<IComments, 'id' | 'content'>) => {
  await Comments.update(
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

export const getCommentsByTopicId = async ({ id }: Pick<ITopic, 'id'>) => {
  const topic = await Topics.findOne({
    where: {
      id,
    },
  })
  if (!topic) return
  const comments = await Comments.findAll({
    where: {
      TopicId: id,
    },
    attributes: ['id', 'content', ['createdAt', 'date']],
    include: [
      {
        model: Users,
      },
      {
        model: Replies,
        attributes: ['id', 'content', ['createdAt', 'date']],
        include: [
          {
            model: Users,
          },
        ],
      },
    ],
  })
  return comments
}

export const getCommentsAuthorByCommentId = async (id: number) => {
  const comment = await Comments.findOne({
    where: {
      id,
    },
    attributes: ['UserId'],
  })
  return comment?.UserId
}
