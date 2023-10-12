<template>
  <section
    class="saved-reciepe-card columns is-align-items-center radius-default border default p-3 my-3"
    style="cursor: pointer"
  >
    <div class="column is-2">
      <figure class="reciepe-image">
        <img :src="reciepe.img" alt="Reciepe Image" />
      </figure>
    </div>
    <div class="reciepe desc column is-8">
      <h3 class="is-size-3 my-2">{{ reciepe.dish_name }}</h3>
      <p class="mb-2">{{ reciepe.description }}</p>
    </div>
    <div class="cooking-time column is-2">
      <h4 class="is-size-4 my-2">Ready In</h4>
      <p class="mb-2">{{ reciepe.cooking_time + ' mins' }}</p>
    </div>
  </section>
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
.saved-reciepe-card {
  .reciepe-image {
    width: 10rem;
  }
  h3,
  h4 {
    color: var(--secondary-clr);
  }
  &:hover {
    transition: all 0.6s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #cccccc;
    background-color: var(--secondary-clr);
    color: white;
    h3,
    h4 {
      color: white;
    }
  }
}
</style>
