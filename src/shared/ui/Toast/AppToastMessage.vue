<template>
    <div :class="['toast-message', `toast-message--${ variant }`]">
        <div class="toast-message__body">
            <ToastSuccessIcon v-if="variant === TOAST_VARIANTS.SUCCESS" class="toast-message__icon" />
            <ToastErrorIcon v-else class="toast-message__icon" />
            <div class="toast-message__content">
                <div class="toast-message__title">
                    {{ title }}
                </div>
                <div class="toast-message__description">
                    {{ description }}
                </div>
            </div>
        </div>
        <AppButtonTypeIcon @click="handleCloseClick">
            <CloseIcon />
        </AppButtonTypeIcon>
    </div>
</template>

<script setup>
import AppButtonTypeIcon from '../Buttons/AppButtonTypeIcon.vue'

import ToastSuccessIcon from '~/shared/assets/icons/toast-success.svg'
import ToastErrorIcon from '~/shared/assets/icons/toast-error.svg'
import CloseIcon from '~/shared/assets/icons/close.svg'
import { TOAST_VARIANTS } from './constants'

let timeout = null
const aliveTime = 3000

const emit = defineEmits(['close'])

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    variant: {
        type: String,
        default: TOAST_VARIANTS.SUCCESS,
        validator: (value) => [TOAST_VARIANTS.ERROR, TOAST_VARIANTS.SUCCESS].includes(value)
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const resetTimeout = () => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
}

const handleCloseClick = () => {
    emit('close', props.id)
    resetTimeout()
}

onMounted(() => {
    timeout = setTimeout(() => {
        emit('close', props.id)
        resetTimeout()
    }, aliveTime)
})
</script>

<style lang="scss" scoped>
.toast-message {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 15px;
    background: $light;
    border-radius: 7px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

    @media (min-width: $tablet-breakpoint) {
        gap: 20px;
        min-width: 640px;
        padding: 20px;
        border-radius: 10px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 25px;
        padding: 25px;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 32px;
        min-width: 960px;
        padding: 32px;
        border-radius: 15px;
    }

    &--success {
        .toast-message__title {
            color: $success;
        }
    }

    &--error {
        .toast-message__title {
            color: $error;
        }
    }
    
    &__icon {
        width: 32px;
        height: 32px;

        @media (min-width: $desktop-breakpoint) {
            width: 40px;
            height: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 48px;
            height: 48px;
        }
    }
    
    &__body {
        display: flex;
        gap: 15px;

        @media (min-width: $tablet-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 32px;
        }
    }

    &__title {
        margin-bottom: 8px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 12px;
            font-size: 22px;
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 14px;
            font-size: 24px;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 16px;
            font-size: 32px;
            border-radius: 15px;
        }
    }

    &__description {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
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
    }
}
</style>