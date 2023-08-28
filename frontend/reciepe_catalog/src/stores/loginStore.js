/* eslint-disable no-unused-vars */
// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginStore = defineStore('loginStore', () => {
  async function validateUser(payload) {
    axios
      .post('http://localhost:3007/auth/login', { email: payload.email, password: payload.password })
      .then((res) => {
        let user = res.data
        console.log(user)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return { validateUser }
})
