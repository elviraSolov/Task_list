<!-- Компонент задачи -->

<template>
    <div class="d-flex flex-column mb-6 item">
        <v-sheet class="pa-4" color="#efdecd">
            {{ taskItem.title }}
        </v-sheet>

        <v-sheet class="pa-4 pb-0">
            <div
                class="d-flex flex-row align-center mb-3"
                v-for="(task, index) in taskPreview" 
                :key="index"
            >
                <v-checkbox-btn
                    v-model="taskItem.body[index].done"
                    id="task{{ index }}" 
                    class="mr-3"
                    disabled
                />
                <span>
                    {{ taskItem.body[index].name }} <br/>
                </span>
            </div>
            <span v-if="taskItem.body.length >= 4">
                <v-icon class="eye">mdi-eye-outline</v-icon>
            </span>
        </v-sheet>

        <div class="d-flex flex-row btns">
            <v-dialog
                class="p-3"
                v-model="dialogRemoveVisible"
                persistent
                width="600"
            >
                <template v-slot:activator="{ props }">
                    <v-btn 
                        v-bind="props"
                        icon
                        size="small"
                        class="mb-3 mr-2"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Вы уверены, что хотите удалить задачу?</span>
                    </v-card-title>
                    <v-card-text>
                        <div class="d-flex flex-row">
                            <v-btn 
                                color="#14293e"
                                variant="text"
                                @click="$emit('remove', task)"
                                class="mb-3"
                            >
                                Удалить
                            </v-btn>
                            <v-btn 
                                color="#14293e"
                                variant="text"
                                @click="hideRemoveDialog"
                                style="margin-bottom: 0;"
                            >
                                Отмена
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog
                class="p-3"
                v-model="dialogEditVisible"
                persistent
                width="600"
            >
                <template v-slot:activator="{ props }">
                    <v-btn 
                        v-bind="props"
                        icon
                        size="small"
                        class="mb-3"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <task-editing 
                            :task="this.task"
                            @hideDialog="hideEditDialog">
                        </task-editing>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import TaskEditing from '@/components/TaskEditing.vue';
import { VSheet, VBtn, VIcon, VDialog, VCard, VCardTitle, VCardText, VCheckboxBtn } from 'vuetify/lib/components';

export default {
    components: {
        TaskEditing,
        VSheet,
        VBtn,
        VIcon, VDialog, VCard, VCardTitle, VCardText, VCheckboxBtn
    },
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialogRemoveVisible: false,
            dialogEditVisible: false,
            taskItem: this.task,

            iconfont: 'mdi',
            icons: {
                'icon': 'mdi-dropbox'
            },
        }
    },
    methods: {
        showRemoveDialog() {
            this.dialogRemoveVisible = true;
        },
        hideRemoveDialog() {
            this.dialogRemoveVisible = false;
        },
        showEditDialog() {
            this.dialogEditVisible = true;
        },
        hideEditDialog() {
            this.dialogEditVisible = false;
        }
    },
    computed: {
        taskPreview () {
            return this.taskItem.body.slice(0, 3);
        }
    }
}
</script>

<style scoped>
.item {
    position: relative;
    width: 100%;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1); 
}

.btns {
    position: absolute;
    top: 8px;
    right: 16px;
}

.eye {
    position: absolute;
    bottom: 20px;
    right: 20px;
}
</style>