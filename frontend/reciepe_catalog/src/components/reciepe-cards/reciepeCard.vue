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
      <div v-if="userId">
        <Icon
          icon="ph:heart-bold"
          v-if="!isLiked"
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
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '../../stores/userStore'

import VueCookies from 'vue-cookies'

const props = defineProps({
  reciepe: {
    type: Object,
    required: true
  },
  savedDishesId: {
    type: Array,
    required: true,
    default: () => []
  }
})

const isLiked = ref(false)
onMounted(() => {
  updateLikeStats()
})

watch(
  () => props.savedDishesId,
  () => {
    updateLikeStats()
  }
)
// const isLiked = computed(() => {
//   if (props.savedDishesId != null || props.savedDishesId != undefined)
//     return !props.savedDishesId.includes(props.reciepe._id)
//   else return false
// })
const userStore = useUserStore(),
  userId = ref(VueCookies.get('id') || null)
const emits = defineEmits(['openReciepe', 'likeIndi'])

// Function for resizing the description
function resizeText(text) {
  return text.slice(0, 120)
}

async function toogleLike() {
  let likeStats = await userStore.toogleLikeReciepe(props.reciepe._id, { userId: userId.value })
  // console.log(likeStats, props.savedDishesId)
  isLiked.value = likeStats
}

function updateLikeStats() {
  isLiked.value = props.savedDishesId.includes(props.reciepe._id)
  // console.log(isLiked.value)
}
</script>

<style scoped lang="scss">
.image {
  height: 20rem;
}
</style>
