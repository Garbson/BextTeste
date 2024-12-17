import axios from "axios";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    user: JSON.parse(localStorage.getItem("user")) || null, 
  }),

  actions: {
    // 1. Login do Usuário
    async loginUser(username, password) {
      try {
        const response = await axios.get("http://localhost:3000/users");

        const user = response.data.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          this.user = user; // Salva o usuário na store
          localStorage.setItem("user", JSON.stringify(user)); // Persiste o usuário no localStorage
          localStorage.setItem("isLoggedIn", "true"); // Estado de autenticação
          return { success: true, user: this.user };
        } else {
          return { success: false, message: "Usuário ou senha incorretos" };
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        return { success: false, message: "Erro ao fazer login" };
      }
    },

    // 2. Criar Novo Usuário
    async createUser(newUser) {
      try {
        // Verifica se o usuário já existe
        const existingUserResponse = await axios.get("http://localhost:3000/users", {
          params: { username: newUser.username },
        });

        if (existingUserResponse.data.length > 0) {
          return { success: false, message: "Esse nome já está sendo utilizado" };
        }

        // Se o usuário não existir, cria um novo
        const response = await axios.post("http://localhost:3000/users", newUser);
        return { success: true, user: response.data };
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return { success: false, message: "Erro ao criar usuário." };
      }
    }
    ,

    // 3. Buscar Tarefas (apenas do usuário logado)
    async fetchTasks() {
      if (!this.user) return; // Garante que um usuário está logado
      try {
        const response = await axios.get("http://localhost:3000/tasks", {
          params: { userId: this.user.id }, // Busca tarefas apenas do usuário logado
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    },

    // 4. Adicionar Tarefa (associada ao usuário logado)
    async addTask(newTask) {
      try {
        if (!this.user) throw new Error("Usuário não está logado");
        newTask.userId = this.user.id; // Atribui o ID do usuário logado à tarefa
        const response = await axios.post("http://localhost:3000/tasks", newTask);
        this.tasks.push(response.data);
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    },

    // 5. Editar Tarefa
    async editTask(updatedTask) {
      try {
        await axios.put(`http://localhost:3000/tasks/${updatedTask.id}`, updatedTask);
        const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) this.tasks[index] = updatedTask;
      } catch (error) {
        console.error("Erro ao editar tarefa:", error);
      }
    },

    // 6. Deletar Tarefa
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
      }
    },

    // 7. Logout do Usuário
    logoutUser() {
      this.user = null; // Limpa o usuário da store
      this.tasks = []; // Limpa as tarefas
      localStorage.removeItem("user"); // Remove o usuário do localStorage
      localStorage.removeItem("isLoggedIn"); // Remove o estado de autenticação
    },
  },
});
