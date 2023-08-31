import axios from 'axios'

export const apiCall = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: 'http://localhost:3007/'
})
