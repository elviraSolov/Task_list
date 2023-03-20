<template>
    <v-dialog
        class="p-3"
        persistent
        width="600"
    >      
        <v-card>
            <v-card-title>
                <slot name="title"></slot>
            </v-card-title>
            <v-card-actions class="close">
                <v-spacer/>
                <v-btn
                    variant="text"
                    @click="this.$emit('update:show', false)"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-actions>
            <v-card-text>
                <slot name="content"></slot>
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
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showDialog: this.show
        }
    },
    methods: {
        hideDialog() {
            this.showDialog = false
            //this.$emit('update:showDialog', false)
            //this.$emit('hideDialog')
        }
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