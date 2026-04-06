<template>
    <BeforeAfterItem :data="data" />
</template>

<script setup>
import BeforeAfterItem from '~/entities/before-after/BeforeAfterItem.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>