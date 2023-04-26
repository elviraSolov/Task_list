<template>
    <div>
        <!-- Название задания -->
        <v-text-field 
            label="Название*"
            variant="underlined"
            v-model="taskItemHistory.title[1]"
            :rules="[ requiredTaskName ]"
            @input="setChanged(true)"
        />

        <!-- Список задач -->
        <v-list>
            <!-- Каждая задача состоит из чекбокса, названия и кнопки удалить -->
            <v-list-item
                v-for="(item, index) in taskItemHistory.body"
                :key="item"
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
                        @click="clickDeleteBtn(index)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>

                    <!-- Подтверждение удаления -->
                    <app-dialog
                        v-model="removingDialogVisible"
                        @close="removingDialogVisible = false"
                    >
                        <template #title>
                            Вы уверены, что хотите удалить задачу?
                        </template>
                        <template v-slot>
                            <v-card-actions>
                                <v-btn @click="clickConfirmDeleteBtn(this.task.id)">
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
    </div>
    
    
</template>

<script>
import { requiredTaskNameMixin } from '@/mixins/RequiredTaskNameMixin'
import { mapActions } from 'vuex'
import { VSpacer, VTextField, VCheckboxBtn, VList, VListItem, VBtn, VIcon, VCardActions } from 'vuetify/lib/components'

export default {
    mixins: [requiredTaskNameMixin],
    components: {
        VSpacer, 
        VTextField, 
        VCheckboxBtn, 
        VList, 
        VListItem, 
        VBtn, 
        VIcon, 
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
            taskItemHistory: this.taskHistory,
            removingDialogVisible: false,
            removingItemIndex: null,
            isSaved: false
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
            'removeTaskItem',
            'setTask',
            'setChanged'
        ]),
        clickDeleteBtn(itemId) {
            this.removingDialogVisible = true
            this.removingItemIndex = itemId
        },
        clickConfirmDeleteBtn(taskId) {
            this.setTask(taskId)
            this.removeTaskItem(this.removingItemIndex)
            this.removingDialogVisible = false
            this.setChanged(true)
            this.isSaved = false
        }
    }
}
</script>