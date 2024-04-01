import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxTsHook'

// import { FC } from 'react'

type OwnProps = {
  redirect: string
  children: React.ReactNode
}
// type Props = FC<OwnProps>

export const Protected = (props: OwnProps) => {
  const select = useAppSelector(state => ({
    loadStatus: state.userState.loadStatus,
  }))

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (select.loadStatus === 'failed' || select.loadStatus === 'noloaded') {
      navigate(props.redirect, { state: { back: location.pathname } })
    }
  }, [select.loadStatus])

  if (select.loadStatus === 'success') {
    return <>{props.children}</>
  } else {
    return <div>Ждём...</div>
  }
}
