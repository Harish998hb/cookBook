<template>
  <section class="container mt-6" style="min-height: 85vh">
    <h2 class="is-size-3 my-3 has-text-weight-bold color-tx-sec">Saved Reciepes</h2>
    <ReciepeCard
      v-for="(reciepe, i) in saved_reciepes"
      :key="i"
      class="receiepe-card"
      :reciepe="reciepe"
      @click="$router.push({ path: `/reciepe/${reciepe._id}` })"
    ></ReciepeCard>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/userStore'

import ReciepeCard from './saved-reciepe-card.vue'
import VueCookies from 'vue-cookies'

const saved_reciepes = ref([]),
  userStore = useUserStore(),
  userId = ref(VueCookies.get('id') || '')

onMounted(async () => {
  saved_reciepes.value = await userStore.fetchSavedDishes(userId.value)
  // console.log(saved_reciepes.value)
})
</script>

<style lang="scss" scoped>
@import '../assets/css/mixins.scss';

.receiepe-card{
  @include mobile{
    margin: 0 1rem;
  }
}
</style>
