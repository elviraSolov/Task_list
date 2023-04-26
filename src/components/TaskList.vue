<!-- Список заданий -->

<template>
    <div v-if="this.$store.state.tasks.length > 0">
        <h1 class="mb-3">Список заданий</h1>
        <transition-group name="task-list">
            <task-item 
                v-for="(task, index) in this.$store.state.tasks" 
                :task="task"
                :key="task.id"
                :taskItemKey="index"
                :taskHistory="this.$store.state.tasksHistory[index]"
            />
        </transition-group>
    </div>
    <h1 v-else>Список заданий пуст</h1>
</template>

<script>
import TaskItem from "@/components/TaskItem";

export default {
    components: {
        TaskItem
    }
}
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
    transition: all 0.5s ease;
}

.task-list-enter-from {
    opacity: 0;
    transform: translateY(130px);
}

.task-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
</style>