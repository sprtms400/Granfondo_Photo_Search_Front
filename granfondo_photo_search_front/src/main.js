import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './assets/spinner.css'
import vuexStore from './services/vuexStore' // Vuex 스토어 임포트
import router from './router' // 라우터 임포트

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  router,
  vuexStore, // 스토어 등록
  render: h => h(App),
}).$mount('#app')
