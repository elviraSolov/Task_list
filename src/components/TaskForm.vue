<!-- Форма для нового задания -->

<template>
    <v-form @submit.prevent>
        <v-text-field
            class="mb-2"
            label="Название*"
            v-model="this.task.title"
            :rules="[ fieldValidate ]"
            variant="outlined"
        />
        <div class="task-container"
            v-for="(item, index) in task.body"
            :key="index"
        >
            <v-text-field 
                class="mb-2"
                label="Задача"
                v-model="task.body[index].name"
                variant="outlined"
            />
        </div>
        <v-card-actions>
            <v-btn
                color="#14293e"
                variant="text"
                @click="hideDialog()"
            >
                Отмена
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
                color="success"
                variant="text"
                @click=" addTask(task); hideDialog()"
                :disabled="!this.isValid"
            >
                Создать
            </v-btn>
        </v-card-actions>
        
    </v-form>
</template>

<script>
import { VForm, VTextField, VBtn, VSpacer, VCardActions } from 'vuetify/lib/components';
import { mapActions } from 'vuex';

export default {
    components: {
        VForm,
        VTextField,
        VBtn,
        VSpacer, 
        VCardActions
    },
    data() {
        return {
            task: {
                title: '',
                body: []
            },
            isValid: false
        }
    },
    methods: {
        addTaskItem() {
            this.task.body.push ({name: '', done: false});
        },
        fieldValidate (value) {
            if (value.trim().length === 0) {
                this.isValid = false
                return "Это обязательное поле"
            } else {
                this.isValid = true
                return true
            }
        },
        hideDialog() {
            this.$emit('hideDialog')
        },
        ...mapActions ([
            'addTask'
        ])
    },
}
</script>

<style>
</style>