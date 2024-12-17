<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-r from-primary to-secondary">
    <div class="bg-gradient-to-br from-primary to-blue-600 md:w-full w-[90%] rounded-xl shadow-lg p-8  max-w-md">
      <h2 class="text-2xl font-bold text-center text-white mb-6 flex items-center gap-2">
        <UserPlusIcon class="h-6 w-6 text-secondary" />
        Criar Usuário
      </h2>

      <!-- Mensagem de sucesso/erro -->
      <p v-if="message" :class="`text-center font-semibold mb-4 ${messageType}`">
        <span v-if="messageType === 'text-red-500'">
          <XCircleIcon class="h-5 w-5 inline-block text-red-500" />
        </span>
        <span v-if="messageType === 'text-green-500'">
          <CheckCircleIcon class="h-5 w-5 inline-block text-primary" />
        </span>
        {{ message }}
      </p>

      <form @submit.prevent="handleCreateUser">
        <!-- Campo Usuário -->
        <div class="mb-4 relative">
          <label for="username" class="block text-sm font-semibold text-white">Usuário</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Digite o nome do usuário"
            class="w-full px-4 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black pl-10"
            required
          />
          <UserIcon
            class="absolute left-3 top-10 transform -translate-y-1/2 h-6 w-6 text-primary"
          />
        </div>

        <!-- Campo Senha -->
        <div class="mb-4 relative">
          <label for="password" class="block text-sm font-semibold text-white">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite a senha"
            class="w-full px-4 py-2 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black pl-10"
            required
          />
          <LockClosedIcon
            class="absolute left-3 top-10 transform -translate-y-1/2 h-6 w-6 text-primary"
          />
        </div>

        <!-- Botões -->
        <div class="flex flex-col gap-4">
          <button
            type="submit"
            class="w-full flex items-center justify-center gap-2 bg-white text-primary font-bold py-2 rounded-xl hover:bg-gray-200 transition duration-300"
          >
            <CheckIcon class="h-5 w-5 text-primary" />
            Criar Usuário
          </button>
          <button
            type="button"
            class="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-2 rounded-xl hover:bg-red-600 transition duration-300"
            @click="router.push('/')"
          >
            <ArrowLeftIcon class="h-5 w-5 text-white" />
            Voltar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/store"; // Importando a store
import { ref } from "vue";
import { useRouter } from "vue-router";

// Importação dos Heroicons
import {
ArrowLeftIcon,
CheckCircleIcon,
CheckIcon,
LockClosedIcon,
UserIcon,
UserPlusIcon,
XCircleIcon,
} from "@heroicons/vue/24/solid";

const username = ref("");
const password = ref("");
const message = ref("");
const messageType = ref(""); // Classe dinâmica para mensagens de sucesso/erro
const router = useRouter();
const taskStore = useTaskStore();

const handleCreateUser = async () => {
  try {
    const newUser = {
      username: username.value,
      password: password.value,
    };

    // Chama a função da store para criar o usuário
    const result = await taskStore.createUser(newUser);

    if (result.success) {
      message.value = "Usuário criado com sucesso!";
      messageType.value = "text-green-500";
      setTimeout(() => router.push("/"), 1500); // Redireciona para o login
    } else {
      message.value = result.message || "Erro ao criar usuário.";
      messageType.value = "text-red-500";
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    message.value = "Erro ao criar usuário.";
    messageType.value = "text-red-500";
  }
};
</script>

<style scoped>
/* Estilização adicional */
</style>
