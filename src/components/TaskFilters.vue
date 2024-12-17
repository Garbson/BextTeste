<template>
  <div class="flex flex-wrap items-center gap-4">
    <!-- Filtro Categoria -->
    <div class="relative w-full sm:max-w-xs md:w-auto">
      <select
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', $event.target.value)"
        class="appearance-none w-full border-2 border-gray-300 rounded-xl px-6 py-2 pr-10 pl-10 focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow transition duration-300"
      >
        <option value="">Todas as Categorias</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <TagIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
      <ChevronDownIcon
        class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary"
      />
    </div>

    <!-- Filtro Prioridade -->
    <div class="relative w-full sm:max-w-xs md:w-auto">
      <select
        :value="selectedPriority"
        @change="$emit('update:selectedPriority', $event.target.value)"
        class="appearance-none w-full border-2 border-gray-300 rounded-xl px-6 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow transition duration-300"
      >
        <option value="">Todas as Prioridades</option>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>
      <AdjustmentsHorizontalIcon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary"
      />
      <ChevronDownIcon
        class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary"
      />
    </div>
  </div>
</template>

<script setup>
import { TagIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";

defineProps({
  selectedCategory: String,
  selectedPriority: String,
  categories: Array,
});

defineEmits(["update:selectedCategory", "update:selectedPriority"]);
</script>
