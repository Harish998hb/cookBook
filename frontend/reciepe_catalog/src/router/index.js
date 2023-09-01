import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home-page.vue'
import Login from '../pages/login-page.vue'
import Register from '../pages/register-page.vue'


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
