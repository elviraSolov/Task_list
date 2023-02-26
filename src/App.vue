<template>
    <div class="app">
        <h1>Страница с заданиями</h1>
        <my-button
            @click="showDialog"
        >
            Создать задание
        </my-button>        
        <my-dialog v-model:show="dialogVisible">
            <task-form
                @create="createTask"
            />
        </my-dialog>
        <task-list
            :tasks="tasks"
            @remove="removeTask"
        />
    </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';

export default {
    components: {
        TaskForm,
        TaskList,
    },
    data() {
        return {
            tasks: [
                {   id: 1, 
                    title: 'Задание 1', 
                    body: [
                        {name: 'Задача 1.1', done: true}, 
                        {name: 'Задача 1.2', done: false}
                    ]
                },
                {   id: 2, 
                    title: 'Задание 2', 
                    body: [
                        {name: 'Задача 2.1', done: false}, 
                        {name: 'Задача 2.2', done: true},
                        {name: 'Задача 2.3', done: false}
                    ]
                },
                {   id: 3, 
                    title: 'Задание 3', 
                    body: [
                        {name: 'Задача 3.1', done: true}, 
                        {name: 'Задача 3.2', done: true},
                        {name: 'Задача 3.3', done: false}
                    ]
                },
            ],
            dialogVisible: false
        }
    },
    methods: {
        createTask(task) {
            this.tasks.push(task);
            this.dialogVisible = false;
        },
        removeTask(task) {
            this.tasks = this.tasks.filter(t => t.id !== task.id)
        },
        showDialog() {
            this.dialogVisible = true
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>