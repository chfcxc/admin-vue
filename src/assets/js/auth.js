const userInfoKey = 'user-info'

export function saveUserInfo (userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

export function getToken () {
  return JSON.parse(getUserInfo()).token
}

export function removeUserInfo () {
  return window.localStorage.removeItem(userInfoKey)
}
