import { Emojis } from '../../models/Emojis'
import { IEmoji } from '../../models/types'

// Создание emoji
export async function createEmoji({ CommentId, unicod, UserId }: IEmoji) {
  const emoji = await Emojis.findOne({ where: { CommentId, unicod, UserId } })
  if (emoji) return
  return Emojis.create({ CommentId, unicod, UserId })
}

// Удаление emoji по ID сообщения и ID юзера
export async function deleteUserByIds({
  CommentId,
  UserId,
}: Omit<IEmoji, 'unicod'>) {
  return Emojis.destroy({ where: { CommentId, UserId } })
}

//получение всех emoji в сообщении
export async function getEmojisByCommentId({
  CommentId,
}: Pick<IEmoji, 'CommentId'>) {
  return Emojis.findAll({ where: { CommentId } })
}
