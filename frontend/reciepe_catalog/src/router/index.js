import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'

import Home from '../pages/home-page.vue'
import Login from '../pages/login-page.vue'
import Register from '../pages/register-page.vue'
import CreateReciepe from '../pages/new-reciepe.vue'
import SavedReciepe from '../pages/saved-reciepes.vue'
import SingleReciepe from '../pages/single-reciepe.vue'

function isAuth() {
  const token = VueCookies.get('token')
  console.log(window.location.href)
  if (token) return true
  else return false
}
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reciepe/:id',
      name: 'individual-reciepe',
      component: SingleReciepe
    },
    {
      path: '/create_reciepe',
      name: 'create_reciepe',
      component: CreateReciepe,
      meta:{
        auth:true,
      },
      props:true,
    },
    {
      path: '/saved_reciepe',
      name: 'saved_reciepe',
      component: SavedReciepe,
      meta:{
        auth:true,
      },
      props:true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = isAuth()
  if (!isAuthenticated && 'auth' in to.meta && to.meta.auth) {
    next('/login')
  } else if (isAuthenticated && 'auth' in to.meta && !to.meta.auth) {
    next('/')
  } else {
    next()
  }
})
export default router
