<!-- Компонент формы для создания задания -->

<template>
    <v-form @submit.prevent>
        <v-text-field
            class="mb-2"
            label="Название*"
            v-model="task.title"
            :rules="[ fieldValidate ]"
        />
        <div class="task-container"
            v-for="(item, index) in task.body"
            :key="index"
        >
            <v-text-field 
                class="mb-2"
                label="Задача"
                v-model="task.body[index].name"
            />
        </div>
        <v-card-actions>
            <v-btn
                color="#14293e"
                variant="text"
                @click="hideDialog"
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
                color="#14293e"
                variant="text"
                @click="createTask"
                :disabled="!this.isValid"
            >
                Создать
            </v-btn>
        </v-card-actions>
        
    </v-form>
</template>

<script>
import { VForm, VTextField, VBtn, VSpacer, VCardActions } from 'vuetify/lib/components';

export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
    },
    components: {
        VForm,
        VTextField,
        VBtn,
        VSpacer, VCardActions
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
        createTask() {
            this.task.id = Date.now();
            this.$emit('create', this.task)
            this.task = {
                title: '',
                body: []
            }
            this.$emit('hideDialog')
        },
        addTaskItem() {
            this.task.body.push ({});
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
        }
    },
}
</script>

<style>
</style>