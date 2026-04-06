<template>
    <div class="doctor-education">
        <AppDynamicBlockContainer>
            <template #heading>
                {{ $t('doctor.education') }}
            </template>
            <template #content>
                <div class="doctor-education__list">
                    <DoctorEducationItem
                        v-for="item, index in data"
                        :key="index"
                        :data="item"
                    />
                </div>
            </template>
        </AppDynamicBlockContainer>
    </div>
</template>

<script setup>
import AppDynamicBlockContainer from '~/shared/ui/Containers/AppDynamicBlockContainer.vue'
import DoctorEducationItem from './ui/DoctorEducationItem.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
