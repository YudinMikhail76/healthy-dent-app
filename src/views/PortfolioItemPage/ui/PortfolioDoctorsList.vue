<template>
    <DoctorsList
        :items="data?.items"
        :title="data?.title"
        class="portfolio-doctors-list"
    />
</template>

<script setup>
import DoctorsList from '~/entities/doctors/DoctorsList.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style scoped lang="scss">
.portfolio-doctors-list {
    margin: 0;
}
</style>