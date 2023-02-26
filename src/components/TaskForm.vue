<!-- Компонент формы для создания задания -->

<template>
    <form @submit.prevent>
        <h4>Создание задания</h4>
        <my-input 
            v-model="task.title"
            placeholder="Название"
        />
        <div class="task-container"
            v-for="(item, index) in task.body"
            :key="index"
        >
            <my-input 
                v-model="task.body[index].name"
                placeholder='Задача'
            />
        </div>
        <my-button
            @click="addTaskItem"
        >
            Добавить задачу
        </my-button>
        <my-button 
            style="align-self: flex-end; margin-bottom: 0;" 
            @click="createTask"
        >
            Создать
        </my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            task: {
                title: '',
                body: []
            }
        }
    }, 
    methods: {
        createTask() {
            this.task.id = Date.now();
            this.$emit('create', this.task)
            this.task = {
                title: '',
                body: []
            }
        },
        addTaskItem() {
            this.task.body.push ({});
        },
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>