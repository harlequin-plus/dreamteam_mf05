import GameBoard from '../components/GameBoard/GameBoard'
import PreGameScreen from '../components/preGameScreen/preGameScreen'
import { oauthRedirectURI } from '../constants'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../hooks/reduxTsHook'
import { fetchUser } from '../store/userState'
import { oauthSignInWithYandex } from '../services/auth'

function IndexPage() {
  const dispatch = useAppDispatch()

  const getUserFromYandexOauth = useCallback(
    (code: string) => {
      oauthSignInWithYandex({ code, redirect_uri: oauthRedirectURI })
        .then(() => {
          dispatch(fetchUser())
        })
        .catch(error => console.warn('signin error: ', error))
    },
    [dispatch]
  )

  useEffect(() => {
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    const code = params.get('code')
    if (code) {
      getUserFromYandexOauth(code)
    }
  }, [getUserFromYandexOauth])

  return (
    <>
      <PreGameScreen />
      <GameBoard />
    </>
  )
}

export default IndexPage
