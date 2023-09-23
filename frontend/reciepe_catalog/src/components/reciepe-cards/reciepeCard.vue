<template>
  <div class="reciepe-card">
      <div class="card-head">
        <img :src="props.reciepe.img" alt="Recipe Image" />
      </div>
      <div class="card-desc">
        <h3 class="is-size-4">{{ props.reciepe.dish_name }}</h3>
        <p class="is-size-5">{{ props.reciepe.description }}</p>
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

<style scoped lang="scss"></style>
