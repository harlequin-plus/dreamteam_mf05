import { useEffect, ReactNode } from 'react'

const key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
}

const webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror',
]

const moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror',
]

const ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  'MSFullscreenChange',
  'MSFullscreenError',
]

const document: any =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
    ? window.document
    : {} // eslint-disable-line

const vendor =
  ('fullscreenEnabled' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  []

class fscreen {
  static requestFullscreen(element: any) {
    return element[vendor[key.requestFullscreen]]()
  } // eslint-disable-line
  static requestFullscreenFunction(element: any) {
    return element[vendor[key.requestFullscreen]]
  } // eslint-disable-line
  static get exitFullscreen() {
    return document[vendor[key.exitFullscreen]].bind(document)
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  static addEventListener(type: any, handler: any, options: any) {
    return document.addEventListener(vendor[key[type]], handler, options)
  } // eslint-disable-line
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  static removeEventListener(type: any, handler: any, options: any) {
    return document.removeEventListener(vendor[key[type]], handler, options)
  } // eslint-disable-line
  static get fullscreenEnabled() {
    return Boolean(document[vendor[key.fullscreenEnabled]])
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static set fullscreenEnabled(val) {}
  static get fullscreenElement() {
    return document[vendor[key.fullscreenElement]]
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static set fullscreenElement(val) {}
  static get onfullscreenchange() {
    return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()]
  }
  static set onfullscreenchange(handler) {
    document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler
  }
  static get onfullscreenerror() {
    return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()]
  }
  static set onfullscreenerror(handler) {
    document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler
  }
}

type Props = {
  children: ReactNode
  onChange?: (state: boolean) => void
  onClose?: () => void
  onOpen?: () => void
  enabled?: boolean
}

export const FullscreenProvider = ({
  children,
  onChange,
  onOpen,
  onClose,
  enabled,
}: Props) => {
  let fullscreenRef: HTMLElement | null = null

  const handleChange = () => {
    if (onChange) {
      onChange(!!fscreen.fullscreenElement)
    }

    if (onOpen && !!fscreen.fullscreenElement) {
      onOpen()
    }

    if (onClose && !fscreen.fullscreenElement) {
      onClose()
    }
  }

  useEffect(() => {
    fscreen.addEventListener('fullscreenchange', handleChange, {})
    return () =>
      fscreen.removeEventListener('fullscreenchange', handleChange, {})
  }, [])

  useEffect(() => {
    const enabledEl = fscreen.fullscreenElement
    if (enabledEl && !enabled) {
      fscreen.exitFullscreen()
    } else if (!enabledEl && enabled) {
      fscreen.requestFullscreen(fullscreenRef)
    }
  }, [enabled])

  return (
    <div
      className="FullScreen"
      ref={node => (fullscreenRef = node)}
      style={{ height: '100%', width: '100%' }}>
      {children}
    </div>
  )
}
