<template>
    <ReviewsListSlider :data="data" />
</template>

<script setup>
import ReviewsListSlider from '~/entities/reviews/ui/ReviewsListSlider.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>