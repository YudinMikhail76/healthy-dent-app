<template>
    <div :class="classes">
        <div 
            :class="[
                'accordion-item__heading', 
                { 'accordion-item__heading--opened': isOpen }
            ]" 
            @click="handleToggle"
        >
            <div class="accordion-item__title">
                <slot name="title" />
            </div>
            <div class="accordion-item__icon">
                <CheveronBottom />
            </div>
        </div>
        <div class="accordion-item__content">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CheveronBottom from '@/shared/assets/icons/chevron-bottom-2.svg'

const props = defineProps({
    isInitialOpen: {
        type: Boolean,
        required: false
    },
    color: {
        type: String,
        required: true,
        validator: (value) => ['light', 'primary', 'dark'].includes(value)
    }
})

const isOpen = ref(false)
const classes = computed(() => [
    'accordion-item',
    { 'accordion-item--open': isOpen.value },
    `accordion-item--${ props.color }`
])

const handleToggle = () => isOpen.value = !isOpen.value
const init = () => isOpen.value = props.isInitialOpen

init()
</script>

<style scoped lang="scss">
.accordion-item {
    &--light {
        @media (any-hover: hover) {
            &:hover {
                .accordion-item__title {
                    color: $light;
                }

                svg {
                    stroke: $light !important;
                }
            }
        }

        .accordion-item__title {
            color: $secondary-100;
            transition: color $base-ui-transition;
        }

        .accordion-item__icon svg {
            stroke: $light;

            @media (min-width: $desktop-breakpoint) {
                stroke: $dark-200;
            }
        }
    }

    &--dark {
        @media (any-hover: hover) {
            &:hover {
                .accordion-item__title {
                    color: $dark-500;
                }

                svg {
                    stroke: $dark-500 !important;
                }
            }
        }

        .accordion-item__title {
            color: $dark-500;
            transition: color $base-ui-transition;
        }

        .accordion-item__icon svg {
            stroke: $dark-500;

            @media (min-width: $desktop-breakpoint) {
                stroke: $dark-200;
            }
        }
    }

    &:not(:last-child) {
        .accordion-item__heading {
            margin-bottom: 5px;

            @media (min-width: $desktop-breakpoint) {
                margin-bottom: 10px;
            }

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: $light;
                opacity: .25;
            }
        }
    }

    &--open {
        .accordion-item__content {
            max-height: 1000px;
            visibility: visible;
            opacity: 1;
            transition: .3s;
        }
    }

    &__heading {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-height: 37px;
        padding-bottom: 5px;
        cursor: pointer;

        &--opened {
            .accordion-item__icon {
                transform: rotate(180deg);
            }

            &::after {
                visibility: hidden;
                opacity: 0;
            }
        }
    }

    &__title {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        transition: $base-ui-transition;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        transition: transform $base-ui-transition;

        svg {
            width: 20px;
            height: 20px;
            transition: $base-ui-transition;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 40px;
            height: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 48px;
            height: 48px;
        }
    }

    &__content {
        max-height: 0;
        overflow: hidden;
        visibility: hidden;
        opacity: 0;
        transition: $base-ui-transition;
    }
}
</style>
