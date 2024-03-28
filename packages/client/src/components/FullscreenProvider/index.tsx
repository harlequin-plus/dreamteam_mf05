import { useEffect, ReactNode, useCallback } from 'react'
import { fscreen } from './fscreen'
import './index.css'

type Props = {
  children: ReactNode
  enabled?: boolean
  onChange?(state: boolean): void
  onClose?(): void
  onOpen?(): void
}

export const FullscreenProvider = ({
  children,
  onChange,
  onOpen,
  onClose,
  enabled,
}: Props) => {
  let fullscreenRef: HTMLElement | null = null

  const handleChange = useCallback(() => {
    onChange?.(!!fscreen.fullscreenElement)
    fscreen.fullscreenElement ? onOpen?.() : onClose?.()
  }, [onChange, onClose, onOpen])

  useEffect(() => {
    fscreen.addEventListener('fullscreenchange', handleChange, {})
    return () =>
      fscreen.removeEventListener('fullscreenchange', handleChange, {})
  }, [handleChange])

  useEffect(() => {
    const enabledEl = fscreen.fullscreenElement
    if (enabledEl && !enabled) {
      fscreen.exitFullscreen()
    } else if (!enabledEl && enabled) {
      fscreen.requestFullscreen(fullscreenRef)
    }
  }, [enabled, fullscreenRef])

  return (
    <div className="FullScreen" ref={node => (fullscreenRef = node)}>
      {children}
    </div>
  )
}
