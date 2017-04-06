import cookie from 'react-cookie'

const COOKIENAME = 'sessionId'

export const loadCookie = () => { return cookie.load(COOKIENAME) }

export const saveCookie = () => {
  const token = createToken()
  cookie.save(COOKIENAME, token, { path: '/', expires: new Date(2035, 1, 1) })
  return token
}

const createToken = () => {
  return (Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2))
}
