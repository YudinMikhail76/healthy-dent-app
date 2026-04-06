<template>
    <div class="review-body">
        <component :is="steps[step]" @on-close="onClose" />
    </div>
</template>

<script setup>
import ReviewAuth from './ReviewAuth/ReviewAuth.vue'
import ReviewSelectDoctors from './ReviewDoctors/ReviewSelectDoctors.vue'
import ReviewForm from './ReviewForm/ReviewForm.vue'

import { useReviewModalStore } from '~/entities/modals/ui/ReviewModal/store/review-modal-store'

import { STEPS } from '../utils/variables'

const emit = defineEmits(['on-close'])

const reviewModalStore = useReviewModalStore()
const { step } = toRefs(reviewModalStore)

const steps = {
    [STEPS.SELECT_AUTH]: ReviewAuth,
    [STEPS.SELECT_DOCTORS]: ReviewSelectDoctors,
    [STEPS.REVIEW_FORM]: ReviewForm
}

const onClose = () => {
    emit('on-close')
}
</script>

<style lang="scss" scoped>
.review-body {
    height: calc(100dvh - 123px);
    padding: 20px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        height: 100%;
        padding: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
    }
}
</style>