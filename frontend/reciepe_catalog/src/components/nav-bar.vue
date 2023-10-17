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
              <RouterLink class="nav-links" v-if="token" to="/saved_reciepe"
                >Save Reciepe</RouterLink
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
        <div class="menu-bar column is-2 is-relative">
          <Icon icon="fe:bar" style="width: 3rem; height: 2rem; color: var(--secondary-clr)" />
          <div class="mobile-menu is-absolute bg-color-white radius-small px-4 py-2">
            <ul>
              <li class="nav-items py-4">
              <RouterLink class="nav-links" to="/">Home</RouterLink>
            </li>
            <li class="nav-items py-4">
              <RouterLink class="nav-links" v-if="token" to="/create_reciepe"
                >Create Reciepe</RouterLink
              >
            </li>
            <li class="nav-items py-4">
              <RouterLink class="nav-links" v-if="token" to="/saved_reciepe"
                >Save Reciepe</RouterLink
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
      </div>
    </section>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

import VueCookies from 'vue-cookies'

const token = ref(VueCookies.get('token') || null)

watch(
  () => token.value,
  () => location.reload()
)
</script>
<style scoped lang="scss">
@import '../assets/css/mixins.scss';
.navigation {
  background-color: var(--primary-clr);
}
.nav-links {
  padding-right: 2rem;
  color: var(--secondary-clr);
}
.menu-bar{
  @include mobile{
    display: block;
  }
  @include tablet{
    display: block;
  }
  @include desktop{
    display: none;
  }
}
.menu{
  @include mobile{
    display: none;
  }
  @include tablet{
    display: none;
  }
  @include desktop{
    display:block;
  }
}
.mobile-menu{
  width: 10rem;
  top: 3rem;
  right: 5rem;
  z-index: 100;
}
</style>
