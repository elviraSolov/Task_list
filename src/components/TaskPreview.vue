<!-- Предпросмотр задания -->

<template>
     <div>
        <v-card-item>
            <v-card-title>{{ taskItem.title }}</v-card-title>
            <v-card-subtitle>Предпросмотр</v-card-subtitle>
        </v-card-item>
        <v-card-text>
            <div
                class="d-flex align-center mb-3"
                v-for="(item, index) in taskItem.body" 
                :key="index"
            >
                <v-checkbox-btn
                    v-model="taskItem.body[index].done"
                    id="task{{ index }}" 
                    class="mr-3"
                    disabled
                />
                <span>
                    {{ taskItem.body[index].name }} <br/>
                </span>
            </div>
        </v-card-text>
    </div>
</template>

<script>
import { VCardTitle, VCardSubtitle, VCardItem, VCardText, VCheckboxBtn } from 'vuetify/lib/components'

export default {
    components: { 
        VCardTitle, 
        VCardSubtitle, 
        VCardItem,
        VCardText, 
        VCheckboxBtn
    },
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            taskItem: this.task
        }
    }
}
</script>

<style scoped>

</style>
