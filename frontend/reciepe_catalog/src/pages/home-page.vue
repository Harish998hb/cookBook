<template>
  Hola
  <section class="home-page">
    <div class="container py-5">
      <div class="columns">
        <Suspense>
          <template #default>
            <ReciepeCard
              class="column m-2 is-4"
              v-for="(reciepe, i) in reciepes"
              :reciepe="reciepe"
              :key="i"
            >
            </ReciepeCard>
          </template>
          <template #fallback>
            <span>Loading.....</span>
          </template>
        </Suspense>
      </div>
    </div>
  </section>
</template>

<script setup>
// import { computed, ref } from 'vue'
// import { storeToRefs } from "pinia";
import { useReciepeStore } from '../stores/reciepeStore.js'
import { onMounted, ref } from "vue";
import ReciepeCard from '../components/reciepe-cards/reciepeCard.vue';
// import { defineAsyncComponent } from 'vue'

const reciepeStore = useReciepeStore();
const reciepes=ref([]);
// const {reciepes}=storeToRefs(reciepeStore);

onMounted(async()=>{
  fetchData();
})

async function fetchData() {
  reciepes.value = await reciepeStore.getReciepes();
}

// console.log(reciepes);
// const reciepes=computed(()=>{
//   return reciepeStore.getReciepes();
// })
// const reciepes = await reciepeStore.getReciepes()
console.log(reciepes.value)
// const ReciepeCard = defineAsyncComponent(() => {
//   import('../components/reciepe-cards/reciepeCard.vue')
// })
</script>

<style lang="scss" scoped></style>
