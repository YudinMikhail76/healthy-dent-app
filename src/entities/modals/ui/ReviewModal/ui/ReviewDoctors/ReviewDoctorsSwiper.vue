<template>
    <div class="review-doctors-list">
        <AppSlider v-bind="options">
            <template #slide="{ item }">
                <ReviewDoctorItem :data="item" @on-click="onClick" />
            </template>
        </AppSlider>
    </div>
</template>

<script setup>
import AppSlider from '~/shared/ui/AppSlider/AppSlider.vue'
import ReviewDoctorItem from './ReviewDoctorItem.vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(['on-click'])

const options = computed(() => {
    return {
        data: props.data,
        sliderClass: 'doctors-modal-slider',
        scrollBarClass: 'doctors__scrollbar',
        overflowHidden: true,
        breakpoints: {
            320: {
                spaceBetween: '0'
            }
        }
    }
})

const onClick = (doctor) => emit('on-click', doctor)
</script>

<style lang="scss" scoped>
.review-doctors-list {
    :deep(.slider__scrollbar) {
        width: 100%;
    }
}
</style>