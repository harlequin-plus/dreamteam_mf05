import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispath, RootState } from './store'

export const AppUseDispatch = () => useDispatch<AppDispath>()
export const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector
