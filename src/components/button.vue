<template>
  <button
    :type="type"
    :class="computedClasses"
    @click="$emit('click')"
  >
    <!-- Ícone opcional -->
    <span v-if="icon">
      <slot name="icon">
        <component :is="icon" class="h-5 w-5" />
      </slot>
    </span>
    <!-- Texto do botão -->
    <span><slot></slot></span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary", 
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: [String, Object],
    default: null, // Componente do ícone
  },
});

const computedClasses = computed(() => {
  const baseClasses =
    "flex items-center justify-center gap-2 font-bold px-4 py-2 transition duration-300 focus:outline-none";
  const roundedClass = props.rounded ? "rounded-xl" : "rounded";
  const fullWidthClass = props.fullWidth ? "w-full" : "";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-blue-800",
    secondary: "bg-white text-primary hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    gray: "bg-gray-400 text-white hover:bg-gray-500",
  };

  return `${baseClasses} ${roundedClass} ${fullWidthClass} ${
    variantClasses[props.variant] || ""
  }`;
});
</script>
