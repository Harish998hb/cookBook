<template>
  <div class="reciepe-card bg-color-white" style="cursor: pointer;">
      <div class="card-head">
        <figure class="">
          <img :src="props.reciepe.img" alt="Recipe Image" class="image  radius-default"/>
        </figure>
      </div>
      <div class="card-desc">
        <h3 class="is-size-3 color-tx-sec">{{ props.reciepe.dish_name }}</h3>
        <p class="is-size-5">{{ props.reciepe.description }}</p>
      </div>
      <div class="is-flex is-justify-content-right is- mt-3" >
        <p class="has-text-link	">View more</p>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reciepe: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.image{
  height: 20rem;

}
</style>
