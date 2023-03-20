<!-- Список заданий -->

<template>
    <div v-if="tasks.length > 0">
        <h1 class="mb-3">Список заданий</h1>
        <task-item 
            v-for="(task, index) in this.tasks" 
            :task="task"
            :key="index"
            :taskHistory="tasksHistory[index]"
        />
    </div>
    <h1 v-else>Список заданий пуст</h1>
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
        },
        tasksHistory: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
</style>