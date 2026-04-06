<template>
    <div class="app-textarea">
        <label 
            v-if="labelText" 
            :for="id"
            :class="['app-textarea__label-text', { 'is-required': isRequiredField }]"
        >{{ labelText }}</label>
        <textarea
            :id="id"
            :class="classes"
            :value="value"
            :disabled="isDisabled"
            :placeholder="placeholder"
            @input="onInput"
            @change="onChange"
        />
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
.app-textarea {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    &__label-text {
        position: relative;
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

textarea {
    width: 100%;
    height: 40px;
    padding: 9px 15px 10px 10px;
    font-family: $main-font;
    caret-color: $dark-500;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    resize: none;
    background-color: $secondary-100;
    border: 2px solid transparent;
    border-radius: 6px;
    transition: $base-ui-transition;

    &::-webkit-scrollbar {
        display: none;
    }

    &:focus {
        height: 84px;

        @media (min-width: $tablet-breakpoint) {
            height: 92px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: 106px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: 148px;
        }
    }
    
    @media (min-width: $tablet-breakpoint) {
        height: 48px;
        padding: 13px 17px 13px 12px;
        border-radius: 8px;

        // &:focus,
        // &:not(:placeholder-shown) {
        //     height: 92px;
        // }
    }

    @media (min-width: $desktop-breakpoint) {
        height: 56px;
        padding: 15px 20px 16px 15px;
        font-size: 18px;
        border-radius: 10px;

        // &:focus,
        // &:not(:placeholder-shown) {
        //     height: 106px;
        // }
    }

    @media (min-width: $lg-desktop-breakpoint) {
        height: 64px;
        padding: 18px 25px 18px 20px;
        font-size: 20px;
        border-radius: 12px;

        &:focus,
        &:not(:placeholder-shown) {
            height: 148px;
        }
    }

    &::selection {
        background-color: $primary-200;
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
        color: $danger-400;
        background-color: $danger-100;
        caret-color: $danger-400;

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
        background-color: $secondary-100;
        border-color: $secondary-100;
    }
}
</style>
