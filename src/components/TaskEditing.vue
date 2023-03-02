<!-- Компонент формы редактирования задания -->

<template>
    <v-form @submit.prevent>
        <h3 class="mb-3">Редактирование задания №{{ taskItem.id }}</h3>
        <v-text-field 
            label="Название"
            v-model="taskItem.title"
            @change="changeInputTitle"
        />
        <v-list>
            <my-button @click="addTaskItem">Добавить задачу</my-button>
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
                        color="indigo"
                        @click="changeResult(index)"
                    />
                    <v-text-field class="pr-2 mt-4"
                        v-model="taskItem.body[index].name"
                        @change="changeInputBody($event, index)"
                        label="Задача"
                        
                    />
                    <my-button
                        @click="removeTask(index)"
                    >
                        Удалить
                    </my-button>
                </div>
            </v-list-item>
        </v-list>

        <div class="btns d-flex justify-space-between">
            <my-button 
                @click="$emit('hideDialog')"
                style="margin-bottom: 0;"
            >
                Отмена
            </my-button>
            <my-button 
                style="margin-bottom: 0;"
                @click="$emit('hideDialog')"
            >
                Сохранить
            </my-button>
        </div>
    </v-form>
</template>

<script>
import { VForm, VTextField, VCheckboxBtn,
    VList, VListSubheader, VListItem } from 'vuetify/lib/components';

export default {
    components: {
        VForm, VTextField, VCheckboxBtn,
        VList, VListSubheader, VListItem
    },
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialogDeleteVisible: false,
            dialogChangeVisible: false,
            taskItem: this.task
        }
    },
    methods: {
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
        removeTask(index) {
            this.taskItem.body.splice(index, 1)
        },
        addTaskItem() {
            this.taskItem.body.push ({});
        },
    }
}
</script>

<style>
</style>