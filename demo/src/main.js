import Vue from 'vue'
import App from './App.vue'
import VueGithub from 'vue-github'

Vue.use(VueGithub);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')