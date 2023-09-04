<template>
  <section class="register_page container">
    <section class="columns is-justify-content-center is-align-items-center color-tx-pri">
      <div class="column is-6 border radius-small p-6 bg-color-cl-sec">
        <h2 class="is-size-3">Create an Account</h2>
        <p class="is-size-6 mb-4">
          Create an account, enjoy the world of reciepes and add your reciepes .Show your talents
        </p>
        <label for="email"> Email</label>
        <input
          class="input is-medium is-rounded mb-4"
          id="email"
          type="text"
          placeholder="example@io.com"
          v-model="email"
        />
        <label for="username"> Username</label>
        <input
          class="input is-medium is-rounded mb-4"
          id="username"
          type="text"
          v-model="username"
          placeholder="@DavidBilley13"
        />
        <label for="password"> Password</label>
        <input
          class="input is-medium is-rounded mb-4"
          id="password"
          type="text"
          v-model="password"
          placeholder="******"
        />
        <label for="confirm_password"> Confirm Password</label>
        <input
          class="input is-medium is-rounded mb-4"
          id="confirm_password"
          type="text"
          v-model="confirmPassword"
          placeholder="******"
        />
        <label for="phone"> Phone Number</label>
        <input
          class="input is-medium is-rounded mb-4"
          id="phone"
          type="text"
          v-model="phn"
          placeholder="+910102030405"
        />
        <div class="is-flex is-justify-content-center is-align-items-center mt-6">
          <base-button class="create-btn"
            ><span class="is-size-6" @click="createUser()">Create</span></base-button
          >
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'

import BaseButton from '../components/baseComponents/baseButton.vue'
import { useLoginStore } from '../stores/loginStore'
import router from '../router/index'

const loginStore = useLoginStore()
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const phn = ref('')

function createUser() {
  if (
    email.value.trim() &&
    password.value.trim() &&
    confirmPassword.value.trim() &&
    username.value.trim() &&
    phn
  ) {
    if (password.value === confirmPassword.value) {
      const payload = {
        email: email.value,
        password: password.value,
        username: username.value,
        phn_no: phn.value
      }
      console.log(payload)
      loginStore
        .createUser(payload)
        .then(() => {
          console.log('created sucessfully')
          router.push({ name: 'login' })
        })
        .catch((err) => {
          console.log(err)
        })
    }else{
      alert("Password mismatched");
    }
  }else{
    alert("Please Enter the all fields")
  }
}
</script>

<style lang="scss" scoped>
.register_page section {
  height: 100vh;
}
</style>
