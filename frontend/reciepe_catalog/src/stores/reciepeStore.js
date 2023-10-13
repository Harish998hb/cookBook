import { defineStore } from 'pinia'
import { apiCall } from '../apiDetails/apiConfig'
import { shallowRef, triggerRef } from 'vue'

export const useReciepeStore = defineStore('reciepeStore', () => {
  const reciepes = shallowRef([])
  async function getReciepes(query = false) {
    try {
      const response = query
        ? await apiCall.get(`reciepe?key=${query}`)
        : await apiCall.get(`reciepe?key=`)
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
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  async function editReciepe(recipeId, payload, userId) {
    try {
      const response = await apiCall.put(`reciepe/edit/${recipeId}/${userId}`, payload)
      return response.status
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteReciepe(recipeId, userId) {
    try {
      const response = await apiCall.delete(`reciepe/delete/${recipeId}/${userId}`)
      return response.status
    } catch (err) {
      console.error(err)
    }
  }

  // Create Reciepe
  async function createDish(payload) {
    try {
      const response = await apiCall.post('reciepe/new', payload)
      return response.status
    } catch (err) {
      console.error(err)
    }
  }

  return { getReciepes, createDish, getReciepe, getDishChef, editReciepe, deleteReciepe }
})
