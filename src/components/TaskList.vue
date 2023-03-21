<!-- Список заданий -->

<template>
    <div v-if="getTasks.length > 0">
        <h1 class="mb-3">Список заданий</h1>
        <task-item 
            v-for="(task, index) in getTasks" 
            :task="task"
            :key="task.id"
            :taskItemKey="index"
            :taskHistory="getTasksHistory[index]"
        />
    </div>
    <h1 v-else>Список заданий пуст</h1>
</template>

<script>
import TaskItem from "@/components/TaskItem";
import { mapGetters } from 'vuex'

export default {
    components: {
        TaskItem
    },
    computed: {
        ...mapGetters ([
            'getTasks',
            'getTasksHistory'
        ])
    }
}
</script>

<style scoped>
</style>