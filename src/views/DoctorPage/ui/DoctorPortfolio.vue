<template>
    <CaseCategoriesList :data="data" class="doctor-portfolio" />
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

<style scoped lang="scss">
.doctor-portfolio {
    margin: 0;
}
</style>