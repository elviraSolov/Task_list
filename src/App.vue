<template>
    <v-app>
        <v-container fluid style="margin: o auto; max-width: 1200px">
            <div class="app">
                <h1 class="mb-3">Страница с заданиями</h1>
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
        </v-container>
    </v-app>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
import { VApp, VContainer } from 'vuetify/lib/components';

export default {
    components: {
        TaskForm,
        TaskList,
        VApp,
        VContainer
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
                        {name: 'Задача 3.3', done: false},
                        {name: 'Задача 3.4', done: false},
                        {name: 'Задача 3.5', done: false}
                    ]
                },
                {   id: 4, 
                    title: 'Задание 4', 
                    body: [
                        {name: 'Задача 4.1', done: true}, 
                        {name: 'Задача 4.2', done: true},
                        {name: 'Задача 4.3', done: false},
                        {name: 'Задача 4.4', done: false}
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
        },
        hideDialog() {
            this.dialogVisible = false
        }
    }
}
</script>

<style>
</style>