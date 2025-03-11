<template>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg w-1/3">
            <h2 class="text-2xl font-semibold mb-4">{{ isEdit ? 'Edit Task' : 'Add Task' }}</h2>
            <input v-model="newTask.title" type="text" placeholder="Title"
                class="p-3 text-lg border border-gray-300 rounded mb-4 w-full" />

            <!-- Textarea for description with left alignment -->
            <textarea v-model="newTask.description" placeholder="Description"
                class="p-3 text-base border border-gray-300 rounded mb-4 w-full h-32 text-left"></textarea>

            <!-- Status Combobox with smaller font size -->
            <select v-model="newTask.status" class="p-3 text-lg border border-gray-300 rounded mb-4 w-full">
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <div class="flex justify-end space-x-4">
                <!-- Update Task Button with Font Awesome Icon -->
                <button @click="addOrUpdateTask" class="p-3 bg-blue-500 text-white text-lg rounded flex items-center"
                    title="Save Task">
                    <i class="fas fa-check"></i> <!-- Check icon for update -->
                </button>

                <!-- Cancel Button with Font Awesome Icon -->
                <button @click="closeModal" class="ml-4 p-3 bg-gray-300 text-black text-lg rounded flex items-center"
                    title="Cancel">
                    <i class="fas fa-times"></i> <!-- Close icon for cancel -->
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showModal: Boolean,
        newTask: Object,
        isEdit: Boolean,
        addOrUpdateTask: Function,
        closeModal: Function
    }
};
</script>

<style scoped></style>
