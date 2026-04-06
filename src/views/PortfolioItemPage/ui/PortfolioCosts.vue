<template>
    <ParametersList :data="data" />
</template>

<script setup>
import ParametersList from '~/entities/parameters/ParametersList.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>