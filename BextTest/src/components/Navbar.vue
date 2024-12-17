<template>
  <nav class="bg-primary text-white py-4 shadow-md relative">
    <div class="container mx-auto flex justify-between items-center md:px-6">
      <!-- Logo -->
      <div class="flex items-center md:space-x-2">
        <img src="/bextvc_logo.jpg" alt="Logo" class="h-12 w-auto md:px-0 px-6" />
        <!-- Mensagens condicionais para Login e Criação de Usuário -->
        <span v-if="isLoginPage" class="text-lg font-bold text-secondary">
          Seja Bem-vindo!
        </span>
        <span v-else-if="isCreateUserPage" class="text-lg font-bold text-secondary">
          Crie sua Conta!
        </span>
      </div>

      <!-- Links de Navegação (Apenas após login) -->
      <div v-if="!isLoginPage && !isCreateUserPage" class="hidden md:flex space-x-6">
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-2 hover:text-secondary transition-colors"
          active-class="font-bold underline"
        >
          <HomeIcon class="h-5 w-5" />
          Dashboard
        </RouterLink>
        <a
          href="https://wa.me/5568992490198"
          target="_blank"
          class="flex items-center gap-2 hover:text-secondary transition-colors"
        >
          <ChatBubbleLeftIcon class="h-5 w-5" />
          Suporte
        </a>
        <button
          @click="handleLogout"
          class="flex items-center gap-2 hover:text-secondary transition-colors focus:outline-none"
        >
          <ArrowRightOnRectangleIcon class="h-5 w-5" />
          Logout
        </button>
      </div>

      <!-- Botão para Mobile -->
      <div class="relative md:hidden px-6">
        <button
          v-if="!isLoginPage && !isCreateUserPage"
          class="text-white focus:outline-none"
          @click="toggleMobileMenu"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>

        <!-- Menu Mobile -->
        <div
          v-if="isMobileMenuOpen"
          class="absolute right-0 top-full mt-2 w-64 bg-primary px-6 py-4 space-y-4 shadow-lg rounded-lg z-50"
        >
          <RouterLink
            to="/dashboard"
            class="flex items-center gap-2 hover:text-secondary transition-colors"
            @click="toggleMobileMenu"
          >
            <HomeIcon class="h-5 w-5" />
            Dashboard
          </RouterLink>
          <a
            href="https://wa.me/5568992490198"
            target="_blank"
            class="flex items-center gap-2 hover:text-secondary transition-colors"
            @click="toggleMobileMenu"
          >
            <ChatBubbleLeftIcon class="h-5 w-5" />
            Suporte
          </a>
          <button
            @click="() => { handleLogout(); toggleMobileMenu(); }"
            class="flex items-center gap-2 text-left hover:text-secondary transition-colors"
          >
            <ArrowRightOnRectangleIcon class="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useTaskStore } from "@/stores/store";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Importação dos ícones Heroicons
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
  HomeIcon,
} from "@heroicons/vue/24/solid";

const isMobileMenuOpen = ref(false);
const router = useRouter();
const route = useRoute();
const taskStore = useTaskStore();

// Verifica se a rota atual é a página de login
const isLoginPage = computed(() => route.path === "/");

// Verifica se a rota atual é a página de criação de usuário
const isCreateUserPage = computed(() => route.path === "/create-user");

// Alterna o menu mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Função de logout
const handleLogout = () => {
  taskStore.logoutUser(); // Limpa o usuário da store e localStorage
  router.push("/"); // Redireciona para a página de login
};
</script>

<style scoped>
/* Ajustes específicos do componente */
nav {
  font-family: "Inter", sans-serif;
}
</style>
