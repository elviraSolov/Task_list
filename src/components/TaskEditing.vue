<!-- Редактирование задания -->

<template>
    <v-form @submit.prevent>
        <v-text-field 
            label="Название*"
            v-model="taskItemHistory.title[1]"
            variant="underlined"
            :rules="[ fieldValidate ]"
            @input="setChanged(true)"
        />
        <v-list>
            <v-list-item
                v-for="(item, index) in taskItemHistory.body"
                :key="index"
                class="pa-0"
            >
                <div class="d-flex align-center mb-3">
                    <v-checkbox-btn
                        v-model="taskItemHistory.body[index].done[1]"
                        id="task{{ index }}" 
                        class="mr-3"
                        color="success"
                        @change="setChanged(true)"
                    />
                    <v-text-field 
                        class="pr-2 mt-4"
                        v-model="taskItemHistory.body[index].name[1]"
                        label="Задача"
                        variant="underlined"
                        @input="setChanged(true)"
                    />
                    <v-btn 
                        icon 
                        size="small" 
                        variant="text"
                        @click="
                            removingDialogVisible = true; 
                            removingItemIndex = index"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <app-dialog
                        v-model="removingDialogVisible"
                        @onClose="removingDialogVisible = false"
                    >
                        <template v-slot:title>
                            Вы уверены, что хотите удалить задачу?
                        </template>
                        <template v-slot:content>
                            <v-card-actions>
                                <v-btn @click="
                                    setTask(taskItem.id); 
                                    removeTaskItem(removingItemIndex); 
                                    removingDialogVisible = false; 
                                    setChanged(true);
                                    isSaved = false"
                                >
                                    Да, удалить
                                </v-btn>
                                <v-spacer/>
                                <v-btn @click="removingDialogVisible = false">
                                    Отмена
                                </v-btn>
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
                    undoChanges();
                    setChanged(true);
                    isSaved = false;
                    isRedo = true;
                    isUndo = false"
            >
                <v-icon>mdi-undo</v-icon>
            </v-btn>
            <v-btn 
                variant="text"
                :disabled="!isRedo"
                @click="
                    undoChanges();
                    setChanged(true);
                    isSaved = false;
                    isRedo = false;
                    isUndo = true"
            >
                <v-icon>mdi-redo</v-icon>
            </v-btn>

            <v-spacer/>

            <v-btn
                variant="text"
                @click="
                    setTask(taskItem.id); 
                    addTaskItem();
                    setChanged(true)"
            >
                Добавить задачу
            </v-btn>
            <v-btn
                variant="text"
                :disabled="(!this.isValid || !this.getChanged)"
                @click="
                    setTask(taskItem.id);
                    changeTask();
                    setChanged(false);
                    isSaved = true"
            >
                Сохранить
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import { VSpacer, VForm, VTextField, VCheckboxBtn, VList, VListItem, VBtn, VIcon, VCardActions } from 'vuetify/lib/components';
import {  mapActions, mapGetters } from 'vuex'

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
            taskItem: this.task,
            taskItemHistory: this.taskHistory,
            removingDialogVisible: false,
            removingItemIndex: null,
            isValid: true,
            isChanged: false,
            isSaved: false,
            isRedo: false,
            isUndo: false
        }
    },
    methods: {
        ...mapActions([
            'changeTask',
            'undoChanges',
            'redoChanges',
            'addTaskItem',
            'removeTaskItem',
            'setTask',
            'setChanged'
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
    },
    computed: {
        ...mapGetters ([
            'getChanged'
        ])
    }
}
</script>
