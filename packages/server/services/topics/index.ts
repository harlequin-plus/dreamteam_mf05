import { ITopic } from '../../models/types'
import { Topics } from '../../models/topics'
import { Comments } from '../../models/comments'
import { Users } from '../../models/users'

export const createTopicEntry = async ({ title, author }: ITopic) => {
  const topic = await Topics.create({ title, author })
  return topic.id
}

export const getTopics = async () => {
  const topics = await Topics.findAll({
    include: [
      {
        model: Comments,
        attributes: ['time'],
        include: [
          {
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
        ],
      },
    ],
  })
  return topics
}

export const deleteTopicEntry = async ({
  topicId,
}: Pick<ITopic, 'topicId'>) => {
  await Topics.destroy({
    where: { topicId },
  })
}
