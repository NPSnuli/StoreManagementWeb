export const ACCESS_TOKEN = 'token'

export const logout = () => {
  clearTokenData()
}

export const clearTokenData = () => {
  localStorage.clear()
  location.reload()
}

export const getToken = () => {
  const value = localStorage.getItem(ACCESS_TOKEN)
  if (!value) clearTokenData()
  return value
}

export const getTokenData = () => {
  const value = localStorage.getItem(ACCESS_TOKEN)
  return value
}

export const setTokenData = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}
