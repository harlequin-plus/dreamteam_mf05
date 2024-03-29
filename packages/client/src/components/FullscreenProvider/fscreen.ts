const key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
}

// Do not change order!
const webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror',
]

// Do not change order!
const moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror',
]

// Do not change order!
const ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  'MSFullscreenChange',
  'MSFullscreenError',
]

const document: any = // eslint-disable-line
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
    ? window.document
    : {} // eslint-disable-line

const vendor =
  ('fullscreenEnabled' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  []

export class fscreen {
  static requestFullscreen(element: any) {
    // eslint-disable-line
    return element[vendor[key.requestFullscreen]]()
  }
  static requestFullscreenFunction(element: any) {
    // eslint-disable-line
    return element[vendor[key.requestFullscreen]]
  }
  static get exitFullscreen() {
    return document[vendor[key.exitFullscreen]].bind(document)
  }
  static addEventListener(type: any, handler: any, options: any) {
    // eslint-disable-line
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return document.addEventListener(vendor[key[type]], handler, options)
  }
  static removeEventListener(type: any, handler: any, options: any) {
    // eslint-disable-line
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return document.removeEventListener(vendor[key[type]], handler, options)
  }
  static get fullscreenEnabled() {
    return Boolean(document[vendor[key.fullscreenEnabled]])
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static set fullscreenEnabled(_) {}
  static get fullscreenElement() {
    return document[vendor[key.fullscreenElement]]
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static set fullscreenElement(_) {}
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
