<template>
    <v-dialog
        class="p-3"  
        width="600"
    >      
        <v-card>
            <v-card-title class="mr-10">
                <slot name="title"></slot>
            </v-card-title>
            <v-card-actions class="close">
                <v-spacer/>
                <v-btn
                    variant="text"
                    @click="$emit('close')"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-actions>
            <v-card-text>
                <slot></slot>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<script>
import { VDialog, VCard, VCardText, VCardTitle, VCardActions, VIcon, VBtn, VSpacer } from 'vuetify/lib/components';

export default {
    name: 'app-dialog',
    components: {
        VDialog,  
        VCard, 
        VCardText,
        VCardTitle,
        VCardActions,
        VIcon,
        VBtn,
        VSpacer
    }
}
</script>

<style scoped>
.close {
    position: absolute;
    top: 0;
    right: 0;
}
</style>