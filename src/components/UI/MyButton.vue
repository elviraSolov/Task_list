<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
.btn {
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 10px 15px;
    background: none;
    color: #0d47a1;
    border: 1px solid #0d47a1;
}
</style>