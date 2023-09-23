/* eslint-disable no-unused-vars */
// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiCall } from '../apiDetails/apiConfig'

export const useLoginStore = defineStore('loginStore', () => {
  async function validateUser(payload) {
    apiCall
      .post('auth/login', { email: payload.email, password: payload.password })
      .then((res) => {
        let user = res.data
        console.log(user)
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
  return { validateUser, createUser }
})
