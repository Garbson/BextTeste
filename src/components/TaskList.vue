<template>
  <div
    v-if="tasks.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5"
  >
    <div
      v-for="task in tasks"
      :key="task.id"
      class="bg-primary text-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
    >
      <h2 class="text-lg font-bold">{{ task.title }}</h2>
      <p class="text-sm">{{ task.description }}</p>
      <p class="text-sm">Categoria: {{ task.category }}</p>
      <p class="text-sm">Prioridade: {{ task.priority }}</p>
      <p class="text-sm">Data de Conclusão: {{ task.dueDate }}</p>

      <!-- Botões -->
      <div class="flex gap-2 mt-4">
        <Button
          variant="secondary"
          :icon="PencilIcon"
          @click="$emit('edit-task', task)"
        >
          Editar
        </Button>
        <Button
          variant="danger"
          :icon="TrashIcon"
          @click="$emit('delete-task', task.id)"
        >
          Excluir
        </Button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-gray-600">Nenhuma tarefa encontrada.</p>
  </div>
</template>

<script setup>
import Button from "@/components/button.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

defineEmits(["edit-task", "delete-task"]);
</script>
