import Vue from 'vue'
import App from './App.vue'
import imgAutoShow from './imgAutoShow'
Vue.use(imgAutoShow);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
