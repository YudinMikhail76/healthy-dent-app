<template>
    <CaseCategoriesList :data="data" />
</template>

<script setup>
import CaseCategoriesList from '~/entities/case-categories/CaseCategoriesList.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
