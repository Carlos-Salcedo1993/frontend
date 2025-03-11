<template>
    <div class="bg-white shadow-md rounded-lg p-6 flex flex-col border border-gray-300 mb-6">
        <div class="flex justify-between items-center border-b border-gray-300 pb-4">
            <h2 class="text-xl font-semibold">{{ task.title }}</h2>

            <!-- Status Chip with Dynamic Background Color and Icon Inside -->
            <div class="flex items-center text-white text-sm py-2 px-2 rounded-full" :class="statusClass(task.status)"
                title="Task Status">
                <!-- Font Awesome Icons Inside Status Chip -->
                <i v-if="task.status === 'pending'" class="fas fa-circle-notch text-white" title="Pending"></i>
                <i v-if="task.status === 'in_progress'" class="fas fa-sync-alt text-white" title="In Progress"></i>
                <i v-if="task.status === 'done'" class="fas fa-check-circle text-white" title="Done"></i>
            </div>
        </div>

        <!-- Description Display with left alignment -->
        <pre
            class="text-base text-gray-700 mb-4 border-b border-gray-300 pb-4 text-left bg-gray-100 p-4 rounded-md font-mono whitespace-pre-wrap break-words">{{ task.description }}</pre>

        <!-- Buttons for Edit and Delete with icons -->
        <div class="flex flex-row-reverse">
            <button @click="openDeleteModal(task.id)"
                class="bg-red-500 text-white p-3 text-sm rounded-lg flex items-center" title="Delete Task">
                <i class="fas fa-trash"></i>
            </button>
            &nbsp;
            <button @click="editTask(task)" class="bg-yellow-500 text-white p-3 text-sm rounded-lg flex items-center"
                title="Edit Task">
                <i class="fas fa-edit"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        task: Object,
        openDeleteModal: Function,
        editTask: Function,
        statusClass: Function
    }
};
</script>

<style scoped>
/* Additional custom styles for the <pre> tag can go here if needed */
</style>
