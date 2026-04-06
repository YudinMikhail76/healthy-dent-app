<template>
    <div class="select">
        <div
            class="select__heading"
            tabindex="0"
            @click="onFocusClick"
            @blur="onBlurClick"
        >
            <span class="select__title">
                {{ selectedItem.label }}
            </span>
            <span class="select__icon-container">
                <slot name="heading-icon" />
            </span>
        </div>
        <div class="select__icon-btn" />
        <ul :class="['select__list', { 'select__list--active': focused }]">
            <li
                v-for="item in items"
                :key="item.value"
                :class="getItemClasses(item)"
                @click="onSelect(item)"
            >
                <slot v-if="slots['item-icon']" name="item-icon" />
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['on-select'])
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    defaultValue: {
        type: String,
        required: false,
        default: ''
    },
    activeItem: {
        type: [Object, Boolean],
        required: false,
        default: false
    }
})

const slots = useSlots()

const selectedItem = ref({
    label: '',
    value: null,
    ...getInitialItem()
})

const focused = ref(false)

const getItemClasses = (item) => [
    'select__item',
    { 'select__item--selected': selectedItem.value.value === item.value }
]

const onSelect = (value) => {
    selectedItem.value = value
    emit('on-select', value)
}

function getInitialItem() {
    if (props.activeItem) {
        return { label: props.activeItem.label, value: props.activeItem.value }
    }

    if (props.defaultValue) {
        return { label: props.defaultValue, value: '' }
    }

    return { label: '', value: '' }
}

const onFocusClick = () => {
    focused.value = !focused.value
}

const onBlurClick = () => {
    focused.value = false
}

watch(() => props.activeItem, () => {
    if (!props.activeItem) return

    selectedItem.value = {
        label: props.activeItem.label,
        value: props.activeItem.value
    }
})
</script>

<style scoped lang="scss">
.select {
    position: relative;
    display: inline-block;

    &__heading {
        position: relative;
        display: flex;
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
            font-size: 16px;
            border-radius: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
            border-radius: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
            border-radius: 12px;
        }

        &::after,
        &::before {
            content: '';
            position: absolute;
            right: 40px;
            width: 2px;
            height: 6px;
            background-color: $secondary-100;

            @media (min-width: $tablet-breakpoint) {
                right: 48px;
                height: 8px;
            }

            @media (min-width: $desktop-breakpoint) {
                right: 57px;
                height: 10px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                right: 73px;
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

    &__title {
        display: flex;
        align-items: center;
        min-width: 40px;
        min-height: 40px;
        padding: 9px;

        @media (min-width: $tablet-breakpoint) {
            min-height: 48px;
            padding: 12px 14px;
        }

        @media (min-width: $desktop-breakpoint) {
            min-height: 56px;
            padding: 14.5px 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-height: 72px;
            padding: 20px;
        }
    }

    &__icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;

        @media (min-width: $tablet-breakpoint) {
            width: 48px;
            height: 48px;

            :deep(svg) {
                width: 18px;
                height: 18px;
            }
        }

        @media (min-width: $desktop-breakpoint) {
            width: 56px;
            height: 56px;

            :deep(svg) {
                width: 22px;
                height: 22px;
            }
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 72px;
            height: 72px;

            :deep(svg) {
                width: 24px;
                height: 24px;
            }
        }
    }

    &__list {
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 2;
        width: 100%;
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

        @media (any-hover: hover) {
            &:hover:not(.select__item--selected) {
                color: $primary-500;
            }
        }

        &--selected {
            color: $primary-500;
            pointer-events: none;
        }
    }
}
</style>
