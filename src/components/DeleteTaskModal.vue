<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <!-- Card -->
    <div
      class="bg-gradient-to-br from-red-500 to-red-700 text-white p-8 rounded-xl shadow-lg w-full max-w-sm"
    >
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrashIcon class="h-6 w-6 text-secondary" />
        Excluir Tarefa
      </h2>
      <p class="text-white text-sm mb-6">Tem certeza que deseja excluir esta tarefa?</p>
      <div class="flex gap-4">
        <!-- Botão Excluir -->
        <Button
          :icon="CheckIcon"
          variant="secondary"
          fullWidth
          @click.native="handleDelete"
        >
          Excluir
        </Button>

        <!-- Botão Cancelar -->
        <Button
          :icon="XMarkIcon"
          variant="primary"
          fullWidth
          @click.native="$emit('close')"
        >
          Cancelar
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/store.js";
import Button from "@/components/Button.vue"; // Importa o componente Button
import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/24/solid";
const emit = defineEmits(["close", "task-deleted"]);

// Recebe a tarefa como prop
const props = defineProps(["taskId"]);
const taskStore = useTaskStore();

const handleDelete = async () => {
  await taskStore.deleteTask(props.taskId);
  emit("task-deleted"); // Emite evento para atualizar a lista
  emit("close"); // Fecha o modal
};
</script>

<style scoped>
/* Estilização adicional opcional */
</style>
