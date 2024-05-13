import AddEmoji from '../AddEmoji'
import { Box, Tooltip, Typography } from '@mui/material'

type EmojisModel = {
  id: number
  messageID: number
  unicode: string
  userID: number
}
type Emojis = {
  [key in EmojisModel['unicode']]: Array<EmojisModel['userID']>
}

export const dbDATA: EmojisModel[] = [
  {
    id: 1,
    messageID: 1,
    unicode: '\u{1F649}', //добавить е в модели
    userID: 1,
  },
  {
    id: 2,
    messageID: 1,
    unicode: '\u{1F649}', //добавить е в модели
    userID: 2,
  },

  {
    id: 3,
    messageID: 1,
    unicode: '\u{1F9D0}', //добавить е в модели
    userID: 2,
  },
]

function prepareData(data: EmojisModel[]) {
  const result: Emojis = {}
  for (let i = 0; i < data.length; i++) {
    const unicode = data[i]?.unicode
    if (result?.[unicode]) {
      result[unicode].push(data[i].userID)
    } else {
      result[unicode] = [data[i].userID]
    }
  }
  return Object.entries(result)
}

type Props = {
  dbDATA: EmojisModel[]
}
export default function EmojisLine({ dbDATA }: Props) {
  const data = prepareData(dbDATA)
  const insertEmoji = (emoji: string) => {
    console.log('send Emoji to DB, then rerender Emojis', emoji)
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
