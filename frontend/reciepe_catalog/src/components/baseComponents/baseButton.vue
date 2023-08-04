<template>
    <button class="button-common">
        <span v-if="$slots.icon" class="">
            <slot name="icon"></slot>
        </span>
        <slot name="default"></slot>
    </button>
</template>

<script setup></script>