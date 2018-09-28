import { login } from '@/api/login'
import { getToken, setToken, setAdminData, getAdminData, setDiscountData, getDiscountData, setHomeData, getHomeData, setIntegralData, getIntegralData, setOrderData, getOrderData, setParkData, getParkData, setServerData, getServerData, setShoppingData, getShoppingData, setSystemData, getSystemData, setUserData, getUserData } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    adminData: getAdminData(),
    discountData: getDiscountData(),
    homeData: getHomeData(),
    integralData: getIntegralData(),
    orderData: getOrderData(),
    parkData: getParkData(),
    serverData: getServerData(),
    shoppingData: getShoppingData(),
    systemData: getSystemData(),
    userData: getUserData()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_adminData: (state, adminData) => {
      state.adminData = adminData
    },
    SET_discountData: (state, discountData) => {
      state.discountData = discountData
    },
    SET_homeData: (state, homeData) => {
      state.homeData = homeData
    },
    SET_integralData: (state, integralData) => {
      state.integralData = integralData
    },
    SET_orderData: (state, orderData) => {
      state.orderData = orderData
    },
    SET_parkData: (state, parkData) => {
      state.parkData = parkData
    },
    SET_serverData: (state, serverData) => {
      state.serverData = serverData
    },
    SET_shoppingData: (state, shoppingData) => {
      state.shoppingData = shoppingData
    },
    SET_systemData: (state, systemData) => {
      state.systemData = systemData
    },
    SET_userData: (state, userData) => {
      state.userData = userData
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          console.log(data)
          setToken(data.token)

          setAdminData(data.adminData)
          setDiscountData(data.discountData)
          setHomeData(data.homeData)
          setIntegralData(data.integralData)
          setOrderData(data.orderData)
          setParkData(data.parkData)
          setServerData(data.serverData)
          setShoppingData(data.shoppingData)
          setSystemData(data.systemData)
          setUserData(data.userData)

          commit('SET_TOKEN', data.token)

          commit('SET_adminData', data.adminData)
          commit('SET_discountData', data.discountData)
          commit('SET_homeData', data.homeData)
          commit('SET_integralData', data.integralData)
          commit('SET_orderData', data.orderData)
          commit('SET_parkData', data.parkData)
          commit('SET_serverData', data.serverData)
          commit('SET_shoppingData', data.shoppingData)
          commit('SET_systemData', data.systemData)
          commit('SET_userData', data.userData)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
