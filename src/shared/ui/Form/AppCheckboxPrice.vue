<template>
    <div :class="['app-checkbox-price', `app-checkbox-price--${ size }`]">
        <input
            v-bind="$attrs"
            :id="id"
            :value="value"
            :checked="isChecked"
            type="checkbox"
            @change="onChange"
        >
        <label :for="id" class="app-checkbox-price__label">
            <span>{{ label }}</span>
            <div v-if="slots.price" class="app-checkbox-price__price">
                <slot name="price" />
            </div>
        </label>
    </div>
</template>

<script setup>
const emit = defineEmits(['on-change'])
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: [String, Number, Boolean],
        required: true
    },
    id: {
        type: [String, Number],
        required: true
    },
    size: {
        type: String,
        required: true,
        validator: (value) => ['small', 'medium'].includes(value)
    },
    isChecked: {
        type: Boolean,
        required: false
    }
})

const slots = useSlots()

const onChange = (event) => emit('on-change', event.target.value)
</script>

<style scoped lang="scss">
.app-checkbox-price {
    .app-checkbox-price__label {
        gap: 6px;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }

        &::before {
            width: 18px;
            height: 18px;
        }
    }

    input[type='checkbox'] {
        position: absolute;
        width: 0;
        height: 0;
        border: 0;
        appearance: none;

        &:checked {
            + .app-checkbox__label {
                color: $primary-300;

                &::before {
                    background-color: $primary-500;
                    background-image: url('@/shared/assets/background/checkbox-checked.svg');
                    background-position: center;
                    background-size: 9px 9px;
                    border-color: $primary-500;

                    @media (min-width: $desktop-breakpoint) {
                        background-size: 12px 12px;
                    }
                }
            }
        }

        &:disabled {
            + .app-checkbox__label {
                color: $dark-500;
                cursor: not-allowed;
                border-color: $dark-500;
            }
        }
    }

    &__label {
        display: flex;
        align-items: center;
        color: $dark-500;
        cursor: pointer;
        border-color: $dark-500;
        transition: $base-ui-transition;

        @media (any-hover: hover) {
            &:hover {
                color: $primary-500;
                border-color: $primary-500;
            }
        }

        &::before {
            content: '';
            display: block;
            background-color: transparent;
            background-repeat: no-repeat;
            background-size: 100%;
            border: 2px solid $dark-500;
            border-color: inherit;
            border-radius: 5px;
            transition: $base-ui-transition;
        }
    }

    &__price {
        display: flex;
        gap: 3px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

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

    &__bracket {
        color: $primary-500;
    }
}
</style>
