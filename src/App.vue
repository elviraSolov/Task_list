<template>
    <v-app>
        <v-container fluid class="container">
            <div class="app">
                <!-- Список заданий -->
                <task-list/>
                <!-- Кнопка для создания нового задания -->
                <div class="btn-wrapper d-flex justify-end">
                    <v-btn
                        icon 
                        color="#003153"
                        class="btn"
                        size="large"
                        @click="formDialogVisible = true"
                    >
                        <v-icon color="#ffffff">mdi-plus</v-icon>
                    </v-btn>
                </div>
                
                <!-- Диалоговое окно с формой -->
                <app-dialog 
                    persistent
                    v-model="formDialogVisible" 
                    @close="formDialogVisible = false"
                >
                    <template #title>
                        Новое задание
                    </template>
                    <task-form
                        @hideDialog="formDialogVisible = false"
                    />
                </app-dialog>
            </div>
        </v-container>
    </v-app>
</template>

<script>
import AppDialog from '@/components/UI/AppDialog.vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';

import { VApp, VContainer, VBtn, VIcon } from 'vuetify/lib/components';

export default {
    components: {
        TaskForm,
        TaskList,
        AppDialog,
        VApp,
        VContainer,
        VBtn, 
        VIcon
    },
    data() {
        return {
            formDialogVisible: false,
        }
    },
    beforeCreate() {
        this.$store.commit('initialiseStore')
    }
}
</script>

<style scoped>
.container {
    margin: 0 auto; 
    max-width: 720px
}
</style>