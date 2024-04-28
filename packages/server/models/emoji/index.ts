import { Emoji, IEmoji } from './emoji'

// Создание emoji
export async function createEmoji({ messageID, unicod, userID }: IEmoji) {
  const emoji = await Emoji.findOne({ where: { messageID, unicod, userID } })
  if (emoji) return
  return Emoji.create({ messageID, unicod, userID })
}

// Удаление emoji по ID сообщения и ID юзера
export async function deleteUserByIds({
  messageID,
  userID,
}: Omit<IEmoji, 'unicod'>) {
  return Emoji.destroy({ where: { messageID, userID } })
}

//получение всех emoji в сообщении
export async function getEmojisByMessageID({
  messageID,
}: Pick<IEmoji, 'messageID'>) {
  return Emoji.findAll({ where: { messageID } })
}
