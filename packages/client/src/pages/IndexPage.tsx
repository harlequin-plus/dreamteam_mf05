import GameBoard from '../components/GameBoard/GameBoard'
import PreGameScreen from '../components/preGameScreen/preGameScreen'
import { signInWithYandex } from '../services/apiService'
import { oauthRedirectURI } from '../constants'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/reduxTsHook'
import { fetchUser } from '../store/userState'

function IndexPage() {
  const dispatch = useAppDispatch()
  const getUserFromYandexOauth = async (code: string) => {
    await signInWithYandex({ code, redirect_uri: oauthRedirectURI })
    dispatch(fetchUser())
  }
  useEffect(() => {
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    const code = params.get('code')
    if (code) {
      getUserFromYandexOauth(code)
    }
  }, [])

  return (
    <>
      <PreGameScreen />
      <GameBoard />
    </>
  )
}

export default IndexPage
