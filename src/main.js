import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/Style.scss'
import './assets/font/font.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  el:'#app',
  render: h => h(App),
  router,
}).$mount('#app')
