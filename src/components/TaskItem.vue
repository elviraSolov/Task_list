<!-- Задание -->

<template>
    <v-card class="d-flex flex-column mb-6">
        <!-- Карточка с заданием -->
        <v-sheet class="pa-4 pr-8" color="#abcdef">
            {{ taskItem.title }}
        </v-sheet>
        <v-sheet class="pa-4 pb-0">
            <div
                class="d-flex align-center mb-3"
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
                    {{ taskItem.body[index].name }}
                </span>
            </div>

            <!-- Превью для заданий, длина задач которых превышает 3.
            Появляется при наведении на строку "..." -->
            <v-btn class="mb-5" v-if="taskItem.body.length >= 4">
                Предпросмотр
                <v-tooltip
                    min-width="300"
                    activator="parent"
                    location="end"
                >
                    <task-preview 
                        :task="taskItem" 
                    />
                </v-tooltip>
            </v-btn>
        </v-sheet>

        <!-- Кнопки удалить/изменить задание  -->
        <div class="btns">
            <v-btn 
                icon 
                size="small"
                class="mr-1"
                variant="text"
                @click="removingDialogVisible = true"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn 
                icon 
                size="small" 
                variant="text"
                @click="editingDialogVisible = true"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <!-- Подтверждение удаления задания -->
            <app-dialog
                v-model="removingDialogVisible"
                @close="removingDialogVisible = false"
            >
                <template #title>
                    Вы уверены, что хотите удалить задание?
                </template>
                <v-card-actions>  
                    <v-btn @click="
                        removeTaskById(task.id); 
                        removingDialogVisible = false"
                    >
                        Да, удалить
                    </v-btn>
                    <v-spacer/>
                    <v-btn @click="removingDialogVisible = false">
                        Отмена
                    </v-btn>
                </v-card-actions>
            </app-dialog>

            <!-- Диалоговое окно для редактирования -->
            <app-dialog 
                persistent
                v-model="editingDialogVisible" 
                @close="
                    confirmDialogVisible = $store.state.isChanged;
                    editingDialogVisible = $store.state.isChanged"
            >
                <template #title>Редактирование задания</template>
                <edit-form
                    :task="taskItem"
                    :taskHistory="taskItemHistory"
                />
            </app-dialog>

            <!-- Подтверждение для выхода из редактирования.
            Появляестя в случае несохраненного изменения-->
            <app-dialog
                v-model="confirmDialogVisible"
                @close="confirmDialogVisible = false"
            >
                <template #title>
                    Вы уверены, что хотите выйти, <br/>не сохранив изменения?
                </template>
                <v-card-actions>
                    <v-btn @click="clickConfirmBtn()">
                        Да, выйти
                    </v-btn>
                    <v-spacer/>
                    <v-btn @click="confirmDialogVisible = false">
                        Отмена
                    </v-btn>
                </v-card-actions>
            </app-dialog>
        </div>
    </v-card>
</template>

<script>
import TaskPreview from '@/components/TaskPreview.vue'
import EditForm from '@/components/EditForm.vue'
import { VTooltip, VCard, VCardActions, VSheet, VBtn, VIcon, VCheckboxBtn, VSpacer } from 'vuetify/lib/components'
import { mapActions } from 'vuex'

export default {
    components: {
        EditForm,
        TaskPreview,
        VSheet,
        VBtn,
        VIcon,  
        VCardActions,
        VCheckboxBtn, 
        VSpacer, 
        VCard,
        VTooltip
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
            confirmDialogVisible: false,
            taskItem: this.task,
            taskItemHistory: this.taskHistory,
            showPreview: false
        }
    },
    methods: {
        ...mapActions([
            'removeTaskById',
            'setTask',
            'setChanged'
        ]),
        clickConfirmBtn() {
            this.editingDialogVisible = false
            this.confirmDialogVisible = false
            this.taskItemHistory.title[1] = this.taskItem.title
            for (let i in this.taskItemHistory.body) {
                this.taskItemHistory.body[i].name[1] = this.taskItem.body[i].name
                this.taskItemHistory.body[i].done[1] = this.taskItem.body[i].done
            }
            this.setChanged(false)
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

.btns {
    position: absolute;
    top: 8px;
    right: 8px;
}
</style>