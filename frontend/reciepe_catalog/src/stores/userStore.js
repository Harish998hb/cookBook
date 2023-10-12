import { defineStore } from 'pinia'
import { apiCall } from '../apiDetails/apiConfig'

export const useUserStore = defineStore('userStore', () => {
  // For Fetching the user details
  async function fetchAccDetails(userId) {
    try {
      let details = await apiCall.get(`auth/user/${userId}`)
      console.log(details.data)
      return details.data
    } catch (err) {
      console.error(err)
    }
  }

  // for Fetching the user saved dishes
  async function fetchSavedDishes(userId) {
    try {
      let saved_dishes = await apiCall.get(`reciepe/saved/${userId}`)
      return saved_dishes.data
    } catch (err) {
      console.error(err)
    }
  }
  // for Fetching the user saved dishes
  async function fetchSavedDishesId(userId) {
    try {
      let saved_dishes = await apiCall.get(`reciepe/saved_ids/${userId}`)
      console.log(saved_dishes)
      return saved_dishes.data
    } catch (err) {
      console.error(err)
    }
  }
  async function toogleLikeReciepe(reciepeId,payload) {
    console.log(payload);
    try {
      let isLiked = await apiCall.put(`reciepe/${reciepeId}`,payload)
      return isLiked.data
    } catch (err) {
      console.error(err)
    }
  }
  return { fetchAccDetails, fetchSavedDishes, fetchSavedDishesId, toogleLikeReciepe }
})
