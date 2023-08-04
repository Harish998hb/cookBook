<template>
  <section class="login is-flex is-justify-content-center is-align-items-center">
    <div class="login-form border radius-small p-6">
      <h3 class="is-size-4 ">Login to your account</h3>
      <div class="mt-6">
        <label for="email" class="is-size-5">Email</label>
        <input class="input is-rounded " placeholder="Email" type="text" name="email" id="email">
      </div>
      <div class="my-3 ">
        <label for="password" class="is-size-5">Password</label>
        <input class="input is-rounded " placeholder="******" type="text" name="password" id="password">
      </div>
      <base-button></base-button>
    </div>
  </section>
</template>

<script setup>
import BaseButton from '../components/baseComponents/baseButton.vue';
</script>

<style lang="scss" scoped>
.login {
  height: 91vh;
  // width:100vw ;
}
.login-form {
  background-color: var(--secondary-clr);

  h3 ,label {
    color: var(--primary-clr);
  }
  label{
    text-indent: 1rem;
  }

}
</style>
