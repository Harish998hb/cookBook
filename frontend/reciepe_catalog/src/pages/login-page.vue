<template>
  <section class="login is-flex is-justify-content-center is-align-items-center">
    <div class="login-form border radius-small p-6">
      <h3 class="is-size-4">Login to your account</h3>
      <div class="mt-6">
        <label for="email" class="is-size-5">Email</label>
        <input
          class="input is-rounded"
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          v-model="email"
        />
      </div>
      <div class="my-3">
        <label for="password" class="is-size-5">Password</label>
        <input
          class="input is-rounded"
          placeholder="******"
          type="text"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <div class="is-flex is-justify-content-center is-align-items-center mt-6">
        <base-button class="submit-btn"><span class="is-size-6" @click="checkUser()">Submit</span></base-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import BaseButton from '../components/baseComponents/baseButton.vue'
// import { apiCall } from '../apiDetails/apiConfig';

// import {useLoginStore} from "../stores/loginStore";

const email = ref('')
const password = ref('')
// const loginStore=useLoginStore();
// console.log(email.value, password.value);
 async function checkUser(){
   console.log("in check User func",email,password);
  //  const payload={
  //    email:email.value,
  //    password:password.value,
  //   }
  //   await loginStore.validateUser(payload)
    await axios.post("http://localhost:3007/auth/login",{email:email.value,password:password.value}).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.error(err);
    })

}
</script>

<style lang="scss" scoped>
.login {
  height: 91vh;
  // width:100vw ;
}
.login-form {
  background-color: var(--secondary-clr);

  h3,
  label {
    color: var(--primary-clr);
  }
  label {
    text-indent: 1rem;
  }
  .submit-btn{
    cursor: pointer;
  }
}
</style>
