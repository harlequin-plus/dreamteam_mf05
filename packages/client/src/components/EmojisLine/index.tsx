import AddEmoji from '../AddEmoji'
import { Box, Tooltip, Typography } from '@mui/material'
import { TEmojis, TEmoji } from '../../models/TEmoji'
import { addNewEmoji } from '../../services/emoji'

// type EmojisModel = {
//   id: number
//   messageID: number
//   unicode: string
//   userID: number
// }
type EmojisDTO = {
  [key in TEmoji['unicode']]: Array<TEmoji['UserId']>
}

// export const dbDATA: EmojisModel[] = [
//   {
//     id: 1,
//     messageID: 1,
//     unicode: '\u{1F649}', //добавить е в модели
//     userID: 1,
//   },
//   {
//     id: 2,
//     messageID: 1,
//     unicode: '\u{1F649}', //добавить е в модели
//     userID: 2,
//   },

//   {
//     id: 3,
//     messageID: 1,
//     unicode: '\u{1F9D0}', //добавить е в модели
//     userID: 2,
//   },
// ]

function prepareData(data: TEmojis) {
  const result: EmojisDTO = {}
  for (let i = 0; i < data.length; i++) {
    const unicode = data[i]?.unicode
    if (result?.[unicode]) {
      result[unicode].push(data[i].UserId)
    } else {
      result[unicode] = [data[i].UserId]
    }
  }
  return Object.entries(result)
}

type Props = {
  emojis: TEmojis
  CommentId: number
  UserId: number
}
export default function EmojisLine({ emojis, CommentId, UserId }: Props) {
  const data = prepareData(emojis)
  const insertEmoji = async (unicode: string) => {
    await addNewEmoji({ CommentId, unicode, UserId })
      .then(emoji => {
        console.log('send Emoji to DB, then rerender Emojis', emoji)
      })
      .catch(value => {
        console.log('error send newEmoji to DB', value)
      })
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <AddEmoji fontSize={1.4} horizontal={'right'} insertEmoji={insertEmoji} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {data.map(([key, value], index) => (
          <Tooltip
            key={index}
            title={value.map(item => item.toString()).join(', ')}
            placement="top">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '13px',
                padding: '1px 5px',
              }}>
              <Typography>{key}</Typography>
              {value.length}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  )
}
