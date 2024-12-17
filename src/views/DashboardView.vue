<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-primary mb-6">Dashboard de Tarefas</h1>

    <!-- Botão de Criar Tarefa e Filtros -->
    <div class="flex flex-wrap items-center w-[100%] gap-4 mb-6">
      <!-- Botão de Criar Tarefa -->
      <div>
        <Button
          variant="primary"
          :icon="PlusIcon"
          @click="showCreateTaskModal = true"
          class="px-4 py-2"
        >
          Nova Tarefa
        </Button>
      </div>

      <!-- Filtros -->
      <TaskFilters
        :selectedCategory="selectedCategory"
        :selectedPriority="selectedPriority"
        :categories="categories"
        @update:selectedCategory="selectedCategory = $event"
        @update:selectedPriority="selectedPriority = $event"
      />
    </div>

    <!-- Lista de Tarefas -->
    <TaskList
      :tasks="filteredTasks"
      @edit-task="openEditTaskModal"
      @delete-task="openDeleteModal"
    />

    <!-- Modais -->
    <CreateTaskModal
      v-if="showCreateTaskModal"
      @close="showCreateTaskModal = false"
      @task-created="handleTaskCreated"
    />
    <EditTaskModal
      v-if="showEditTaskModal"
      :taskToEdit="taskToEdit"
      @close="closeEditTaskModal"
      @task-updated="handleTaskUpdated"
    />
    <DeleteTaskModal
      v-if="showDeleteTaskModal"
      :taskId="taskToDelete"
      @close="closeDeleteModal"
      @task-deleted="handleTaskDeleted"
    />
  </div>
</template>

<script setup>
import TaskList from "@/components/TaskList.vue";
import CreateTaskModal from "@/components/CreateTaskModal.vue";
import EditTaskModal from "@/components/EditTaskModal.vue";
import DeleteTaskModal from "@/components/DeleteTaskModal.vue";
import TaskFilters from "@/components/TaskFilters.vue";
import Button from "@/components/button.vue";

import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/stores/store.js";
import {
  PlusIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid";

const taskStore = useTaskStore();
const showCreateTaskModal = ref(false);
const showEditTaskModal = ref(false);
const showDeleteTaskModal = ref(false);

const taskToEdit = ref(null);
const taskToDelete = ref(null);
const selectedCategory = ref("");
const selectedPriority = ref("");

const categories = computed(() => [
  ...new Set(taskStore.tasks.map((task) => task.category)),
]);

const filteredTasks = computed(() => {
  const filtered = taskStore.tasks.filter((task) => {
    const matchesCategory =
      selectedCategory.value === "" || task.category === selectedCategory.value;
    const matchesPriority =
      selectedPriority.value === "" || task.priority === selectedPriority.value;

    return matchesCategory && matchesPriority;
  });
  console.log("Tarefas filtradas:", filtered);
  return filtered;
});

const fetchTasks = async () => {
  await taskStore.fetchTasks();
};

const openEditTaskModal = (task) => {
  taskToEdit.value = task;
  showEditTaskModal.value = true;
};

const openDeleteModal = (taskId) => {
  taskToDelete.value = taskId;
  showDeleteTaskModal.value = true;
};

const handleTaskCreated = () => {
  showCreateTaskModal.value = false;
  fetchTasks();
};

const closeEditTaskModal = () => {
  showEditTaskModal.value = false;
  fetchTasks();
};

const closeDeleteModal = () => {
  showDeleteTaskModal.value = false;
  fetchTasks();
};

onMounted(() => {
  fetchTasks();
});
</script>
