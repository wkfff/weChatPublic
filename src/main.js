// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/components/Home'
import Contact from '@/components/Contact'
import News from '@/components/News'
import WaterKnowledge from '@/components/WaterKnowledge'
import WaterKnowledgeContent from '@/components/WaterKnowledgeContent'
import WaterManage from '@/components/WaterManage'
import WaterManageContent from '@/components/WaterManageContent'
import Regulate from '@/components/Regulate'
import RegulateContent from '@/components/RegulateContent'
import Cooperation from '@/components/Cooperation'
import CallForPapers from '@/components/CallForPapers'
import NewsContent from '@/components/NewsContent'
import RiverManageStyle from '@/components/RiverManageStyle'
import RiverManageContent from '@/components/RiverManageContent'
import JobContent from '@/components/JobContent'
import JobForm from '@/components/JobForm'
import Task from '@/components/Task'
import TaskXS from '@/components/TaskXS'
import DownLoad from '@/components/DownLoad'
import ResultsWater from '@/components/ResultsWater'
import ResultsWaterContent from '@/components/ResultsWaterContent'
import Hotcomplaints from '@/components/Hotcomplaints'
import HotcomplaintsXS from '@/components/HotcomplaintsXS'
import HotcomplaintsContent from '@/components/HotcomplaintsContent'
import Jwintroduce from '@/components/Jwintroduce'

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import vuePicturePreview  from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(vuePicturePreview )
Vue.config.productionTip = false
Vue.use(Router)
Vue.use(VueResource)
Vue.use(ElementUI);

/* eslint-disable no-new */

const router = new Router({
    base: __dirname,
    linkActiveClass: "active",
    routes: [
        {name:'Home', path: '/', component: Home,meta:{title: '招聘信息'}},
        {name:'Contact',path: '/Contact', component: Contact,meta:{title: '联系我们'}},
        {name:'News',path: '/News', component: News,meta:{title: '新闻动态'}},
        {name:'DownLoad',path: '/DownLoad', component: DownLoad,meta:{title: '下载APP'}},
        {name:'NewsContent',path: '/NewsContent/:id', component: NewsContent,meta:{title: '新闻动态'}},
        {name:'WaterKnowledge',path: '/WaterKnow', component: WaterKnowledge,meta:{title: '水质常识'}},
        {name:'WaterKnowledgeContent',path: '/WaterKnowContent/:id', component: WaterKnowledgeContent,meta:{title: '水质常识'}},
        {name:'WaterManage',path: '/WaterManage', component: WaterManage,meta:{title: '科学治水'}},
        {name:'WaterManageContent',path: '/WaterManageContent/:id', component: WaterManageContent,meta:{title: '科学治水'}},
        {name:'Regulate',path: '/Regulate', component: Regulate,meta:{title: '政策法规'}},
        {name:'RegulateContent',path: '/RegulateContent/:id', component: RegulateContent,meta:{title: '政策法规'}},
        {name:'Cooperation',path: '/Cooperation', component: Cooperation,meta:{title: '商务合作'}},
        {name:'CallForPapers',path: '/CallForPapers', component: CallForPapers,meta:{title: '治水知识征稿'}},
        {name:'RiverManageStyle',path: '/RMStyle', component: RiverManageStyle,meta:{title: '河长风采'}},
        {name:'RiverManageContent',path: '/RiverManageContent/:uname/:id', component: RiverManageContent,meta:{title: '河长风采'}},
        {name:'Task',path: '/Task', component: Task,meta:{title: '随手拍'}},
        {name:'TaskXS',path: '/TaskXS', component: TaskXS,meta:{title: '随手拍'}},
        {name:'JobContent',path: '/jobcontent/:id',component: JobContent,meta:{title: '招聘信息'}},
        {name:'JobForm',path: '/jobform/:id',component: JobForm,meta:{title: '投递简历'}},
        {name:'ResultsWater',path: '/ResultsWater',component: ResultsWater,meta:{title: '治水成果'}},
        {name:'ResultsWaterContent',path: '/ResultsWaterContent/:id',component: ResultsWaterContent,meta:{title: '治水详情'}},
        {name:'Hotcomplaints',path: '/Hotcomplaints',component: Hotcomplaints,meta:{title: '热门投诉'}},
        {name:'HotcomplaintsXS',path: '/HotcomplaintsXS',component: HotcomplaintsXS,meta:{title: '热门投诉'}},
        {name:'HotcomplaintsContent',path: '/HotcomplaintsContent/:id',component: HotcomplaintsContent,meta:{title: '投诉详情'}},
        {name:'Jwintroduce',path: '/Jwintroduce',component: Jwintroduce,meta:{title: '九问概况'}},
    ]
})
/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

const vm = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
