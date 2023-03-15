<!-- Компонент формы редактирования задания -->

<template>
    <v-form @submit.prevent>
        <h3 class="mb-3">Редактирование задания</h3>
        <v-text-field 
            label="Название"
            v-model="taskItem.title"
            @change="changeInputTitle"
        />
        <v-list>
            <v-btn @click="addTaskItem">Добавить задачу</v-btn>
            <v-list-subheader>Задачи</v-list-subheader>
            <v-list-item
                v-for="(item, index) in taskItem.body"
                :key="index"
                class="pa-0"
            >
                <div class="d-flex flex-row align-center mb-3">
                    <v-checkbox-btn
                        v-model="taskItem.body[index].done"
                        id="task{{ index }}" 
                        class="mr-3"
                        color="#d9b28a"
                        @click="changeResult(index)"
                    />
                    <v-text-field class="pr-2 mt-4"
                        v-model="taskItem.body[index].name"
                        @change="changeInputBody($event, index)"
                        label="Задача"
                    />
                    <v-btn icon  size="small" @click="showRemoveDialog(index)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
            </v-list-item>
        </v-list>

        <div class="btns d-flex justify-space-between">
            <v-btn 
                color="#14293e"
                variant="text"
                @click="$emit('hideDialog')"
            >
                Отмена
            </v-btn>
            <v-btn 
                color="#14293e"
                variant="text"
                @click="$emit('hideDialog')"
            >
                Сохранить
            </v-btn>
        </div>

        <my-dialog v-model:show="dialogRemoveVisible">
            <h3 class="mb-3">Вы уверены, что хотите удалить задание?</h3>
            <div class="btns d-flex flex-row">
                <v-btn 
                    color="#14293e"
                    variant="text"
                    class="mb-3"
                    @click="removeTask()"
                >
                    Удалить
                </v-btn>
                <v-btn 
                    color="#14293e"
                    variant="text"
                    click="hideRemoveDialog"
                >
                    Отмена
                </v-btn>
            </div>
        </my-dialog>
    </v-form>
</template>

<script>
import { VForm, VTextField, VCheckboxBtn,
    VList, VListSubheader, VListItem, VBtn, VIcon } from 'vuetify/lib/components';

export default {
    components: {
        VForm, VTextField, VCheckboxBtn,
        VList, VListSubheader, VListItem, VBtn, VIcon
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
            taskItem: this.task,
            removingItemIndex: 0
        }
    },
    methods: {
        showRemoveDialog(index) {
            this.dialogRemoveVisible = true;
            this.removingItemIndex = index
        },
        hideRemoveDialog() {
            this.dialogRemoveVisible = false;
        },
        changeInputTitle(event) {
            this.taskItem.title = event.target.value;
            this.$emit("update:title", this.taskItem.title)
        },
        changeInputBody(event, index) {
            this.taskItem.body[index].name = event.target.value;
            this.$emit("update:body", this.taskItem.body[index].name)
        },
        changeResult(index) {
            this.taskItem.body[index].done = !this.taskItem.body[index].done;
            console.log(this.taskItem.body[index].done)
        },
        removeTask() {
            this.taskItem.body.splice(this.removingItemIndex, 1)
            this.dialogRemoveVisible = false;
        },
        addTaskItem() {
            this.taskItem.body.push ({});
        }
    }
}
</script>

<style>
</style>