import { dateLocale } from '../constants'

export const formatDate = (date: Date) => {
  const dateFormatter = new Intl.DateTimeFormat(dateLocale)
  const timeFormatter = new Intl.DateTimeFormat(dateLocale, {
    hour: 'numeric',
    minute: 'numeric',
  })
  const displayDate = dateFormatter.format(date)
  const displayTime = timeFormatter.format(date)

  return `${displayDate} ${displayTime}`
}
