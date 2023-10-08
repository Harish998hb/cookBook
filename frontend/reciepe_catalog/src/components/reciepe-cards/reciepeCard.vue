<template>
  <div class="reciepe-card bg-color-white" style="cursor: pointer">
    <div class="card-head" @click="emits('openReciepe')">
      <figure class="">
        <img :src="props.reciepe.img" alt="Recipe Image" class="image radius-default" />
      </figure>
    </div>
    <div class="card-desc" @click="emits('openReciepe')">
      <h3 class="is-size-3 color-tx-sec">{{ props.reciepe.dish_name }}</h3>
      <p class="is-size-5">{{ resizeText(props.reciepe.description) + '...' }}</p>
    </div>
    <div class="is-flex is-justify-content-space-between is-align-items-center is- mt-3">
      <p class="has-text-link" @click="emits('openReciepe')">View more</p>
      <Icon
        icon="ph:heart-bold"
        v-if="!emits('likeIndi')"
        style="height: 2rem; width: 2rem"
        @click="toogleLike()"
      ></Icon>
      <Icon
        icon="mdi:heart"
        color="red"
        v-else
        style="height: 2rem; width: 2rem"
        @click="toogleLike()"
      ></Icon>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../stores/userStore'

import VueCookies from 'vue-cookies'

const isLiked = ref(false),
  savedDishes = ref([]),
  userId = ref(),
  userStore = useUserStore()
const emits = defineEmits(['openReciepe','likeIndi'])
const props = defineProps({
  reciepe: {
    type: Object,
    required: true
  }
})

// Function for resizing the description
function resizeText(text) {
  return text.slice(0, 120)
}

// onMounted(async() => {
//   userId.value = VueCookies.get('id')
//   if(userId.value!=null){
//     savedDishes.value = await userStore.fetchSavedDishes(userId.value)
//     console.log(savedDishes.value);
//   }
// })
async function toogleLike() {
  savedDishes.value = await userStore.fetchSavedDishes(userId.value)
}
</script>

<style scoped lang="scss">
.image {
  height: 20rem;
}
</style>
