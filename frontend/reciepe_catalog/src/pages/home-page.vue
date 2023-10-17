<template>
  <section class="home-page" style="min-height: 90vh">
    <div class="container py-5">
      <div class="search-container is-flex is-justify-content-center is-align-items-center">
        <div
          class="bg-color-white is-flex is-justify-content-center is-align-items-center p-4 radius-default"
        >
          <h3 class="is-size-4 mr-4"><label for="search-box">Search Recipes</label></h3>
          <input
            type="text"
            class="radius-default p-4 mr-4 is-size-5"
            name="search-box "
            id="search-box"
            placeholder="Search"
            v-model="searchTerm"
            @change="searchKey()"
          />
          <base-button class="submit-btn bg-color-cl-sec color-white"
            ><span class="is-size-6" @keydown.enter="searchKey()" @click="searchKey()"
              >Search</span
            ></base-button
          >
        </div>
      </div>
      <h1 class="is-size-3 mt-3">
        {{ 'Welcome ' + username + ',' }}
      </h1>
      <Suspense>
        <template #default>
          <div class="is-flex is-1 is-flex-wrap-wrap" v-if="reciepes">
            <ReciepeCard
              class="card radius-small mx-2 my-3 p-3"
              v-for="(reciepe, i) in reciepes"
              :reciepe="reciepe"
              :key="i"
              :savedDishesId="savedReciepesIds"
              @openReciepe="openFunc(reciepe)"
              @likeIndi="isLiked(reciepe)"
            >
            </ReciepeCard>
          </div>
        </template>
      </Suspense>
      <div class="pages is-flex is-justify-content-center">
        <div class="is-flex" style="list-style: none">
          <button
            class="page-button bg-color-tx-sec radius-small color-white px-4 py-3 mx-3"
            v-for="(pageNo, i) in pages"
            :key="i"
            @click="reqReciepes()"
          >
            {{ i + 1 }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLoginStore } from '../stores/loginStore'
import { useUserStore } from '../stores/userStore'
import { useReciepeStore } from '../stores/reciepeStore.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '../components/baseComponents/baseButton.vue'
import VueCookies from 'vue-cookies'
import ReciepeCard from '../components/reciepe-cards/reciepeCard.vue'

const reciepeStore = useReciepeStore(),
  userStore = useUserStore(),
  loginStore = useLoginStore(),
  router = useRouter()
const reciepes = ref([]),
  username = ref('User'),
  searchTerm = ref(''),
  reciepesLen = ref(),
  pages = ref(),
  savedReciepesIds = ref([])

onMounted(async () => {
  fetchData()
  let userId = VueCookies.get('id')
  if (userId) {
    let user = await userStore.fetchAccDetails(VueCookies.get('id'))
    username.value = user.username
  }
  savedReciepesIds.value = await userStore.fetchSavedDishesId(userId)
  console.log(savedReciepesIds.value)
  // let like=likeNotify();
})

function reqReciepes() {
  
}

async function searchKey() {
  let { totalReciepes, totalReciepesLen } = await reciepeStore.getReciepes(searchTerm.value)
  reciepes.value = totalReciepes
  reciepesLen.value = totalReciepesLen
  // pages.value=Array.from(Array(Math.ceil(reciepesLen.value / 6)))
  // console.log(reciepesLen.value)
}
async function isLiked(userId) {
  console.log('parent')
  savedReciepesIds.value = await userStore.fetchSavedDishesId(userId)
}
async function fetchData() {
  let { totalReciepes, totalReciepesLen } = await reciepeStore.getReciepes()
  reciepes.value = totalReciepes
  reciepesLen.value = totalReciepesLen
  console.log(reciepesLen.value)
  pages.value = Array.from(Array(Math.ceil(reciepesLen.value / 6)))
}
console.log(loginStore.isAuth())

function openFunc(reciepe) {
  router.push({ path: `/reciepe/${reciepe._id}` })
}
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
