<template>
  <section class="home-page">
    <div class="container py-5">
      <Suspense>
        <template #default>
          <div class="is-flex is-1 is-flex-wrap-wrap" v-if="reciepes">
            <ReciepeCard
              class="card radius-small mx-2 my-3 p-3"
              v-for="(reciepe, i) in reciepes"
              :reciepe="reciepe"
              :key="i"
              @click="$router.push({ path: `/reciepe/${reciepe._id}` })"
            >
            </ReciepeCard>
          </div>
        </template>
      </Suspense>
    </div>
  </section>
</template>

<script setup>
// import { computed, ref } from 'vue'
// import { storeToRefs } from "pinia";
import { useLoginStore } from '../stores/loginStore'
import { useReciepeStore } from '../stores/reciepeStore.js'
import { onMounted, ref } from 'vue'
import ReciepeCard from '../components/reciepe-cards/reciepeCard.vue'
// import { defineAsyncComponent } from 'vue'

const reciepeStore = useReciepeStore(),
  loginStore = useLoginStore()
const reciepes = ref([])
// const {reciepes}=storeToRefs(reciepeStore);

onMounted(async () => {
  fetchData()
})

async function fetchData() {
  reciepes.value = await reciepeStore.getReciepes()
}
console.log(loginStore.isAuth())
</script>

<style lang="scss" scoped>
@import '../assets/css/mixins.scss';

.card {
  @include mobile {
    width: 90%;
  }
  @include tablet {
    width: 45%;
  }
  @include desktop {
    width: 32%;
  }
}
</style>
