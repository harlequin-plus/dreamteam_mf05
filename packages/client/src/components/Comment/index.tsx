import { FC } from 'react'
import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material'
import { formatDate } from '../../utils/formatDate'
import { TUser } from '../../models/TUser'
import EmojisLine, { dbDATA } from '../EmojisLine'

type OwnProps = {
  content: string
  user: TUser
  date: Date
  ordinalNumber: number
}

const Comment: FC<OwnProps> = ({ content, user, date, ordinalNumber }) => {
  const avatar = user?.avatar ? `${user.avatar}` : ''
  const display_name = user?.display_name
    ? user?.display_name
    : `Пользователь ${user.id}`

  const displayFullDate = formatDate(date)

  return (
    // <Grid
    //   container
    //   columnSpacing={0}
    //   my={1}
    //   py={0}
    //   border={1}
    //   borderColor={'warning.main'}>
    <TableRow>
      <TableCell width={'20%'}>
        <Box display={'flex'} alignItems="center" flexDirection="column">
          <Avatar src={avatar} sx={{ width: 56, height: 56 }} />
          <Typography p={1} variant="subtitle1">
            {display_name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell width={'80%'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'} variant="caption">
            {displayFullDate}
          </Typography>
          <Typography color={'text.secondary'} variant="caption">
            {`#${ordinalNumber}`}
          </Typography>
        </Box>
        <Typography variant="body2" m={2}>
          {content}
        </Typography>
        <EmojisLine dbDATA={dbDATA} />
      </TableCell>
    </TableRow>
    // </Grid>
  )
}

export default Comment
