<template>
  <nav class="navigation mb-5">
    <section class="container">
      <div class="columns is-justify-content-space-between is-align-items-center">
        <div class="logo column is-3">
          <h1 class="is-size-2">Ramsey Gorden</h1>
        </div>
        <div class="menu column is-9">
          <ul class="is-flex is-justify-content-end">
            <li class="nav-items py-4">
              <RouterLink class="nav-links" to="/">Home</RouterLink>
            </li>
            <li class="nav-items py-4">
              <RouterLink class="nav-links" v-if="token" to="/create_reciepe"
                >Create Reciepe</RouterLink
              >
            </li>
            <li class="nav-items py-4">
              <RouterLink v-if="!token" class="nav-links" to="/login">Login</RouterLink>
              <p
                class="nav-links"
                style="cursor: pointer"
                v-else
                @click="
                  () => {
                    $cookies.remove('token')
                    $cookies.remove('id')
                    $router.push({ name: 'home' })
                  }
                "
              >
                Log Out
              </p>
            </li>
            <li class="nav-items py-4">
              <RouterLink v-if="!token" class="nav-links" to="/register">Sign Up</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, watch } from 'vue'

import VueCookies from 'vue-cookies'

const token = ref(VueCookies.get('token') || null)

watch(
  () => token.value,
  () => location.reload()
)
</script>
<style scoped lang="scss">
.navigation {
  background-color: var(--primary-clr);
}
.nav-links {
  padding-right: 2rem;
  color: var(--secondary-clr);
}
</style>