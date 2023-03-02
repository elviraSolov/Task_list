<template>
    <v-btn class="btn">
        <slot></slot>
    </v-btn>
</template>

<script>
import { VBtn } from 'vuetify/lib/components';

export default {
    components: {
        VBtn
    },
    name: 'my-button'
}
</script>

<style>
.btn {
    margin-bottom: 15px;
}
</style>