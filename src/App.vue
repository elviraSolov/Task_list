<template>
    <v-app>
        <v-container fluid style="margin: 0 auto; max-width: 720px">
            <div class="app">
                <task-list
                    :tasks="getTasks"
                    :tasksHistory="getTasksHistory"
                />
                <v-btn
                    icon
                    v-bind="props"
                    color="#003153"
                    class="btn-plus"
                    size="large"
                    @click="showDialog"
                >
                    <v-icon color="#ffffff">mdi-plus</v-icon>
                </v-btn>
                <app-dialog 
                    v-model="show" 
                    @update:show="this.show = $event"
                >
                    <template v-slot:title>
                        Новое задание
                    </template>
                    <template v-slot:content>
                        <task-form
                            @hideDialog="hideDialog()"
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
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        dialogVisible: {
            type: Boolean
        }
    },
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
            dialog: false,
            show: false,
        }
    },
    methods: {
        hideDialog() {
            this.dialog = false
            this.show = false
        },
        ...mapActions([
            'addTask'
        ]),
        showDialog() {
            this.show = true
        }
    },
    computed: {
        ...mapGetters([
            'getTasks',
            'getTasksHistory'
        ])
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