<template>
    <div class="app-checkbox">
        <input
            v-bind="$attrs"
            :id="id"
            :value="value"
            :checked="isChecked"
            type="checkbox"
            @change="onChange"
        >
        <label :for="id" class="app-checkbox__label">
            <span v-if="label" class="app-checkbox__label-value">{{ label }}</span>
            <div v-if="slots.count" class="app-checkbox__count">
                <span class="app-checkbox__bracket">(</span>
                <slot name="count" />
                <span class="app-checkbox__bracket">)</span>
            </div>
        </label>
    </div>
</template>

<script setup>
const emit = defineEmits(['on-change'])
defineProps({
    label: {
        type: String,
        default: '',
        required: false
    },
    value: {
        type: [String, Number, Boolean],
        required: true
    },
    id: {
        type: [String, Number],
        required: true
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
.app-checkbox {
    padding: 6px 0;

    .app-checkbox__label {
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
            height: 18px;
            max-width: 18px;
            min-width: 18px;
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

        &:checked:disabled {
            + .app-checkbox__label::before {
                background-color: $dark-200;
                border-color: $dark-200;
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

    &__count {
        display: flex;
        gap: 3px;
        margin-left: auto;
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
