<template>
  <section class="home-page">
    <div class="container py-5">
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
              @openReciepe="openFunc(reciepe)"
              @likeIndi="isLiked(reciepe)"
            >
            </ReciepeCard>
          </div>
        </template>
      </Suspense>
    </div>
  </section>
</template>

<script setup>
import { useLoginStore } from '../stores/loginStore'
import { useUserStore } from '../stores/userStore'
import { useReciepeStore } from '../stores/reciepeStore.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import VueCookies from 'vue-cookies'
import ReciepeCard from '../components/reciepe-cards/reciepeCard.vue'

const reciepeStore = useReciepeStore(),
  userStore = useUserStore(),
  loginStore = useLoginStore(),
  router = useRouter()
const reciepes = ref([]),
  username = ref('User'),
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

function isLiked(reciepe) {
  console.log(savedReciepesIds.value.includes(reciepe._id))
  return savedReciepesIds.value.includes(reciepe._id)
}
async function fetchData() {
  reciepes.value = await reciepeStore.getReciepes()
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
