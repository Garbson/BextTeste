<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      baseClasses,
      variantClasses[variant],
      { 'opacity-50 cursor-not-allowed bg-gray-400': disabled }
    ]"
    @click="$emit('click')"
  >
    <!-- Ícone -->
    <component :is="icon" v-if="icon" class="h-5 w-5" />
    <!-- Texto do botão -->
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary", // primary, secondary, danger, etc.
  },
  icon: {
    type: [String, Object],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const baseClasses =
  "flex items-center justify-center gap-2 font-bold px-4 py-2 rounded-xl transition duration-300 focus:outline-none";

const variantClasses = {
  primary: "bg-primary text-white hover:bg-blue-800",
  secondary: "bg-white text-primary hover:bg-gray-200",
  danger: "bg-red-500 text-white hover:bg-red-600",
};
</script>

<style scoped>
/* Adiciona um estado cinza para botões desabilitados */
button:disabled {
  pointer-events: none;
}
</style>
