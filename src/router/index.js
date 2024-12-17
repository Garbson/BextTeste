import { createRouter, createWebHistory } from "vue-router";

// Importando as views necessárias
import CreateUserView from "../views/CreateUserView.vue"; // View de criação de usuário
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rota de Login
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    // Rota do Dashboard
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true }, // Rota protegida
    },
    // Rota de Criação de Usuário
    {
      path: "/create-user",
      name: "create-user",
      component: CreateUserView,
    },
  ],
});

// Guard de Navegação: Proteção do Dashboard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Se a rota exigir autenticação e o usuário não estiver logado
    next({ name: "login" }); // Redireciona para a tela de login
  } else {
    next(); // Prossegue para a rota
  }
});

export default router;
