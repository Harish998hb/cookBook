import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home-page.vue'
import Login from '../pages/login-page.vue'
import Register from '../pages/register-page.vue'
import CreateReciepe from '../pages/new-reciepe.vue'


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create_reciepe',
      name: 'create_reciepe',
      component: CreateReciepe
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },

  ]
})
export default router
