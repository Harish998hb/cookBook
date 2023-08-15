<template>
  <button
    :disabled="disabled"
    class="button-style is-relative"
    type="button"
  >
    <span v-if="$slots.icon" class="">
      <slot name="icon"></slot>
    </span>
    <slot name="default"></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false
  }
})
</script>
 