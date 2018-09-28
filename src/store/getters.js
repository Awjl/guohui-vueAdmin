const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  adminData: state => state.user.adminData,
  discountData: state => state.user.discountData,
  homeData: state => state.user.homeData,
  integralData: state => state.user.integralData,
  orderData: state => state.user.orderData,
  parkData: state => state.user.parkData,
  serverData: state => state.user.serverData,
  shoppingData: state => state.user.shoppingData,
  systemData: state => state.user.systemData,
  userData: state => state.user.userData
}
export default getters
