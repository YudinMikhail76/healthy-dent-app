<template>
    <div
        :class="['time-item', { 'time-item--selected': selected }]"
        @click="onClick"
    >
        <div class="time-item__section">
            <div class="time-item__content time-item__content--secondary">
                {{ fromArr[0] }}
            </div>
            <div class="time-item__content">
                {{ fromArr[1] }}
            </div>
        </div>
        <CheckMark v-if="selected" class="time-item__icon" />
        <div class="time-item__section">
            <div class="time-item__content time-item__content--secondary">
                {{ toArr[0] }}
            </div>
            <div class="time-item__content">
                {{ toArr[1] }}
            </div>
        </div>
    </div>
</template>

<script setup>
import CheckMark from '~/shared/assets/icons/check-mark.svg'

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

const fromArr = computed(() => props.data.from.split(':'))
const toArr = computed(() => props.data.to.split(':'))

const onClick = () => emit('on-click', props.data)
</script>

<style scoped lang="scss">
.time-item {
    position: relative;
    width: 50px;
    height: 80px;
    cursor: pointer;
    background: $light;
    border-radius: 6px;

    @media (min-width: $tablet-breakpoint) {
        width: 80px;
        height: 96px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        height: 112px;
        background: rgba($light, .5);
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: 96px;
        height: 144px;
        border-radius: 12px;
    }

    @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
        &:hover {
            background: $light;

            .time-item__content--secondary {
                color: $dark-500;
            }
        }
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        display: block;
        width: 5px;
        height: 2px;
        background: $dark-100;

        @media (min-width: $tablet-breakpoint) {
            width: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 12px;
        }
    }

    &::before {
        left: 0;
    }

    &::after {
        right: 0;
    }

    &--selected {
        pointer-events: none;
        background: $primary-500;

        &::before,
        &::after {
            display: none;
        }

        .time-item__content {
            color: rgba($light, .5);

            &--secondary {
                color: $light;
            }
        }
    }

    &__section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        height: 50%;

        @media (min-width: $tablet-breakpoint) {
            gap: 4px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 14px;
        height: 14px;
        transform: translate(-50%, -50%);
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

    &__content {
        font-size: 14px;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }

        &--secondary {
            font-weight: 700;
            color: $dark-500;

            @media (min-width: $desktop-breakpoint) {
                color: $primary-300;
            }
        }
    }
}
</style>