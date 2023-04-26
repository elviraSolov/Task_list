<!-- Редактирование задания -->

<template>
    <v-form @submit.prevent>
        <task-item-editing :task="task" :taskHistory="taskHistory"/>

        <div class="btns d-flex justify-space-between">
            <!-- Кнопки для отмены последнего действия -->
            <v-btn 
                variant="text"
                :disabled="(!this.isSaved && !isUndo)"
                @click="clickUndoBtn()"
            >
                <v-icon>mdi-undo</v-icon>
            </v-btn>
            <v-btn 
                variant="text"
                :disabled="!isRedo"
                @click="clickRedoBtn()"       
            >
                <v-icon>mdi-redo</v-icon>
            </v-btn>

            <v-spacer/>

            <v-btn
                variant="text"
                @click="clickAddBtn(this.task.id)"
            >
                Добавить задачу
            </v-btn>
            <v-btn
                variant="text"
                color="success"
                :disabled="(!this.isValid || !this.$store.state.isChanged)"
                @click="clickSaveBtn(this.task.id)"
            >
                Сохранить
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import { VSpacer, VForm, VBtn, VIcon } from 'vuetify/lib/components'
import {  mapActions } from 'vuex'
import TaskItemEditing from './TaskItemEditing.vue'

export default {
    components: {
        VForm, 
        VBtn, 
        VIcon,
        VSpacer,
        TaskItemEditing
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
            taskItemHistory: this.taskHistory,        
            isSaved: false,
            isRedo: false,
            isUndo: false
        } 
    },
    computed: {
        isValid() {
            if (this.taskItemHistory.title[1].trim().length === 0) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        ...mapActions([
            'changeTask',
            'undoChanges',
            'addTaskItem',
            'setTask',
            'setChanged'
        ]),
        clickUndoBtn() {
            this.undoChanges()
            this.setChanged(true)
            this.isSaved = false
            this.isRedo = true
            this.isUndo = false
        },
        clickRedoBtn() {
            this.undoChanges()
            this.setChanged(true)
            this.isSaved = false
            this.isUndo = true
            this.isRedo = false
        },
        clickSaveBtn(taskId) {
            this.setTask(taskId)
            this.changeTask()
            this.setChanged(false)
            this.isSaved = true
        },
        clickAddBtn(taskId) {
            this.setTask(taskId)
            this.addTaskItem()
            this.setChanged(true)
        }
    }
}
</script>
