<!-- Компонент задачи -->

<template>
    <div class="task">
        <div>
            <div><strong>Название: </strong>{{ taskItem.title }}</div>
            <div><strong>Описание: </strong>
                <span v-for="(task, index) in taskItem.body" :key="index"><br/>{{ taskItem.body[index].name }}</span>
            </div>
        </div>
        <div class="post__btns">
            <my-button 
                style="margin-right: 15px"
                @click="showRemoveDialog"
            >
                Удалить
            </my-button>
            <my-button
                @click="showEditDialog"
            >
                Изменить
            </my-button>
            
            <my-dialog v-model:show="dialogRemoveVisible">
                <h3>Вы уверены, что хотите удалить задачу?</h3>
                <div class="btns">
                    <my-button 
                        @click="$emit('remove', task)"
                        style="margin-right: 15px; margin-bottom: 0;"
                    >
                        Удалить
                    </my-button>
                    <my-button 
                        @click="hideRemoveDialog"
                        style="margin-bottom: 0"
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
    </div>
</template>

<script>
import TaskEditing from '@/components/TaskEditing.vue';

export default {
    components: {
        TaskEditing
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
    }
}
</script>

<style>
.task {
    padding: 15px;
    border: 2px solid #0d47a1;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>