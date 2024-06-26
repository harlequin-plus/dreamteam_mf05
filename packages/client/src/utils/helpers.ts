export const getColorForValue = (value: number) => {
  switch (value) {
    case 2:
      return '#eee4da'
    case 4:
      return '#ede0c8'
    case 8:
      return '#f2b179'
    case 16:
      return '#f59563'
    case 32:
      return '#f67c5f'
    case 64:
      return '#f65e3b'
    case 128:
      return '#edcf72'
    case 256:
      return '#edcc61'
    case 512:
      return '#edc850'
    case 1024:
      return '#edc53f'
    case 2048:
      return '#edc22e'
    default:
      return '#1D1F34'
  }
}

export const keysMapper: Record<string, 'left' | 'right' | 'up' | 'down'> = {
  ArrowLeft: 'left',
  a: 'left',
  ф: 'left',
  A: 'left',
  Ф: 'left',

  ArrowUp: 'up',
  w: 'up',
  W: 'up',
  ц: 'up',
  Ц: 'up',

  ArrowRight: 'right',
  в: 'right',
  d: 'right',
  В: 'right',
  D: 'right',

  ArrowDown: 'down',
  s: 'down',
  S: 'down',
  ы: 'down',
  Ы: 'down',
}
