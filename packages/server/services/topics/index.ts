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
    attributes: ['id', 'title'],
    include: [
      {
        model: Comments,
        attributes: ['id', ['createdAt', 'time']],
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
      },
    ],
  })
  for (let i = 0; i < topics.length; i++) {
    if (
      topics[i].dataValues.Comments &&
      topics[i].dataValues.Comments?.length != 0
    ) {
      topics[i].dataValues.last_message = topics[i].dataValues.Comments?.[0]
    } else {
      topics[i].dataValues.last_message = undefined
    }
    delete topics[i].dataValues.Comments
  }

  return topics
}

export const deleteTopicEntry = async (id: number) => {
  return await Topics.destroy({
    where: { id },
  })
}
