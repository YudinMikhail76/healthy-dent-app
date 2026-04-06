<template>
    <div class="review-doctors">
        <div class="review-doctors__inner">
            <div class="review-doctors__heading">
                <div class="review-doctors__text">
                    {{ $t('reviewModal.getTreatment') }}
                </div>
                <div class="review-doctors__count">
                    <span>[</span>
                    {{ doctorsCount }}
                    <span>]</span>
                </div>
            </div>
            <div v-if="isMobileSize" class="review-doctors__list">
                <ReviewDoctorItem
                    v-for="doctor in dataForNewReview.doctors_nids"
                    :key="doctor.nid"
                    :data="doctor"
                    class="review-doctors__item"
                    @on-click="onDoctorClick"
                />
            </div>
            <div v-else class="review-doctors__swiper">
                <ReviewDoctorsSwiper :data="dataForNewReview.doctors_nids" @on-click="onDoctorClick" />
            </div>
        </div>
        <div class="review-doctors__button">
            <div class="review-doctors__button-wrapper">
                <AppButton full-width @on-click="onNext">
                    {{ $t('reviewModal.next') }}
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import ReviewDoctorItem from './ReviewDoctorItem.vue'
import ReviewDoctorsSwiper from './ReviewDoctorsSwiper.vue'

import { useReviewModalStore } from '~/entities/modals/ui/ReviewModal/store/review-modal-store'
import { useBreakPoints } from '~/shared/composables/useBreakpoints'
import { STEPS } from '~/entities/modals/ui/ReviewModal/utils/variables'

const reviewModalStore = useReviewModalStore()
const { dataForNewReview, selectDoctors } = toRefs(reviewModalStore)
const { isMobileSize } = useBreakPoints()

const doctorsCount = computed(() => dataForNewReview.value.doctors_nids.length)

const onDoctorClick = (doctor) => {
    const isDoctor = selectDoctors.value.some((item) => item.nid === doctor.nid)

    if (isDoctor) {
        reviewModalStore.SET_DOCTORS(selectDoctors.value.filter((item) => item.nid !== doctor.nid))

        return
    }

    reviewModalStore.SET_DOCTORS([...selectDoctors.value, doctor])
}

const onNext = () => {
    reviewModalStore.SET_STEP(STEPS.REVIEW_FORM)
}
</script>

<style lang="scss" scoped>
.review-doctors {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        justify-content: space-between;
        gap: 64px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 96px;
    }

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: calc(100% - 60px);

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            height: calc(100% - 90px);
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            width: 864px;
            height: fit-content;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            width: 1248px;
        }
    }

    &__heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }

    &__text {
        font-size: 16px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }

    &__count {
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;

        span {
            color: $primary-500;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        scrollbar-width: none;
    }

    &__item {
        width: 50%;
    }

    &__button {
        display: flex;
        justify-content: end;

        @media (min-width: $desktop-breakpoint) {
            align-items: flex-end;
            width: 192px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 288px;
        }
    }

    &__button-wrapper {
        width: 50%;

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
        }
    }

    &__swiper {
        overflow: hidden;
    }
}
</style>