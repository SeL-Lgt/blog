import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

let RouteList=[{
    path:'/',
    component:resolve=> require(['@/views/Home/App.vue'],resolve),
    children:[{
        path:'/Menu',
        name:''
    }]
}];

export default new Router({
    routes:RouteList,
    mode:'hash'
})
