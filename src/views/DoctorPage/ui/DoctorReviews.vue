<template>
    <ReviewsListSlider :data="data" class="doctor-reviews" />
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

<style scoped lang="scss">
.doctor-reviews {
    margin: 0;
}
</style>