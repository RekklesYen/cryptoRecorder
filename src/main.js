import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
Vue.config.productionTip = false
Vue.component(VeLine.name, VeLine)
Vue.component(VePie.name, VePie)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
