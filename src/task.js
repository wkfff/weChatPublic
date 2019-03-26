// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Task from '@/components/Task'
import TaskIndex from '@/components/TaskIndex'
import TaskList from '@/components/TaskList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(VueResource)

/* eslint-disable no-new */

const router = new Router({
    base: __dirname,
    linkActiveClass: "active",
    routes: [
    	{name:'TaskList',path: '/', component: TaskList,meta:{title: '我的爆料'}},
        {name:'Task',path: '/Task', component: Task,meta:{title: '填写爆料'}},
        {name:'TaskIndex',path: '/TaskIndex', component: TaskIndex,meta:{title: '我要爆料'}},
    ]
})
/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

new Vue({
    el: '#task',
    router,
    render: h => h(task)
})
