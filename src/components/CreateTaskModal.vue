<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <!-- Card -->
    <div
      class="bg-gradient-to-br from-primary to-blue-600 text-white p-8 md:w-full w-[90%] rounded-xl shadow-lg max-w-lg"
    >
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlusIcon class="h-6 w-6 text-secondary" />
        Nova Tarefa
      </h2>

      <!-- Formulário -->
      <form @submit.prevent="handleCreateTask">
        <!-- Campo Título -->
        <div class="mb-4 relative">
          <label for="title" class="block text-sm font-semibold">Título *</label>
          <input
            type="text"
            id="title"
            v-model="task.title"
            placeholder="Digite o título"
            class="w-full px-4 py-2 rounded-xl border-0 text-black focus:outline-none focus:ring-2 focus:ring-blue-300 pl-10"
            required
          />
          <ClipboardDocumentListIcon
            class="absolute left-3 top-10 transform -translate-y-1/2 h-6 w-6 text-primary"
          />
        </div>

        <!-- Campo Descrição -->
        <div class="mb-4 relative">
          <label for="description" class="block text-sm font-semibold">Descrição</label>
          <textarea
            id="description"
            v-model="task.description"
            placeholder="Digite a descrição"
            class="w-full px-4 py-2 rounded-xl border-0 text-black focus:outline-none focus:ring-2 focus:ring-blue-300 pl-10"
          ></textarea>
          <DocumentTextIcon
            class="absolute left-3 top-10 transform -translate-y-1/2 h-6 w-6 text-primary"
          />
        </div>

        <!-- Campo Categoria -->
        <div class="mb-4 relative">
          <label for="category" class="block text-sm font-semibold">Categoria *</label>
          <input
            type="text"
            id="category"
            v-model="task.category"
            placeholder="Digite a categoria"
            class="w-full px-4 py-2 rounded-xl border-0 text-black focus:outline-none focus:ring-2 focus:ring-blue-300 pl-10"
            required
          />
          <TagIcon
            class="absolute left-3 top-10 transform -translate-y-1/2 h-6 w-6 text-primary"
          />
        </div>

        <!-- Campo Prioridade -->
        <div class="mb-4 relative">
          <label for="priority" class="block text-sm font-semibold">Prioridade *</label>
          <select
            id="priority"
            v-model="task.priority"
            class="w-full px-4 py-2 rounded-xl text-black border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 pl-10"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <AdjustmentsHorizontalIcon
            class="absolute left-3 top-10 transform -translate-y-1/2 h-6 w-6 text-primary"
          />
        </div>

        <!-- Campo Data -->
        <div class="mb-4 relative">
          <label for="dueDate" class="block text-sm font-semibold">Data de Conclusão *</label>
          <input
            type="date"
            id="dueDate"
            v-model="task.dueDate"
            class="w-full px-4 py-2 rounded-xl text-black border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 pl-10"
            required
          />
          <CalendarIcon
            class="absolute left-3 top-10 transform -translate-y-1/2 h-6 w-6 text-primary"
          />
        </div>

        <!-- Botões -->
        <div class="flex gap-4 mt-6">
          <Button
            :icon="CheckIcon"
            variant="primary"
            fullWidth
            type="submit"
            :disabled="!isFormValid"
          >
            Criar
          </Button>
          <Button
            :icon="XMarkIcon"
            variant="danger"
            fullWidth
            @click="$emit('close')"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/store.js";
import { ref, computed } from "vue";
import Button from "@/components/button.vue";

const emit = defineEmits(["close", "task-created"]);

// Importação dos Heroicons
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  PlusIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

const taskStore = useTaskStore();
const task = ref({
  title: "",
  description: "",
  category: "",
  priority: "Baixa",
  dueDate: "",
});

// Computed Property para verificar se os campos obrigatórios estão preenchidos
const isFormValid = computed(() => {
  return task.value.title && task.value.category && task.value.dueDate && task.value.priority;
});

const handleCreateTask = async () => {
  try {
    await taskStore.addTask(task.value); // Adiciona a tarefa
    emit("task-created"); // Emite evento para atualizar o dashboard
    emit("close"); // Fecha o modal
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
};
</script>
