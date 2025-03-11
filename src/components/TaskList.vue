<template>
    <div class="p-6">
        <h1 class="text-3xl font-semibold mb-6">Task Cards</h1>

        <!-- Button to open Add Task Modal with an icon -->
        <button @click="openAddTaskModal" class="p-3 bg-green-500 text-white rounded mb-6 text-lg flex items-center"
            title="Add New Task">
            <i class="fas fa-plus mr-2"></i>
            Add Task
        </button>

        <!-- Task Cards Container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loop through the tasks and display each one as a card -->
            <TaskCard v-for="task in tasks" :key="task.id" :task="task" :openDeleteModal="openDeleteModal"
                :editTask="editTask" :statusClass="statusClass" />
        </div>

        <!-- Add or Update Task Modal -->
        <TaskModal :showModal="showModal" :newTask="newTask" :isEdit="isEdit" :addOrUpdateTask="addOrUpdateTask"
            :closeModal="closeModal" />
    </div>
</template>

<script>
import TaskCard from './TaskCard.vue';
import TaskModal from './TaskModal.vue';
import { api } from '../axios';

export default {
    components: {
        TaskCard,
        TaskModal
    },
    data() {
        return {
            tasks: [], // Task list fetched from the API
            newTask: {
                id: null,
                title: "",
                description: "",
                status: "pending", // Default status to "pending"
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            isEdit: false,
            showModal: false,
            taskToDelete: null
        };
    },
    mounted() {
        this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await api.get("tasks/");
                this.tasks = response.data;
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        },
        openAddTaskModal() {
            this.newTask = {
                id: null,
                title: "",
                description: "",
                status: "pending",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            this.isEdit = false;
            this.showModal = true;
        },
        openDeleteModal(taskId) {
            this.taskToDelete = taskId;
        },
        closeModal() {
            this.showModal = false;
        },
        statusClass(status) {
            if (status === 'pending') return 'bg-red-500';
            if (status === 'in_progress') return 'bg-yellow-500';
            if (status === 'done') return 'bg-green-500';
        },
        async addOrUpdateTask() {
            if (this.isEdit) {
                try {
                    const response = await api.put(`tasks/${this.newTask.id}/`, this.newTask);
                    const updatedTask = response.data;
                    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
                    if (index !== -1) this.tasks[index] = updatedTask;
                    this.closeModal();
                } catch (error) {
                    console.error("Error updating task:", error);
                }
            } else {
                try {
                    const response = await api.post("tasks/", this.newTask);
                    this.tasks.push(response.data);
                    this.closeModal();
                } catch (error) {
                    console.error("Error adding task:", error);
                }
            }
        },
        async deleteTask() {
            try {
                await api.delete(`tasks/${this.taskToDelete}/`);
                this.tasks = this.tasks.filter(task => task.id !== this.taskToDelete);
                this.closeDeleteModal();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },
        editTask(task) {
            this.newTask = { ...task };
            this.isEdit = true;
            this.showModal = true;
        },
        closeDeleteModal() {
            this.taskToDelete = null;
        }
    }
};
</script>

<style scoped></style>
