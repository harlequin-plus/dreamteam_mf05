import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispath, RootState } from '../store'

export const useAppDispatch = () => useDispatch<AppDispath>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
