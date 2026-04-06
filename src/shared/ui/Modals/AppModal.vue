<template>
    <div class="modal">
        <div
            data-bg
            class="modal__bg"
            @click.stop="onClose"
        />
        <div
            data-content
            :class="classesInner"
            @click="onClose"
        >
            <div class="modal__wrapper">
                <div v-if="slots.dots" class="modal__dots">
                    <slot name="dots" />
                </div>
                <div class="modal__heading" @click="(event) => event.stopPropagation()">
                    <div class="modal__heading-block">
                        <div v-if="slots.option" class="modal__heading-option">
                            <slot name="option" />
                        </div>
                        <div class="modal__heading-title">
                            <slot name="title" />
                        </div>
                    </div>
                    <div class="modal__close">
                        <AppButtonTypeIcon @click="onClose">
                            <CloseIcon />
                        </AppButtonTypeIcon>
                    </div>
                </div>
                <div class="modal__body" @click="(event) => event.stopPropagation()">
                    <slot name="body" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import CloseIcon from '@/shared/assets/icons/close.svg'

const emit = defineEmits(['on-close'])
const slots = useSlots()
const onClose = () => emit('on-close')

const props = defineProps({
    background: {
        type: String,
        required: false,
        default: '#FFF'
    },
    size: {
        type: String,
        required: false,
        default: 'default',
        validator: (value) => ['default', 'middle', 'large', 'fit-screen'].includes(value)
    }
})

const classesInner = computed(() => [
    'modal__inner',
    `modal__inner--${ props.size }`
])
</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &__bg {
        position: fixed;
        inset: 0;
        background-color: rgba($primary-350, .7);
    }

    &__inner {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &--default {
            width: 100%;

            @media (min-width: $tablet-breakpoint) {
                width: 660px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 960px;
            }
        }

        &--middle {
            @media (min-width: $desktop-breakpoint) {
                width: 768px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 1152px;
            }
        }

        &--large {
            @media (min-width: $desktop-breakpoint) {
                width: 1200px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 1728px;
            }
        }

        &--fit-screen {
            width: 100%;
            padding: 20px;

            @media (min-width: $tablet-breakpoint) {
                padding: 30px;
            }

            @media (min-width: $desktop-breakpoint) {
                padding: 40px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                padding: 96px;
            }

            .modal__body {
                flex-grow: 1;
            }

            .modal__wrapper {
                display: flex;
                flex-direction: column;
                height: 100%;

                @media (min-width: $desktop-breakpoint) {
                    height: auto;
                }
            }
        }
    }

    &__wrapper {
        position: relative;
        width: 100%;
        height: fit-content;
        background: v-bind(background);
        border-radius: 15px;
    }

    &__dots {
        position: absolute;
        bottom: 100%;
        left: 50%;
        display: flex;
        align-items: center;
        height: 20px;
        transform: translateX(-50%);

        @media (min-width: $tablet-breakpoint) {
            height: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 96px;
        }
    }

    &__heading {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px;
        }
    }

    &__heading-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__heading-block {
        display: flex;
        flex-direction: column;
        gap: 6px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }

    &__heading-option {
        font-size: 14px;
        font-weight: 700;
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

    &__body {
        max-height: 100%;
        overflow-y: auto;
    }
}
</style>