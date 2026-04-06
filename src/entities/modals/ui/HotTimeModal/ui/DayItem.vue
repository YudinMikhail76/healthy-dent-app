<template>
    <div
        :class="['day-item', { 'day-item--selected': selected }]"
        @click="onClick"
    >
        <div class="day-item__label">
            {{ capitalize(data.name) }}
        </div>
        <CheckMark v-if="selected" class="day-item__icon" />
        <div class="day-item__date">
            {{ data.day }} / {{ monthNumber }}
        </div>
    </div>
</template>

<script setup>
import CheckMark from '~/shared/assets/icons/check-mark.svg'
import { monthKeys } from '~/shared/constants/date'
import { capitalize, getNumberWithPrefixZero } from '~/shared/utils/helpers.js'

const emit = defineEmits(['on-click'])
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    }
})

const monthNumber = computed(() => getNumberWithPrefixZero(monthKeys[props.data.month_name]))

const onClick = () => emit('on-click', props.data)
</script>

<style scoped lang="scss">
.day-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: auto;
    height: 96px;
    padding: 8px;
    cursor: pointer;
    background: $light;
    border-radius: 8px;

    @media (min-width: $desktop-breakpoint) {
        width: auto;
        min-width: 100px;
        height: 112px;
        padding: 10px;
        background: rgba($light, .5);
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: auto;
        height: 144px;
        padding: 12px;
        border-radius: 12px;
    }

    @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
        &:hover {
            background: $light;

            .day-item__date {
                color: $dark-500;
            }
        }
    }

    &--selected {
        pointer-events: none;
        background: $primary-500;

        .day-item__date,
        .day-item__label {
            color: $light;
        }
    }

    &__label,
    &__date {
        font-size: 14px;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
            color: $primary-300;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__date {
        font-weight: 700;
        text-align: right;
    }

    &__icon {
        width: 14px;
        height: 14px;
        margin-inline: auto;
        stroke: $light;

        @media (min-width: $tablet-breakpoint) {
            width: 16px;
            height: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 18px;
            height: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 20px;
            height: 20px;
        }
    }
}
</style>