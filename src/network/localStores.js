export const ACCESS_TOKEN = "token"

export const getTokenData = () => {
    const value = localStorage.getItem(ACCESS_TOKEN)
    return value
} 

export const setTokenData = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token)
}