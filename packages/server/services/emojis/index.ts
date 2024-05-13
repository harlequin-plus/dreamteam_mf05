import { Emojis } from '../../models/Emojis'
import { IEmoji } from '../../models/types'

// Создание emoji
export async function createEmoji({ CommentID, unicod, UserID }: IEmoji) {
  const emoji = await Emojis.findOne({ where: { CommentID, unicod, UserID } })
  if (emoji) return
  return Emojis.create({ CommentID, unicod, UserID })
}

// Удаление emoji по ID сообщения и ID юзера
export async function deleteUserByIds({
  CommentID,
  UserID,
}: Omit<IEmoji, 'unicod'>) {
  return Emojis.destroy({ where: { CommentID, UserID } })
}

//получение всех emoji в сообщении
export async function getEmojisByCommentID({
  CommentID,
}: Pick<IEmoji, 'CommentID'>) {
  return Emojis.findAll({ where: { CommentID } })
}
