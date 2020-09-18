import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
Vue.use(Router)
// const _import = require('./_import_' + process.env.NODE_ENV + '.js')
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require("./_import_" + process.env.NODE_ENV+ '.js');
console.log(process.env.NODE_ENV)
//登录及其全局页面
const globalRoutes = [
  {
    path:'/',
    redirect:'/login',
  },
  { 
    path: '/login',
    name: '/login',
    component: _import( 'login')
  },
  {
    path: '/tihuan',
    name: '/tihuan',
    component:  _import( 'tihuan'),
  },
]
//页面
const mainRoutes = [
  {
    path: '/adminView',
    name: 'adminView',
    component: _import( 'adminView/adminView'),
    meta: {auth:true},
    redirect:'/adminView/index',
    children:[
      {
        path: 'index',
        name: 'index',
        component: _import( 'adminView/page/index'),
        meta: {auth:true,indexHide:true},
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        component: _import( 'adminView/page/userManagement'),
        meta: {auth:true,indexHide:true},
      },
      {
        path: 'managementDepartment',
        name: 'managementDepartment',
        component: _import( 'adminView/page/managementDepartment'),
        meta: {auth:true,indexHide:true},
      },
      {
        path: 'doctorManagement',
        name: 'doctorManagement',
        component: _import( 'adminView/page/doctorManagement'),
        meta: {auth:true,indexHide:true},
      },
      {
        path: 'doctorEvaluation',
        name: 'doctorEvaluation',
        component: _import( 'adminView/page/doctorEvaluation'),
        meta: {auth:true,indexHide:true},
      },
      
    ]
  },
  {
  	path: '/view',
  	component: _import( 'view'),
  	redirect:'/view/index',
  	children:[
      {
        path: 'hosIndex',
        name: '/hosIndex',
        component: _import( 'hosIndex')
      
      },
    ],
  }
  // {
  //   path: '/add-hos',
  //   name: '/add-hos',
  //   component: _import( 'add-hos')

  // }
]
// console.log(_import( 'view'))
const router = new Router({
  routes: globalRoutes.concat(mainRoutes)
})

router.afterEach((to,from) =>{
  Store.state.common.nowRouter.to = to;
  Store.state.common.nowRouter.from = from;
  if(to.path == from.path){
    // next({path:'/tihuan',query:to.query})
    router.push({path:'/tihuan',query:{query:JSON.stringify(to.query),path:to.path}})
  }
})


export default router
