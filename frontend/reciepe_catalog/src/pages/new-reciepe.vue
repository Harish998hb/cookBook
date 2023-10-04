<template>
  <section class="container new-reciepe">
    <h3 class="is-size-2 mt-6 color-tx-sec has-text-weight-semibold">Create Your Own Reciepe</h3>
    <p class="my-4 is-size-5">
      There is no stop for you to be a chef. Fuse yor cooking skills and your creativity to become a
      aspiring chef .Feel free to share your reciepe below.
    </p>
    <div class="is-flex is-justify-content-center" style="height: 80vh">
      <form action="" style="width: 60%" @submit.prevent="">
        <div class="mt-4">
          <label for="reciepe-name" class="is-size-5">Reciepe Name</label>
          <input
            class="input is-rounded"
            placeholder="Reciepe Name"
            type="text"
            name="reciepe-name"
            id="reciepe-name"
            v-model="reciepeName"
          />
        </div>
        <div class="mt-4">
          <label for="description" class="is-size-5">Description</label>
          <input
            class="input is-rounded"
            placeholder="Description"
            type="text"
            name="description"
            id="description"
            v-model="description"
          />
        </div>
        <div class="mt-4">
          <label for="cooking-time" class="is-size-5">Cooking Time </label>
          <input
            class="input is-rounded"
            placeholder="Cooking Time"
            type="text"
            name="cooking-time"
            id="cooking-time"
            v-model="cookingTime"
          />
          <span> In mins</span>
        </div>
        <div class="mt-4">
          <label for="instructions" class="is-size-5">Instructions</label>
          <textarea
            class="input is-rounded"
            placeholder="Instruction"
            type="text"
            name="instructions"
            id="instructions"
            v-model="instructions"
          ></textarea>
        </div>
        <div class="mt-4 is-flex is-justify-content-space-between is-align-items-end">
          <div style="width: 100%">
            <label for="ingredient" class="is-size-5">Ingredients</label>
            <input
              class="input is-rounded"
              placeholder="Ingredient"
              type="text"
              name="ingredient"
              id="ingredient"
              v-model="ingredient"
            />
          </div>
          <div>
            <button
              class="is-flex mx-4 px-4 py-3 radius-default bg-color-tx-sec"
              style="cursor: pointer"
              @click="addIngridents()"
            >
              <i class="pi pi-plus mr-3 color-white"></i>
              <span class="is-size-6 color-white">Add </span>
            </button>
          </div>
        </div>
        <div class="mt-4" v-if="ingredients.length > 0">
          <p class="py-3 is-flex">
            <span
              class="border secondary radius-default color-white bg-color-tx-sec py-2 px-3 mr-2"
              v-for="(ingredient, i) in ingredients"
              :key="i"
            >
              {{ ingredient }}
              <i
                class="pi pi-times color-white ml-2"
                style="cursor: pointer"
                @click="removeIngrident(i)"
              ></i>
            </span>
          </p>
        </div>
        <div class="mt-4">
          <label for="image" class="is-size-5">Image</label>
          <input
            class="input is-rounded"
            placeholder="Image"
            type="text"
            name="image"
            id="image"
            v-model="img"
          />
        </div>
        <div class="is-flex is-justify-content-center">
          <button
            class="radius-default bg-color-tx-sec color-white is-size-5 my-4 px-4 py-4"
            @click="createRecipe()"
          >
            Create Reciepe
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute} from 'vue-router'

import VueCookies from 'vue-cookies'
import { useReciepeStore } from '../stores/reciepeStore'

const route = useRoute();
const reciepeName = ref(''),
  exisitReciepe=ref(route.params.reciepe),
  instructions = ref(''),
  cookingTime = ref(''),
  description = ref(''),
  img = ref(''),
  ingredient = ref(''),
  ingredients = ref([]),
  reciepeStore = useReciepeStore()

const userId = VueCookies.get('id')|| null;
// const userId = VueCookies.get('id')

function addIngridents() {
  if (ingredient.value) {
    ingredients.value.push(ingredient.value)
    ingredient.value = ''
  }
}
// onBeforeRouteEnter


function removeIngrident(index) {
  ingredients.value.splice(index, 1)
}

async function createRecipe() {
  if(userId){
    let payload = {
      dish_name: reciepeName.value,
      img: img.value,
      ingredients: ingredients.value,
      instructions: instructions.value,
      description: description.value,
      cooking_time: cookingTime.value,
      chef_id: userId
    }
    let newReciepe= await reciepeStore.createDish(payload);
    console.log(newReciepe);
  }else {
    console.log("no userId ");
  }
}
console.log(route.meta)
</script>
