import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const adminData = 'adminData'
const discountData = 'discountDataen'
const homeData = 'homeData'
const integralData = 'integralData'
const orderData = 'orderData'
const parkData = 'parkData'
const serverData = 'serverData'
const shoppingData = 'shoppingData'
const systemData = 'systemData'
const userData = 'userData'
// 权限
export function setAdminData(token) {
  return Cookies.set(adminData, token)
}
export function getAdminData() {
  return Cookies.get(adminData)
}

export function setDiscountData(token) {
  return Cookies.set(discountData, token)
}
export function getDiscountData() {
  return Cookies.get(discountData)
}

export function setHomeData(token) {
  return Cookies.set(homeData, token)
}
export function getHomeData() {
  return Cookies.get(homeData)
}

export function setIntegralData(token) {
  return Cookies.set(integralData, token)
}
export function getIntegralData() {
  return Cookies.get(integralData)
}

export function setOrderData(token) {
  return Cookies.set(orderData, token)
}
export function getOrderData() {
  return Cookies.get(orderData)
}

export function setParkData(token) {
  return Cookies.set(parkData, token)
}
export function getParkData() {
  return Cookies.get(parkData)
}

export function setServerData(token) {
  return Cookies.set(serverData, token)
}
export function getServerData() {
  return Cookies.get(serverData)
}

export function setShoppingData(token) {
  return Cookies.set(shoppingData, token)
}
export function getShoppingData() {
  return Cookies.get(shoppingData)
}

export function setSystemData(token) {
  return Cookies.set(systemData, token)
}
export function getSystemData() {
  return Cookies.get(systemData)
}

export function setUserData(token) {
  return Cookies.set(userData, token)
}
export function getUserData() {
  return Cookies.get(userData)
}
// 用户
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 0.1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
