<template>
    <input 
        class="input" 
        type="text"
        :value="modelValue"
        @input="updateInput"
        required
    />
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style>
.input {
    width: 100%;
    border: 1px solid #0d47a1;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>