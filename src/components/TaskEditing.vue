<!-- Редактирование задания -->

<template>
    <v-form @submit.prevent>
        <v-text-field 
            label="Название*"
            v-model="taskItemHistory.title[1]"
            variant="underlined"
            :rules="[ fieldValidate ]"
            @input="isChanged = true"
        />
        <v-list>
            <v-list-item
                v-for="(item, index) in taskItem.body"
                :key="index"
                class="pa-0"
            >
                <div class="d-flex align-center mb-3">
                    <v-checkbox-btn
                        v-model="taskItemHistory.body[index].done[1]"
                        id="task{{ index }}" 
                        class="mr-3"
                        color="success"
                        @click="changeResult(index)"
                        @change="isChanged = true"
                    />
                    <v-text-field class="pr-2 mt-4"
                        v-model="taskItemHistory.body[index].name[1]"
                        label="Задача"
                        variant="underlined"
                        @input="isChanged = true"
                    />
                    <v-btn 
                        icon 
                        size="small" 
                        variant="text"
                        @click="showRemovingDialog(index)"
                    >
                        <v-icon>mdi-delete</v-icon>
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
                                <v-btn @click="removeTask()">Удалить</v-btn>
                                <v-spacer/>
                                <v-btn @click="removingDialogVisible = false">Отмена</v-btn>
                            </v-card-actions>
                        </template>
                    </app-dialog>
                </div>
            </v-list-item>
        </v-list>

        <div class="btns d-flex justify-space-between">
            <v-btn 
                variant="text"
                :disabled="(!this.isSaved && !isUndo)"
                @click="
                    undoChanges(taskItem.id);
                    isChanged = true;
                    isSaved = false;
                    isRedo = true;
                    isUndo = false;
                "
            >
                <v-icon>mdi-undo</v-icon>
            </v-btn>
            <v-btn 
                variant="text"
                :disabled="!isRedo"
                @click="
                    undoChanges(taskItem.id);
                    isChanged = true;
                    isSaved = false;
                    isRedo = false;
                    isUndo = true;
                "
            >
                <v-icon>mdi-redo</v-icon>
            </v-btn>

            <v-spacer/>

            <v-btn
                color="#14293e"
                variant="text"
                @click="addTaskItem"
            >
                Добавить задачу
            </v-btn>
            <v-btn
                color="#14293e"
                variant="text"
                :disabled="(!this.isValid || !this.isChanged)"
                @click="
                    changeTask(taskItem.id)
                    isChanged = false;
                    isSaved = true;
                "
            >
                Сохранить
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import { VSpacer, VForm, VTextField, VCheckboxBtn, VList, VListItem, VBtn, VIcon, VCardActions } from 'vuetify/lib/components';
import {  mapActions } from 'vuex'

export default {
    components: {
        VForm, 
        VTextField, 
        VCheckboxBtn,
        VList,
        VListItem, 
        VBtn, 
        VIcon,
        VSpacer,
        VCardActions
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
            removingDialogVisible: false,
            taskItem: this.task,
            taskItemHistory: this.taskHistory,
            removingItemIndex: 0,
            isValid: true,
            isChanged: false,
            isSaved: false,
            dialog: false,
            isRedo: false,
            isUndo: false
        }
    },
    methods: {
        showRemovingDialog(index) {
            this.removingDialogVisible = true;
            this.removingItemIndex = index
        },
        removeTask() {
            this.taskItem.body.splice(this.removingItemIndex, 1)
            this.removingDialogVisible = false;
        },
        addTaskItem() {
            this.taskItem.body.push ({name: '', done: false});
            this.taskItemHistory.body.push({name: ['', ''], done: ['', '']})
        },
        ...mapActions([
            'changeTask',
            'undoChanges',
            'redoChanges'
        ]),
        fieldValidate (value) {
            if (value.trim().length === 0) {
                this.isValid = false
                return "Это обязательное поле"
            } else {
                this.isValid = true
                return true
            }
        }
    }
}
</script>

<style scoped>

</style>




 