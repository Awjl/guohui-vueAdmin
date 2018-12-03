import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
// import fliter from './utils/filter'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n 国际化

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control 权限验证

Vue.use(ElementUI)
// Vue.use(fliter)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
