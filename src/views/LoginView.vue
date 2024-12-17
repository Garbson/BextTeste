<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-r from-primary to-secondary">
    <!-- Container do Card -->
    <div class="bg-primary rounded-xl shadow-lg p-8 md:w-full w-[90%] max-w-md">
      <h2 class="text-2xl font-bold text-center text-white mb-6">Bem-vindo!</h2>

      <!-- Formulário -->
      <form @submit.prevent="handleLogin">
        <!-- Campo Usuário -->
        <div class="relative mb-4">
          <label for="username" class="block text-sm font-semibold text-white">Usuário</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Digite seu usuário"
            class="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 pl-10"
            required
          />
          <!-- Ícone do Usuário -->
          <UserIcon class="absolute left-3 top-9 h-6 w-6 text-primary" />
        </div>

        <!-- Campo Senha -->
        <div class="relative mb-4">
          <label for="password" class="block text-sm font-semibold text-primary">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite sua senha"
            class="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 pl-10"
            required
          />
          <!-- Ícone de Senha -->
          <LockClosedIcon class="absolute left-3 top-9 h-6 w-6 text-primary" />
        </div>

        <!-- Mensagem de erro -->
        <p v-if="errorMessage" class="text-red-600 text-sm mb-4">{{ errorMessage }}</p>

        <!-- Botão de Login -->
        <button
          type="submit"
          class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-xl transition duration-300 flex items-center justify-center gap-2"
        >
          <ArrowRightOnRectangleIcon class="h-5 w-5" />
          Entrar
        </button>
      </form>

      <!-- Link para Criar Novo Usuário -->
      <div class="text-center mt-6">
        <p class="text-sm text-white">
          Ainda não tem uma conta?
          <span 
            @click="goToCreateUser" 
            class="text-blue-400 underline cursor-pointer hover:text-blue-200 flex items-center justify-center gap-1"
          >
            <UserPlusIcon class="h-5 w-5" />
            Criar uma agora
          </span>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/store.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Importação dos ícones do Heroicons v2
import { ArrowRightOnRectangleIcon, LockClosedIcon, UserIcon, UserPlusIcon } from "@heroicons/vue/24/solid";

// Estado
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const taskStore = useTaskStore(); // Acessa a store

// Função para validar login
const handleLogin = async () => {
  const result = await taskStore.loginUser(username.value, password.value); // Chama a ação da store

  if (result.success) {
    console.log("Login efetuado com sucesso!");
    localStorage.setItem("isLoggedIn", "true"); // Salva o estado de login no localStorage
    router.push("/dashboard"); // Redireciona para o dashboard
  } else {
    errorMessage.value = result.message; // Exibe mensagem de erro
  }
};

// Redirecionar para a página de criação de usuário
const goToCreateUser = () => {
  router.push("/create-user");
};
</script>


