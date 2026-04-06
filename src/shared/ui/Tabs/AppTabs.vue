<template>
    <div class="tabs">
        <div class="tabs__heading">
            <ul class="tabs__list">
                <li 
                    v-for="tab in tabs"
                    :key="tab.value"
                    :class="getClasses(tab.value)"
                    @click="handleChange(tab)" 
                >
                    {{ tab.label }}
                </li>
            </ul>
        </div>
        <div class="tabs__body">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    selected: {
        type: String,
        required: true
    },
    tabs: {
        type: Array,
        required: true
    },
    particlesColor: {
        type: String,
        default: '#E9E8EE'
    }
})

const emit = defineEmits(['select'])

const getClasses = (tabValue) => [
    'tabs__item',
    { 'tabs__item--active': props.selected === tabValue }
]

const handleChange = (tab) => emit('select', tab.value)
</script>

<style scoped lang="scss">
.tabs {
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
        padding: 8px 10px;
        font-family: $main-font;
        font-size: 20px;
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

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 5px;
            height: 58.33%;
            /* stylelint-disable-next-line value-keyword-case */
            background-color: v-bind(particlesColor); 
        }

        &::before {
            left: 0;
            transform: translate(-50%, -50%);    
        }

        &::after {
            right: 0;
            transform: translate(50%, -50%);
        }

        &--active {
            color: $dark-500;
            border-color: $dark-500;
        }
    }
}
</style>
