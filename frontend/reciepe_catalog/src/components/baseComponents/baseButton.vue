<template>
  <button
    :disabled="props.disabled"
    class="button-style is-relative"
    type="button"
    :class="disabled?'disabled':null"
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
<style>
.disabled{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
 