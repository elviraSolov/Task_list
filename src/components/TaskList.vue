<!-- Компонент списка задач -->

<template>
    <div v-if="tasks.length > 0">
        <h1 class="mb-3">Список заданий</h1>
        <task-item 
            v-for="task in tasks" 
            :task="task"
            :key="task.id"
            @remove="$emit('remove', task)"
        />
    </div>
    <h2 v-else>Список заданий пуст</h2>
</template>

<script>
import TaskItem from "@/components/TaskItem";

export default {
    components: {
        TaskItem
    },
    props: {
        tasks: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
h3 {
    margin-bottom: 15px;
}
</style>