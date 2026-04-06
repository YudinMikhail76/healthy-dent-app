<template>
    <div class="review-doctor" @click="onClick">
        <div class="review-doctor__img">
            <AppImage
                :urls="data.picture.urls"
                :alt="data.picture.alt"
                :title="data.picture.title"
            />
            <div v-if="isActive" class="review-doctor__active">
                <SelectDoctor />
            </div>
        </div>
        <div class="review-doctor__name">
            {{ data.title }}
        </div>
        <div class="review-doctor__desc">
            {{ data.description }}
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'
import SelectDoctor from '~/shared/assets/icons/select-doctor.svg'

import { useReviewModalStore } from '~/entities/modals/ui/ReviewModal/store/review-modal-store'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const reviewModalStore = useReviewModalStore()
const { newReview } = toRefs(reviewModalStore)

const isActive = computed(() => newReview.value.doctors_nids.includes(props.data.nid))
const emit = defineEmits(['on-click'])

const onClick = () => {
    emit('on-click', props.data)
}
</script>

<style lang="scss" scoped>
.review-doctor {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 146px;
    padding: 15px;
    background-color: $light;
    border: 3px solid $secondary-100;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        height: 186px;
        padding: 20px;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        width: 262px;
        height: 236px;
        padding: 25px;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: 384px;
        height: 273px;
        padding: 32px;
        border-radius: 30px;
    }

    @media (any-hover: hover) {
        cursor: pointer;

        &:hover {
            .review-doctor__desc {
                position: relative;
                height: auto;
                visibility: visible;
                opacity: 1;
            }
        }
    }

    &__img {
        position: relative;
        width: 48px;
        height: 48px;
        overflow: hidden;
        border-radius: 50%;

        @media (min-width: $tablet-breakpoint) {
            width: 56px;
            height: 56px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 72px;
            height: 72px;
        }
    }

    &__active {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    &__name {
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }
    }

    &__desc {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            @include text-line-overflowed-multiple(2);

            position: absolute;
            height: 0;
            overflow: hidden;
            font-size: 14px;
            font-weight: 400;
            line-height: 140%;
            color: $primary-300;
            text-align: right;
            visibility: hidden;
            opacity: 0;
            transition: all .3s;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 16px;
        }
    }
}
</style>