<template>
    <div :class="['app-input', { 'app-input--is-error': isError }]">
        <label 
            v-if="labelText" 
            :for="id"
            :class="['app-input__label-text', { 'is-required': isRequiredField }]"
        >{{ labelText }}</label>
        <div class="app-input__input-container">
            <input
                v-bind="$attrs"
                :id="id"
                :type="type"
                :class="classes"
                :value="value"
                :disabled="isDisabled"
                :placeholder="placeholder"
                @input="onInput"
                @change="onChange"
            >
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['on-input', 'on-change'])
const props = defineProps({
    value: {
        type: [String, Number],
        required: true
    },
    labelText: {
        type: String,
        required: false,
        default: ''
    },
    placeholder: {
        type: [String, null],
        required: false,
        default: null
    },
    type: {
        type: String,
        required: false,
        default: 'text',
        validator: (value) => ['text', 'number', 'tel'].includes(value)
    },
    id: {
        type: [String, Number],
        required: true
    },
    isRequiredField: {
        type: Boolean,
        required: false
    },
    isError: {
        type: Boolean,
        required: false
    },
    isSuccess: {
        type: Boolean,
        required: false
    },
    isDisabled: {
        type: Boolean,
        required: false
    }
})

const classes = computed(() => [
    { 'is-error': props.isError },
    { 'is-disabled': props.isDisabled },
    { 'is-success': props.isSuccess }
])

const onInput = (event) => emit('on-input', event.target.value)
const onChange = (event) => emit('on-change', event.target.value)
</script>

<style scoped lang="scss">
.app-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &--is-error {
        position: relative;

        input {
            background-color: $danger-100;
        }

        .app-input__input-container::before, 
        .app-input__input-container::after {
            content: '';
            position: absolute;
            right: 44px;
            width: 2px;
            height: 15px;
            background-color: $light;

            @media (min-width: $tablet-breakpoint) {
                right: 51px;
            }

            @media (min-width: $desktop-breakpoint) {
                right: 54px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                right: 64px;
            }
        }

        .app-input__input-container::before {
            top: 0;
            border-radius: 0 0 5px 5px;
        }
        
        .app-input__input-container::after {
            bottom: 0;
            border-radius: 5px 5px 0 0;
        }

        .app-input__input-container {
            position: relative;
        }
    }

    &__input-container {
        width: 100%;
    }

    &__label-text {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 6px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;
        
        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 8px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 10px;
            font-size: 20px;
        }

        &.is-required {
            display: flex;
            align-items: center;

            &::after {
                content: '*';
                display: inline-block;
                font-size: 16px;
                font-style: normal;
                font-weight: 700;
                line-height: 140%;
                color: $primary-500;
            }
        }
    }
}

input {
    width: 100%;
    padding: 9px 50px 10px 10px;
    font-family: $main-font, Arial, Helvetica, sans-serif;
    caret-color: $dark-500;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    background-color: $secondary-100;
    border: 2px solid transparent;
    border-radius: 6px;
    transition: background-color $base-ui-transition, border-color $base-ui-transition, color $base-ui-transition;

    @media (min-width: $tablet-breakpoint) {
        padding: 13px 17px 13px 12px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 15px 20px 16px 15px;
        font-size: 18px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 18px 25px 18px 20px;
        font-size: 20px;
        border-radius: 12px;
    }

    &::selection {
        background-color: $primary-200;
    }

    &[type='number'] {
        appearance: none;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }
    }

    &:focus:not(.is-error),
    &:not(.is-disabled):not(.is-error):hover {
        background-color: $light;
        border-color: $primary-400;

        &::placeholder {
            color: $primary-500;
        }
    }

    &.is-error {
        padding-right: 50px;
        color: $danger-400;
        background-color: $danger-100;
        background-image: url('@/shared/assets/background/icon-input-error.svg');
        background-repeat: no-repeat;
        background-position: calc(100% - 10px) center;
        caret-color: $danger-400;

        @media (min-width: $tablet-breakpoint) {
            background-position: calc(100% - 12px) center;
        }

        @media (min-width: $desktop-breakpoint) {
            padding-right: 80px;
            background-position: calc(100% - 15px) center;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-right: 80px;
            background-position: calc(100% - 20px) center;
        }

        &::placeholder {
            color: $danger-400;
        }
    }

    &.is-success {
        background: $light;
        border: 2px solid $primary-400;
        caret-color: $primary-500;
    }

    &.is-disabled {
        color: $dark-500;
        pointer-events: none;
        background-color: $dark-500;
        border-color: $dark-500;
    }
}
</style>
