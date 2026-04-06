<template>
    <div class="hot-time-body">
        <HotTimeServices v-if="step === steps.SERVICES" />
        <HotTimePicker v-else-if="step === steps.DATE_TIME_PICKER" />
        <HotTimeForm v-else-if="step === steps.FORM" />
    </div>
</template>

<script setup>
import HotTimeServices from './HotTimeServices.vue'
import HotTimePicker from './HotTimePicker.vue'
import HotTimeForm from './HotTimeForm.vue'
import { steps } from '../constants/index.js'

import { storeToRefs } from 'pinia'
import { useHotTimeModalStore } from '../store/store.js'

const { step } = storeToRefs(useHotTimeModalStore())
</script>

<style scoped lang="scss">
.hot-time-body {
    height: 100%;
    padding: 20px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
    }
}
</style>