<template>
    <div class="hot-time-info">
        <div class="hot-time-info__title">
            {{ $t('hotTimeModal.waitingLabel') }}
        </div>
        <div class="hot-time-info__content">
            <div class="hot-time-info__item">
                {{ selectedDay.day }} {{ selectedDay.month_name_extra }}
            </div>
            <div class="hot-time-info__item">
                {{ selectedTime.from }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useHotTimeModalStore } from '../store/store.js'

const { selectedDay, selectedTime } = storeToRefs(useHotTimeModalStore())
</script>

<style scoped lang="scss">
.hot-time-info {
    &__title {
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }
    }

    &__content {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;

        @media (min-width: $tablet-breakpoint) {
            margin-top: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-top: 10px;
        }
    }

    &__item {
        font-size: 14px;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }
    }
}
</style>