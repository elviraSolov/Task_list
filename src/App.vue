<template>
    <v-app>
        <v-container fluid style="margin: 0 auto; max-width: 720px">
            <div class="app">
                <task-list/>
                <v-btn
                    icon color="#003153"
                    class="btn-plus"
                    size="large"
                    @click="this.formDialogVisible = true"
                >
                    <v-icon color="#ffffff">mdi-plus</v-icon>
                </v-btn>
                <app-dialog 
                    persistent
                    v-model="formDialogVisible" 
                    @onClose="this.formDialogVisible = false"
                >
                    <template v-slot:title>
                        Новое задание
                    </template>
                    <template v-slot:content>
                        <task-form
                            @hideDialog="this.formDialogVisible = false"
                        />
                    </template>
                </app-dialog>
            </div>
        </v-container>
    </v-app>
</template>

<script>
import AppDialog from './components/UI/AppDialog.vue';
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
    }
}
</script>

<style scoped>
.btn-plus {
    position: fixed;
    right: 15%;
    bottom: 5%;
    z-index: 2;
}
</style>