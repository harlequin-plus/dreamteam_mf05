import { Leaderboard } from '../components/Leaderboard'
import { Button } from '@mui/material'

function LeaderboardPage() {
  const Test = async () => {
    try {
      const res = await fetch('http://localhost:3001/forum/reply', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          commentId: 6,
          content: 'Edit Reply from front',
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      console.log(data)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }
  return (
    <>
      <Button onClick={Test}> Test</Button>
      <Leaderboard />
    </>
  )
}

export default LeaderboardPage
