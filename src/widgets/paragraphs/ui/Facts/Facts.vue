<template>
    <FactsList :data="data" />
</template>

<script setup>
import FactsList from '~/entities/facts-block/FactsList.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
