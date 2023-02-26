<!-- Компонент формы редактирования задания -->

<template>
    <form @submit.prevent>
        <h3>Редактирование задания №{{ taskItem.id }}</h3>
        <my-input 
            :value="taskItem.title"
            @change="changeInputTitle"
            placeholder="Название"
        />

        <div class="task-container"
            v-for="(item, index) in taskItem.body"
            :key="index"    
        >
            <div class="checkbox-container">
                <input 
                    class="checkbox" 
                    type="checkbox" 
                    id="task{{ index }}" 
                    :checked="taskItem.body[index].done"
                    @input="changeResult(index)"
                />
                <label for="task{{ index }}">
                    <my-input 
                        :value="taskItem.body[index].name"
                        @change="changeInputBody($event, index)"
                        placeholder="Задача"
                    />
                </label>
                <my-button
                    @click="removeTask(index)"
                >
                    Удалить задачу
                </my-button>
            </div>
        </div>

        <div class="btns">
            <my-button 
                style="margin-right: 15px; margin-bottom: 0;"
                @click="$emit('hideDialog')"
            >
                Сохранить
            </my-button>
            <my-button 
                @click="$emit('hideDialog')"
                style="margin-bottom: 0;"
            >
                Отмена
            </my-button>
        </div>
    </form>
</template>

<script>
export default {
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
        },
        removeTask(index) {
            this.taskItem.body.splice(index, 1)
        }
    }
}
</script>

<style>
.checkbox-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.checkbox {
    position: absolute;
    top: 50%;
    left: -15px;
}
</style>