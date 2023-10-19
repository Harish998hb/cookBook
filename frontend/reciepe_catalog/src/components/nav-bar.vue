<template>
  <nav class="navigation mb-5 py-3">
    <section class="container">
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <div class="logo">
          <h1 class="title">Ramsey Gorden</h1>
        </div>
        <div class="is-flex-grow-1"></div>
        <div class="menu">
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
        <div class="menu-bar is-relative mr-4" @click="isMenuClicked = !isMenuClicked">
          <Icon icon="fe:bar" style="width: 3rem; height: 2rem; color: var(--secondary-clr)" />
          <div
            v-if="isMenuClicked"
            class="mobile-menu is-absolute bg-color-white radius-small px-4 py-2"
          >
            <ul>
              <li class="nav-items mobile py-4 ">
                <RouterLink class="nav-links" to="/">Home</RouterLink>
              </li>
              <li class="nav-items mobile py-4 ">
                <RouterLink class="nav-links" v-if="token" to="/create_reciepe"
                  >Create Reciepe</RouterLink
                >
              </li>
              <li class="nav-items mobile py-4 ">
                <RouterLink class="nav-links" v-if="token" to="/saved_reciepe"
                  >Save Reciepe</RouterLink
                >
              </li>
              <li class="nav-items mobile py-4 ">
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
              <li v-if="!token" class="nav-items mobile py-4 ">
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
const isMenuClicked = ref(false)
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
.nav-items{
  &.mobile{
    border-bottom: 2px solid rgb(125, 121, 121);
  }
}
.menu-bar {
  @include mobile {
    display: block;
  }
  @include tablet {
    display: block;
  }
  @include desktop {
    display: none;
  }
}
.menu {
  @include mobile {
    display: none;
  }
  @include tablet {
    display: none;
  }
  @include desktop {
    display: block;
  }
}
.title {
  @include mobile {
    font-size: 1.5rem;
  }
}
.mobile-menu {
  width: 10rem;
  top: 3rem;
  right: 1rem;
  z-index: 100;
}
</style>
