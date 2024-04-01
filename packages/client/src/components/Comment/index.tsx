import { FC } from 'react'
import { User } from '../../api/type'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import { dateLocale } from '../../constants'
type OwnProps = {
  content: string
  user?: User
  date: Date
  ordinalNumber: number
}

const Comment: FC<OwnProps> = ({ content, user, date, ordinalNumber }) => {
  const avatar = user?.avatar ? `${user.avatar}` : ''

  const formatDate = (date: Date) => {
    const dateFormatter = new Intl.DateTimeFormat(dateLocale)
    const timeFormatter = new Intl.DateTimeFormat(dateLocale, {
      hour: 'numeric',
      minute: 'numeric',
    })
    const displayDate = dateFormatter.format(date)
    const displayTime = timeFormatter.format(date)

    return `${displayDate} ${displayTime}`
  }
  const displayFullDate = formatDate(date)

  return (
    <Grid
      container
      columnSpacing={0}
      my={1}
      py={0}
      border={1}
      borderColor={'warning.main'}>
      <Grid item xs={12} md={2} py={3}>
        <Box display={'flex'} alignItems="center" flexDirection="column">
          <Avatar src={avatar} sx={{ width: 56, height: 56 }} />
          <Typography p={1} variant="subtitle1">
            {user?.login}{' '}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={10}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'} variant="caption" m={1}>
            {displayFullDate}
          </Typography>
          <Typography color={'text.secondary'} variant="caption" m={1}>
            {`#${ordinalNumber}`}
          </Typography>
        </Box>
        <Typography variant="body2" m={2}>
          {content}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Comment
