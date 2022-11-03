const FONT_SIZE = {
  XXS: '9px',
  XS: '11px',
  S: '13px',
  M: '15px',
  L: '19px',
  XL: '23px',
  XXL: '25px'
} as const

const SPACE = {
  XS: '4px',
  S: '8px',
  M: '16px',
  L: '20px',
  XL: '24px',
  XXL: '32px'
} as const

const RADIUS = {
  S: '4px',
  M: '8px',
  L: '12px'
} as const

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://127.0.0.1:3000'
const SIGNIN_REDIRECT_URL =
  process.env.REACT_APP_SIGNIN_REDIRECT_URL || 'http://localhost:3001/redirect'
const LOBBY_CHECKIN_FREQUENCY =
  parseInt(process.env.REACT_APP_LOBBY_CHECKIN_FREQUENCY as string) || 25000
const MIN_MOUSE_ENTROPY_SAMPLES =
  parseInt(process.env.REACT_APP_MIN_MOUSE_ENTROPY_SAMPLES as string) || 64

const SERVER_ERROR = {
  LOBBY_IS_FULL: 'lobby is full'
}

export {
  FONT_SIZE,
  SPACE,
  RADIUS,
  API_ROOT,
  SERVER_ERROR,
  SIGNIN_REDIRECT_URL,
  LOBBY_CHECKIN_FREQUENCY,
  MIN_MOUSE_ENTROPY_SAMPLES
}
