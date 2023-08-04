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
              <RouterLink class="nav-links" to="/login">Login</RouterLink>
            </li>
            <li class="nav-items py-4">
              <RouterLink class="nav-links" to="/register">Sign Up</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
<style scoped lang="scss">
.navigation{
    background-color: var(--primary-clr);
}
.nav-links{
    padding-right: 2rem;
    color: var(--secondary-clr);
}

// .nav-links:not(.nav-links:last-child){
//     padding-right: 2rem;
// }
</style>