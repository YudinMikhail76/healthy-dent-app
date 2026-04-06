<template>
    <div class="multicheck">
        <div class="multicheck__heading">
            <ul class="multicheck__list">
                <li 
                    v-for="tab in tabs"
                    :key="tab.value"
                    :class="getClasses(tab.value)"
                    @click="handleClick(tab)" 
                >
                    <div v-if="isSelected(tab.value)" class="multicheck__item-check">
                        <CheckboxCheckedButton />
                    </div>
                    {{ tab.label }}
                </li>
            </ul>
        </div>
        <div class="multicheck__body">
            <slot />
        </div>
    </div>
</template>

<script setup>
import CheckboxCheckedButton from '@/shared/assets/background/checkbox-checked.svg'

const props = defineProps({
    selectedList: {
        type: Array,
        default: () => []
    },

    tabs: {
        type: Array,
        required: true
    },

    size: {
        type: String,
        required: false,
        default: 'sm'
    }
})

const emit = defineEmits(['select'])

const isSelected = (value) => props.selectedList.find((item) => item.value === value)

const getClasses = (value) => [
    'multicheck__item',
    { 'multicheck__item--active': isSelected(value) }
]

const handleClick = (tab) => emit('select', tab)
</script>

<style scoped lang="scss">
.multicheck {
    &__heading {
        display: flex;
        justify-content: center;
        margin-bottom: 76px;
    }
    
    &__list {
        display: flex;
        justify-content: center;
        gap: 32px;
        list-style: none;
    }
    
    &__item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 9px;
        font-family: $main-font;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $primary-300;
        cursor: pointer;
        border: 1px solid $primary-300;
        border-radius: 6px;
        transition: color $base-ui-transition, border-color $base-ui-transition;

        @media (any-hover: hover) {
            &:hover {
                color: $primary-500;
                border-color: $primary-500;
            }
        }

        @media (min-width: $tablet-breakpoint) {
            min-height: 40px;
            font-size: 16px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            min-height: 48px;
            padding: 8px 11.5px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-height: 56px;
            padding: 8px 14px;
            font-size: 20px;
        }

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 5px;
            height: 58.33%;
            background-color: $secondary-100; 
        }

        &::before {
            left: 0;
            transform: translateX(-50%);    
        }

        &::after {
            right: 0;
            transform: translateX(50%);
        }

        &--active {
            display: flex;
            align-items: center;
            color: $dark-500;
            border-color: $dark-500;
        }
    }

    &__item-check {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        background-color: $primary-500;
        border-radius: 5px;

        @media (min-width: $desktop-breakpoint) {
            width: 20px;
            height: 20px;
        }

        :deep(svg) {
            width: 12px;
            height: 12px;
        }
    }
}
</style>
