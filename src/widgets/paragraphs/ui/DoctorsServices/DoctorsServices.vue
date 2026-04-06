<template>
    <DoctorsList :items="data?.items" :title="data?.title" />
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