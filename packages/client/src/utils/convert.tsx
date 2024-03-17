export function secondsToString(seconds: number) {
  const numyears = Math.floor(seconds / 31536000)
  const numdays = Math.floor((seconds % 31536000) / 86400)
  const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
  const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
  const numseconds = (((seconds % 31536000) % 86400) % 3600) % 60

  return (
    (numyears ? numyears + ' years ' : '') +
    (numdays ? numdays + ' days ' : '') +
    (numhours ? numhours + ' hours ' : '') +
    (numminutes ? numminutes + ' minutes ' : '') +
    (numseconds + ' seconds')
  )
}
