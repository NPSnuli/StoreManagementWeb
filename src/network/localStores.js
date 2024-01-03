export const ACCESS_TOKEN = 'token'

export const logout = () => {
  clearTokenData()
  location.reload()
}

export const clearTokenData = () => {
  localStorage.clear()
}

export const getTokenData = () => {
  const value = localStorage.getItem(ACCESS_TOKEN)
  return value
}

export const setTokenData = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}
