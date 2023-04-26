<!-- Форма для нового задания -->

<template>
    <v-form @submit.prevent>
        <!-- Название задания -->
        <v-text-field
            class="mb-2"
            label="Название*"
            v-model="this.task.title"
            :rules="[ requiredTaskName ]"
            variant="outlined"
        />

        <!-- Список задач -->
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
                variant="text"
                @click="$emit('hideDialog')"
            >
                Отмена
            </v-btn>
            <v-spacer/>
            <v-btn
                variant="text"
                @click="addTaskItem"
            >
                Добавить задачу
            </v-btn>
            <v-btn
                color="success"
                variant="text"
                :disabled="!this.isValid"
                @click="
                    addTask(task); 
                    $emit('hideDialog')"
            >
                Создать
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
import { VForm, VTextField, VBtn, VSpacer, VCardActions } from 'vuetify/lib/components';
import { mapActions } from 'vuex';
import { requiredTaskNameMixin } from '@/mixins/RequiredTaskNameMixin.js';

export default {
    mixins: [requiredTaskNameMixin],
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
            }
        }
    },
    computed: {
        isValid() {
            if (this.task.title.trim().length === 0) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        addTaskItem() {
            this.task.body.push ({name: '', done: false})
        },
        emits: ['hideDialog'],
        ...mapActions ([
            'addTask'
        ])
    }
}
</script>
