<!-- Компонент задачи -->

<template>
    <div class="d-flex flex-row mb-6">
        <v-sheet width="35%" class="pa-2" color="indigo">
            {{ taskItem.title }}
        </v-sheet>
        <v-sheet width="65%" class="pa-2">
            <span 
                v-for="(task, index) in taskPreview" 
                :key="index"
            >
                {{ taskItem.body[index].name }} <br/>
            </span>
            <span v-if="taskItem.body.length >= 4">
                ...
            </span>
        </v-sheet>

        <div class="d-flex flex-column">
            <my-button 
                @click="showRemoveDialog"
            >
                Удалить
            </my-button>
            <my-button
                @click="showEditDialog"
            >
                Изменить
            </my-button>
        </div>
            
        <my-dialog v-model:show="dialogRemoveVisible">
            <h3 class="mb-3">Вы уверены, что хотите удалить задачу?</h3>
            <div class="btns d-flex flex-column">
                <my-button 
                    @click="$emit('remove', task)"
                >
                    Удалить
                </my-button>
                <my-button 
                    @click="hideRemoveDialog"
                    style="margin-bottom: 0;"
                >
                    Отмена
                </my-button>
            </div>
        </my-dialog>

        <my-dialog v-model:show="dialogEditVisible">
            <task-editing 
                :task="this.task"
                @hideDialog="hideEditDialog">
            </task-editing>
        </my-dialog>
    </div>
</template>

<script>
import TaskEditing from '@/components/TaskEditing.vue';
import { VSheet } from 'vuetify/lib/components';

export default {
    components: {
        TaskEditing,
        VSheet
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
            taskItem: this.task
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

<style>
</style>