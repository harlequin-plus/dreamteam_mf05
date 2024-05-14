import { ITopic } from '../../models/types'
import { Topics } from '../../models/Topics'
import { Comments } from '../../models/Comments'
import { Users } from '../../models/Users'

export const createTopicEntry = async ({
  title,
  UserId,
}: Pick<ITopic, 'title' | 'UserId'>) => {
  const topic = await Topics.create({ title, UserId })
  return topic.id
}

export const getTopicbyId = async (id: number) => {
  return await Topics.findOne({
    where: {
      id,
    },
  })
}

export const getTopics = async () => {
  const topics = await Topics.findAll({
    attributes: ['id', 'title', ['UserId', 'TS']],
    include: [
      {
        model: Comments,
        attributes: ['id', ['createdAt', 'time'], 'UserId'],
        order: [['id', 'DESC']],
        limit: 1,
        required: true,

        include: [
          {
            model: Users,
          },
        ],
      },
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
  })
  return topics
}

export const deleteTopicEntry = async (id: number) => {
  return await Topics.destroy({
    where: { id },
  })
}
