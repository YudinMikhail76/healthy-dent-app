<template>
    <div class="picker">
        <div class="picker__inner">
            <div class="picker__section">
                <div class="picker__title">
                    {{ $t('hotTimeModal.dayTitle') }}
                </div>
                <div class="picker__list">
                    <div
                        v-for="item in currentSchedule"
                        :key="item"
                        class="picker__item"
                    >
                        <DayItem
                            :data="item"
                            :selected="isDaySelected(item)"
                            @on-click="onDaySelect"
                        />
                    </div>
                </div>
                <div class="picker__row">
                    <AppButtonTypeIcon position="center" @click="handleBackClick">
                        <ArrowPrev class="hot-time-form__nav-icon" />
                    </AppButtonTypeIcon>
                    <div class="picker__label">
                        {{ monthLabel }}
                    </div>
                </div>
            </div>
            <template v-if="selectedDay">
                <div class="picker__divider" />
                <div class="picker__section">
                    <div class="picker__title">
                        {{ $t('hotTimeModal.timeTitle') }}
                    </div>
                    <div class="picker__list">
                        <div
                            v-for="item in selectedDay.time"
                            :key="item"
                            class="picker__item"
                        >
                            <TimeItem
                                :data="item"
                                :selected="isTimeSelected(item)"
                                @on-click="onTimeSelect"
                            />
                        </div>
                    </div>
                    <div class="picker__label">
                        {{ dayLabel }}
                    </div>
                </div>
            </template>
        </div>
        <div class="picker__bottom">
            <div class="picker__actions">
                <AppButton
                    full-width
                    :disabled="isBtnNextDisabled"
                    class="picker__btn"
                    @click="handleNextClick"
                >
                    {{ $t('hotTimeModal.nextBtn') }}
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import DayItem from './DayItem.vue'
import TimeItem from './TimeItem.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import { steps } from '../constants/index.js'
import { storeToRefs } from 'pinia'
import { capitalize } from '~/shared/utils/helpers'
import { useHotTimeModalStore } from '../store/store.js'
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import ArrowPrev from '~/shared/assets/icons/arrow-prev.svg'

const hotTimeModalStore = useHotTimeModalStore()
const {
    schedule,
    selectedService,
    selectedDay,
    selectedTime
} = storeToRefs(hotTimeModalStore)
const { locale, t } = useI18n()

const currentSchedule = computed(() => schedule.value[selectedService.value.tid])

const currentMonthLabel = computed(() => {
    const now = new Date()
    return capitalize(new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(now))
})
const monthLabel = computed(() => capitalize(selectedDay.value?.month_name || currentMonthLabel.value))
const dayLabel = computed(() => capitalize(selectedDay.value?.name || t('hotTimeModal.day')))
const isBtnNextDisabled = computed(() => !selectedTime.value || !selectedTime.value)

const isDaySelected = (item) => {
    return item.day === selectedDay.value?.day
        && item.short_name === selectedDay.value?.short_name
}
const isTimeSelected = (item) => {
    return selectedTime.value?.from === item.from
        && selectedTime.value?.to === item.to
}
const onDaySelect = (data) => {
    hotTimeModalStore.SELECT_DAY(data)
    hotTimeModalStore.SELECT_TIME(null)
}
const onTimeSelect = (data) => hotTimeModalStore.SELECT_TIME(data)
const handleBackClick = () => hotTimeModalStore.SELECT_STEP(steps.SERVICES)
const handleNextClick = () => hotTimeModalStore.SELECT_STEP(steps.FORM)

const selectCurrentDayIfAvailable = () => {
    const today = new Date()
    const todayDay = today.getDate()
    const todayMonth = new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(today).toLowerCase()
    const todayEntry = Object.values(currentSchedule?.value)?.find(
        (item) => item?.day === todayDay && item?.month_name.toLowerCase() === todayMonth
    )

    if (todayEntry) {
        hotTimeModalStore.SELECT_DAY(todayEntry)
    }
}

onMounted(() => {
    selectCurrentDayIfAvailable()
})
</script>

<style scoped lang="scss">
.picker {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        gap: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__inner {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-grow: 1;
            height: 100%;
        }
    }

    &__row {
        display: flex;
        gap: 20px;
    }

    &__section {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 80px;
            height: 100%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
            font-size: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin: 0;
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }

    &__list {
        display: flex;
        gap: 5px;
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 0;
        }
    }

    &__label {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__divider {
        height: 1px;
        margin: 20px 0;
        background: $dark-200;

        @media (min-width: $tablet-breakpoint) {
            margin: 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 1px;
            height: 100%;
            margin: 0 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin: 0 48px;
        }
    }

    &__bottom {
        display: flex;
        justify-content: flex-end;
        margin-top: auto;

        @media (min-width: $desktop-breakpoint) {
            width: 192px;
            flex-shrink: 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 288px;
        }
    }

    &__actions {
        width: 50%;
    }

    &__btn,
    &__btn:hover {
        @media (min-width: $desktop-breakpoint) {
            min-width: unset;
        }
    }

    &__back-btn {
        min-width: unset;
    }
}
</style>