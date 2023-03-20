<!-- Задание -->

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
            <span class="preview-wrapper" v-if="taskItem.body.length >= 4">
                <v-icon 
                    class="eye"
                    @mouseover="showPreview = true"
                    @mouseleave="showPreview = false"
                >
                    mdi-eye-outline
                </v-icon>
                <task-preview 
                    :task="this.taskItem" 
                    class="preview" 
                    v-show="showPreview"
                />
            </span>
        </v-sheet>

        <div class="d-flex flex-row btns">
            <v-btn 
                icon
                size="small"
                class="mb-3 mr-2"
                variant="text"
                @click="removingDialogVisible = true"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-btn 
                icon
                size="small"
                class="mb-3 mr-2"
                variant="text"
                @click="editingDialogVisible = true"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <app-dialog
                v-model="removingDialogVisible"
                @update:show="removingDialogVisible = $event"
            >
                <template v-slot:title>
                    Вы уверены, что хотите удалить задачу?
                </template>
                <template v-slot:content>
                    <v-card-actions>
                        <v-btn @click="removeTask(taskItem)">Да, удалить</v-btn>
                        <v-spacer/>
                        <v-btn @click="removingDialogVisible = false">Отмена</v-btn>
                    </v-card-actions>
                </template>
            </app-dialog>
            
            <app-dialog 
                v-model="editingDialogVisible" 
                @update:show="editingDialogVisible = $event"
            >
                <template v-slot:title>
                    Редактирование задания
                </template>
                <template v-slot:content>
                    <task-editing
                        :task="taskItem"
                        :taskHistory="taskItemHistory"
                    />
                </template>
            </app-dialog>
        </div>
    </div>
</template>

<script>
import TaskPreview from './TaskPreview.vue'
import TaskEditing from '@/components/TaskEditing.vue'
import { VCardActions, VSheet, VBtn, VIcon, VCheckboxBtn, VSpacer } from 'vuetify/lib/components'
import { mapActions } from 'vuex'

export default {
    components: {
        TaskEditing,
        TaskPreview,
        VSheet,
        VBtn,
        VIcon,  
        VCardActions,
        VCheckboxBtn, 
        VSpacer
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
        taskHistory: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editingDialogVisible: false,
            removingDialogVisible: false,
            taskItem: this.task,
            taskItemHistory: this.taskHistory,
            showPreview: false
        }
    },
    methods: {
        ...mapActions([
            'removeTask'
        ]),
        remove() {
            this.$emit('remove')
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
    padding: 10px;
}

.preview {
    position: absolute;
    right: calc(-100% + 65px);
    bottom: 100%;
    z-index: 10;
}

.preview-wrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
}
</style>