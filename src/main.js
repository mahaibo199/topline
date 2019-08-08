import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import '@/style/base.less'

import axios from '@/api'
import myCom from '@/components'
Vue.use(myCom)
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(element)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
