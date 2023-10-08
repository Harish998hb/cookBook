import { defineStore } from 'pinia'
import { apiCall } from '../apiDetails/apiConfig'

import VueCookies from 'vue-cookies'

export const useLoginStore = defineStore('loginStore', () => {
  async function validateUser(payload) {
    return apiCall
      .post('auth/login', { email: payload.email, password: payload.password })
      .then((res) => {
        let user = res.data
        return user
      })
      .catch((err) => {
        console.error(err)
      })
  }
  async function createUser(payload) {
    await apiCall
      .post('auth/register', payload)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  function isAuth() {
    const token = VueCookies.get('token')
    if (token) return true
    else return false
  }

  return { validateUser, createUser, isAuth }
})
