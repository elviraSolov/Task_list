<!-- Компонент формы для создания задания -->

<template>
    <v-form @submit.prevent>
        <h3 class="mb-3">Создание задания</h3>
        <v-text-field
            v-model="task.title"
            label="Название"
        />
        <div class="task-container"
            v-for="(item, index) in task.body"
            :key="index"
        >
            <v-text-field 
                v-model="task.body[index].name"
                label='Задача'
            />
        </div>
        <my-button
            @click="addTaskItem"
        >
            Добавить задачу
        </my-button>
        <my-button 
            style="margin-bottom: 0;" 
            @click="createTask"
        >
            Создать
        </my-button>
    </v-form>
</template>

<script>
import { VForm, VTextField } from 'vuetify/lib/components';

export default {
    components: {
        VForm,
        VTextField
    },
    data() {
        return {
            task: {
                title: '',
                body: []
            }
        }
    }, 
    methods: {
        createTask() {
            this.task.id = Date.now();
            this.$emit('create', this.task)
            this.task = {
                title: '',
                body: []
            }
        },
        addTaskItem() {
            this.task.body.push ({});
        },
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>