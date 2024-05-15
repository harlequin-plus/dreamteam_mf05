import { Emojis } from '../../models/Emojis'
import { IEmoji } from '../../models/types'

// Создание emoji
export async function createEmoji({ CommentId, unicode, UserId }: IEmoji) {
  const emoji = await Emojis.findOne({ where: { CommentId, unicode, UserId } })
  if (emoji) return
  return Emojis.create({ CommentId, unicode, UserId })
}

// Удаление emoji по ID сообщения и ID юзера
export async function deleteUserByIds({
  CommentId,
  UserId,
}: Omit<IEmoji, 'unicode'>) {
  return Emojis.destroy({ where: { CommentId, UserId } })
}

//получение всех emoji в сообщении
export async function getEmojisByCommentId({
  CommentId,
}: Pick<IEmoji, 'CommentId'>) {
  return Emojis.findAll({ where: { CommentId } })
}
