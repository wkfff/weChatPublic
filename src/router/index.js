import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Contact from '@/components/Contact'
/*import Job from '@/components/Job'
import JobContent from '@/components/JobContent'
import JobForm from '@/components/JobForm'
*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/contact',
      name: 'Contact',
      component: Contact
    }/*,{
      path: '/jobcontent',
      name: 'JobContent',
      component: JobContent
    },{
      path: '/jobform',
      name: 'JobForm',
      component: JobForm
    },{
      path: '/job',
      name: 'Job',
      component: Job
    }*/
  ]
})
