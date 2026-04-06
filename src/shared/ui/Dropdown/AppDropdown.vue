<template>
    <div :class="['dropdown', `dropdown--${ position }`, { 'dropdown--swap-on-mobile': swapOnMobile }]">
        <div
            :class="dropdownClasses"
            tabindex="0"
            @click="onClick"
            @blur="onBlurClick"
        >
            <div class="dropdown__title">
                {{ label }}

                <span v-if="selectedCount" class="dropdown__selected-count">
                    {{ selectedCount }}
                </span>
            </div>
            <span class="dropdown__icon-container">
                <slot name="heading-icon" />
            </span>
        </div>
        <div :class="['dropdown__list', { 'dropdown__list--active': isOpened }]">
            <slot name="list" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    selectedCount: {
        type: Number,
        required: false,
        default: 0
    },
    label: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: false,
        default: 'right',
        validator: (value) => ['right', 'left', 'center'].includes(value)
    },
    swapOnMobile: {
        type: Boolean,
        required: false
    },
    isRowReverse: {
        type: Boolean,
        required: false
    }
})

const isOpened = ref(false)

const dropdownClasses = computed(() => [
    'dropdown__heading', 
    { 
        'dropdown__heading--row-reverse': props.isRowReverse, 
        'dropdown__heading--row-default': !props.isRowReverse }
])

const onBlurClick = () => isOpened.value = false

const onClick = () => {
    isOpened.value = !isOpened.value
}
</script>

<style scoped lang="scss">
.dropdown {
    position: relative;

    &--swap-on-mobile.dropdown--left {
        .dropdown__list {
            top: auto;
            right: auto;
            bottom: 100%;
            left: 0;
            min-width: 270px;

            @media (min-width: $desktop-breakpoint) {
                top: 100%;
                bottom: auto;
            }
        }
    }

    &--swap-on-mobile.dropdown--right {
        .dropdown__list {
            top: auto;
            right: 0;
            bottom: 100%;
            left: auto;
            min-width: 270px;

            @media (min-width: $desktop-breakpoint) {
                top: 100%;
                bottom: auto;
            }
        }
    }

    &--swap-on-mobile.dropdown--center {
        .dropdown__list {
            top: auto;
            right: auto;
            bottom: 100%;
            left: 50%;
            min-width: 220px;
            transform: translateX(-50%);

            @media (min-width: $desktop-breakpoint) {
                top: 100%;
                bottom: auto;
            }
        }
    }

    &__heading {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 26px;
        padding: 9px 12px 11px;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;
        cursor: pointer;
        background: $light;
        border-radius: 6px;
        transition: $base-ui-transition;

        @media (min-width: $tablet-breakpoint) {
            padding: 12px 14px 14px;
            font-size: 16px;
            border-radius: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 14.5px 16px 16.5px;
            font-size: 18px;
            border-radius: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 21px 20px 23px;
            font-size: 20px;
            border-radius: 12px;
        }

        &--row-default {
            &::after,
            &::before {
                right: 41px;
                
                @media (min-width: $tablet-breakpoint) {
                    right: 49px;
                }
    
                @media (min-width: $desktop-breakpoint) {
                    right: 57px;
                }
    
                @media (min-width: $lg-desktop-breakpoint) {
                    right: 73px;
                }
            }

            .dropdown__icon-container {
                right: 12px;
                left: auto;

                @media (min-width: $tablet-breakpoint) {
                    right: 15px;
                }

                @media (min-width: $desktop-breakpoint) {
                    right: 17px;
                }

                @media (min-width: $lg-desktop-breakpoint) {
                    right: 24px;
                }
            }
        }

        &--row-reverse {
            flex-direction: row-reverse;

            .dropdown__icon-container {
                right: auto;
                left: 12px;

                @media (min-width: $tablet-breakpoint) {
                    left: 15px;
                }

                @media (min-width: $desktop-breakpoint) {
                    left: 17px;
                }

                @media (min-width: $lg-desktop-breakpoint) {
                    left: 24px;
                }
            }

            &::before,
            &::after {
                right: auto;
                left: 41px;

                @media (min-width: $tablet-breakpoint) {
                    left: 49px;
                    height: 8px;
                }

                @media (min-width: $desktop-breakpoint) {
                    left: 57px;
                    height: 10px;
                }

                @media (min-width: $lg-desktop-breakpoint) {
                    left: 73px;
                    height: 12px;
                }
            }
        }

        &::after,
        &::before {
            content: '';
            position: absolute;
            width: 2px;
            height: 6px;
            background-color: $secondary-100;
            border-radius: 0 0 5px 5px;

            @media (min-width: $tablet-breakpoint) {
                height: 8px;
            }

            @media (min-width: $desktop-breakpoint) {
                height: 10px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                height: 12px;
            }
        }

        &::before {
            top: 0;
            border-radius: 0 0 5px 5px;
        }

        &::after {
            bottom: 0;
            border-radius: 5px 5px 0 0;
        }

        @media (any-hover: hover) {
            &:hover {
                color: $primary-500;
            }
        }

        &:focus {
            :deep(svg) {
                stroke: $primary-500;
            }
        }

        :deep(svg) {
            width: 16px;
            height: 16px;
            transition: $base-ui-transition;
            stroke: $dark-500;

            @media (min-width: $tablet-breakpoint) {
                width: 18px;
                height: 18px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 22px;
                height: 22px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 24px;
                height: 24px;
            }
        }
    }

    &__icon-container {
        position: absolute;
        top: 50%;
        display: flex;
        align-items: center;
        transform: translateY(-50%);

        @media (min-width: $tablet-breakpoint) {
            :deep(svg) {
                width: 18px;
                height: 18px;
            }
        }

        @media (min-width: $desktop-breakpoint) {
            :deep(svg) {
                width: 22px;
                height: 22px;
            }
        }

        @media (min-width: $lg-desktop-breakpoint) {
            :deep(svg) {
                width: 24px;
                height: 24px;
            }
        }
    }

    &__list {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 3;
        width: 100%;
        max-height: 70vh;
        padding: 20px;
        overflow-y: auto;
        visibility: hidden;
        background: $light;
        border-radius: 6px;
        box-shadow: rgba(0, 0, 0, .35) 0 5px 15px;
        opacity: 0;
        transition: .3s;

        &--active {
            visibility: visible;
            opacity: 1;
        }

        @media (min-width: $tablet-breakpoint) {
            border-radius: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            max-height: 450px;
            border-radius: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            border-radius: 12px;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 6px;
        max-width: 60%;
        padding: 10px 12px;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;
        white-space: nowrap;
        cursor: pointer;
        transition: .3s;

        @media (min-width: $tablet-breakpoint) {
            padding: 12px 14px;
            font-size: 16px;
        }
 
        @media (min-width: $desktop-breakpoint) {
            padding: 15px 16px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 21px 20px 23px;
            font-size: 20px;
        }
    }

    &__selected-count {
        display: inline-block;
        min-width: 19px;
        padding: 3px;
        margin-left: 10px;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%;
        color: $light;
        text-align: center;
        background-color: $primary-400;
        border-radius: 5px;

        @media (min-width: $tablet-breakpoint) {
            font-size: 14px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 5px;
        }
    }
}
</style>
