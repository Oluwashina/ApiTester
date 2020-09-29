import Vue from 'vue'
import VueRouter from 'vue-router'
import Example from '../views/Example.vue'
import Example2 from '../views/Example2.vue'
import ViewExample from '../views/ViewExample.vue'
import MainLayout from '@/Layouts/MainLayout.vue'
import AddRequest from '../views/AddRequest.vue'
import AddFolderRequest from '../views/AddFolderRequest';

Vue.use(VueRouter)

  const routes = [

    {
      path: '/',
      redirect: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'Example',
          component: Example
        },
        {
          path: '/project/:id',
          name: 'ViewExample',
          component: ViewExample
        },
        {
          path: '/addrequest/:id',
          name: 'AddRequest',
          component: AddRequest
        },
        {
          path: '/addfolderrequest/:id',
          name: 'AddFolderRequest',
          component: AddFolderRequest
        }
      ]
    },
  {
    path: '/home',
    name: 'Example2',
    component: Example2
  },
 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
