import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/Style.scss'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/font.css'
import ElementUI from 'element-ui';
// import {Row,Col,Button,Icon,Image,Menu,Submenu,MenuItem,MenuItemGroup,Divider,Drawer } from 'element-ui';
Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(Row,Col,Button,Icon,Image,Menu,Submenu,MenuItem,MenuItemGroup,Divider,Drawer );

new Vue({
  el:'#app',
  render: h => h(App),
  router,
}).$mount('#app')
