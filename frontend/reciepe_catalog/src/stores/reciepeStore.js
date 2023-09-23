import { defineStore } from 'pinia'
import { apiCall } from '../apiDetails/apiConfig'
import { shallowRef, triggerRef } from 'vue'

export const useReciepeStore = defineStore('reciepeStore', () => {
  const reciepes = shallowRef([])
  async function getReciepes() {
    try {
      const response = await apiCall.get('reciepe/')
      reciepes.value = response.data;
      triggerRef(reciepes);
      return response.data;
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
  return { getReciepes }
})
