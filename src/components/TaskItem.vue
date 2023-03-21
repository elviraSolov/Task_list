<!-- Задание -->

<template>
    <div class="d-flex flex-column mb-6 item">
        <v-sheet class="pa-4" color="#abcdef">
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
                    class="dots"
                    @mouseover="showPreview = true"
                    @mouseleave="showPreview = false"
                >
                    mdi-dots-horizontal
                </v-icon>
                <task-preview 
                    :task="this.taskItem" 
                    class="preview" 
                    v-show="showPreview"
                />
            </span>
        </v-sheet>

        <div class="btns">
            <v-btn 
                icon size="small"
                class="mr-1"
                variant="text"
                @click="removingDialogVisible = true"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-btn 
                icon size="small" 
                variant="text"
                @click="editingDialogVisible = true"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <app-dialog
                v-model="removingDialogVisible"
                @update:show="removingDialogVisible = $event"
            >
                <template v-slot:title>Вы уверены, что хотите удалить задание?</template>
                <template v-slot:content>
                    <v-card-actions>  
                        <v-btn @click="removeTaskById(task.id); removingDialogVisible = false">Да, удалить</v-btn>
                        <v-spacer/>
                        <v-btn @click="removingDialogVisible = false">Отмена</v-btn>
                    </v-card-actions>
                </template>
            </app-dialog>
            
            <app-dialog 
                v-model="editingDialogVisible" 
                @update:show="editingDialogVisible = $event"
            >
                <template v-slot:title>Редактирование задания</template>
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
        },
        taskItemKey: {
            type: Number,
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
            'removeTaskById'
        ])
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
    right: 8px;
}

.dots {
    padding: 10px;
    margin-bottom: 10px;
}

.preview {
    position: absolute;
    left: calc(100% + 15px);
    bottom: 100%;
    z-index: 10;
}

.preview-wrapper {
    position: relative;
    left: 8px
}
</style>