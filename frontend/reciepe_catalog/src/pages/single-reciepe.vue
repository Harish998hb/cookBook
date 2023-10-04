<template>
  <section class="container">
    <div v-if="reciepe" class="bg-color-white my-6 py-4 px-5 radius-small" style="min-height: 90vh">
      <div class="is-flex is-justify-content-space-between">
        <base-button class="submit-btn"
          ><span class="is-size-6" @click="$router.back()">Back</span></base-button
        >
        <div v-if="reciepe.chef == userId">
          <base-button class="submit-btn mr-4"
            ><span class="is-size-6" @click="editReciepe()" :disabled="!reciepe.chef == userId"
              >Edit</span
            ></base-button
          >
          <base-button class="submit-btn"
            ><span class="is-size-6" @click="deleteReciepe()" :disabled="!reciepe.chef == userId"
              >Delete</span
            ></base-button
          >
        </div>
      </div>
      <h1 class="is-size-3 has-text-weight-bold color-tx-sec">{{ reciepe.dish_name }}</h1>
      <p class="is-size-5 mb-5">{{ reciepe.description }}</p>
      <figure class="is-flex is-justify-content-center mb-5">
        <img :src="reciepe.img" alt="Reciepe Image" />
      </figure>
      <h3 class="is-size-4 color-tx-sec has-text-weight-bold">Ingridents:</h3>
      <ul class="m-5">
        <li
          class="is-size-4 is-capitalized"
          style="list-style-type: square"
          v-for="(items, i) in reciepe.ingredients"
          :key="i"
        >
          {{ items }}
        </li>
      </ul>
      <h3 class="is-size-4 color-tx-sec has-text-weight-bold">
        Cooking Time:
        <span class="is-size-5 has-text-weight-normal" style="color: black">
          {{ reciepe.cooking_time + ' mins' }}</span
        >
      </h3>
      <h3 class="is-size-4 color-tx-sec has-text-weight-bold">Instructions :</h3>
      <p class="is-size-5" style="text-indent: 3rem">{{ reciepe.instructions }}</p>
      <h3 class="is-size-4 color-tx-sec has-text-weight-bold">
        Reciepe Creator :
        <span class="is-size-5 has-text-weight-normal" style="color: black">
          {{ chef_name }}
        </span>
      </h3>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useReciepeStore } from '../stores/reciepeStore.js'

import BaseButton from '../components/baseComponents/baseButton.vue'
import VueCookies from 'vue-cookies'
// import router from '../router'

const router = useRouter(),
  route = useRoute(),
  reciepeStore = useReciepeStore()
const reciepe = ref({})
const id = route.params.id,
  chef_name = ref(''),
  userId = VueCookies.get('id')
// instructions=computed(()=>{
//     return reciepe.value.instructions.split('.');
// })
onMounted(async () => {
  reciepe.value = await reciepeStore.getReciepe(id)
  chef_name.value = await fetchChefName()
  console.log(reciepe.value.chef)
  console.log(userId)
  console.log(reciepe.value.chef == userId)
})
async function fetchChefName() {
  return await reciepeStore.getDishChef(id)
}
console.log(VueCookies.get('userId'))

function editReciepe() {
  console.log('in the edit')
  router.push({ name: 'create_reciepe', state:  reciepe.value  })
}
function deleteReciepe() {}
</script>

<style lang="scss" scoped>
.submit-btn {
  cursor: pointer;
}
</style>
