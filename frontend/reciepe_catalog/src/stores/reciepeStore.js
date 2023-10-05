import { defineStore } from 'pinia'
import { apiCall } from '../apiDetails/apiConfig'
import { shallowRef, triggerRef } from 'vue'

export const useReciepeStore = defineStore('reciepeStore', () => {
  const reciepes = shallowRef([])
  async function getReciepes() {
    try {
      const response = await apiCall.get('reciepe/')
      reciepes.value = response.data
      triggerRef(reciepes)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }
  async function getReciepe(param) {
    try {
      const response = await apiCall.get(`reciepe/${param}`)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  async function getDishChef(recipeId) {
    try {
      const response = await apiCall.get(`reciepe/${recipeId}/chef`)
      console.log(response.data)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  async function editReciepe(recipeId, payload, userId) {
    try {
      const response = await apiCall.put(`reciepe/edit/${recipeId}/${userId}`, payload)
      console.log(response)
      return response.status
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteReciepe(recipeId, userId) {
    try {
      const response = await apiCall.delete(`reciepe/delete/${recipeId}/${userId}`)
      console.log(response)
      return response.status
    } catch (err) {
      console.error(err)
    }
  }
  // async function getReciepes() {
  //   const data = apiCall
  //     .get('reciepe/')
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  //   if (data) {
  //     reciepes.value = data
  //     // triggerRef(reciepes)
  //     return await data
  //   }
  // }

  // Create Reciepe
  async function createDish(payload) {
    try {
      const response = await apiCall.post('reciepe/new', payload)
      return response.status;
    } catch (err) {
      console.error(err)
    }
  }

  return { getReciepes, createDish, getReciepe, getDishChef, editReciepe, deleteReciepe }
})
