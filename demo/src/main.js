import Vue from "vue";
import App from "./App.vue";
import VueGithub from "../../src/main"; // this is local but will be 'vue-github' in any other app

Vue.use(VueGithub);

Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
