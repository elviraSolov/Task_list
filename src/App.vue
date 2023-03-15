<template>
    <v-app>
        <v-container fluid style="margin: 0 auto; max-width: 720px">
            <div class="app">
                <v-dialog
                    class="p-3"
                    v-model="dialog"
                    persistent
                    width="600"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            icon
                            v-bind="props"
                            color="#003153"
                            class="btn-plus"
                            size="large"
                        >
                            <v-icon color="#ffffff">mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Создание задания</span>
                        </v-card-title>
                        <v-card-text>
                            <task-form
                                :dialog="this.dialog"
                                @create="createTask"
                                @hideDialog="hideDialog"
                            />
                        </v-card-text>
                    </v-card>
                </v-dialog>
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
import { VApp, VContainer, VBtn, VDialog, VCard, VCardTitle, VCardText, VIcon } from 'vuetify/lib/components';

export default {
    components: {
        TaskForm,
        TaskList,
        VApp,
        VContainer,
        VBtn, VDialog,  VCard, VCardTitle, VCardText, VIcon
    },
    data() {
        return {
            dialog: false,
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
            this.dialog = false
        }
    }
}
</script>

<style scoped>
.app {
    position: relative;
}

.btn-plus {
    position: fixed;
    right: 15%;
    bottom: 5%;
    z-index: 2;
}
</style>