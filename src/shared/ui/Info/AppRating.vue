<template>
    <div
        v-if="isDisabled"
        :class="[
            'rating',
            `rating--${ size }`,
            `rating--${ variant }`,
            { 'rating--disabled': isDisabled }
        ]"
    >
        <div class="rating__list">
            <div
                v-for="item in ELEMENTS_COUNT"
                :key="item"
                class="rating__item"
            >
                <RatingStar />
            </div>
        </div>
        <div class="rating__list rating__list--active" :style="activeWidth">
            <div
                v-for="item in ELEMENTS_COUNT"
                :key="item"
                class="rating__item rating__item rating__item--active"
            >
                <RatingStar />
            </div>
        </div>
    </div>
    <div
        v-else
        :class="[
            'rating',
            `rating--${ size }`,
            `rating--${ variant }`
        ]"
    >
        <div class="rating__list">
            <div
                v-for="item in ELEMENTS_COUNT"
                :key="item"
                :class="['rating__item', { 'rating__item--active': item <= rate || item <= hoverRate }]"
                @mouseenter="updateHoverRate(item)"
                @mouseleave="updateHoverRate(0)"
                @click="updateRate(item)"
            >
                <RatingStar />
            </div>
        </div>
    </div>
</template>

<script setup>
import RatingStar from '@/shared/assets/icons/rating-star.svg'

const emit = defineEmits(['onChange'])
const ELEMENTS_COUNT = 5

const props = defineProps({
    isDisabled: {
        type: Boolean,
        required: false
    },
    mark: {
        type: Number,
        required: false,
        default: 0
    },
    size: {
        type: String,
        required: true,
        validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    variant: {
        type: String,
        required: true,
        validator: (value) => ['primary', 'light'].includes(value)
    }
})

const rate = ref(0)
const hoverRate = ref(0)
const isValueSet = ref(false)

const activeWidth = computed(() => {
    const percent = props.mark * 100 / ELEMENTS_COUNT
    return `width: ${ percent }%`
})

const updateHoverRate = (index) => {
    if (props.isDisabled && isValueSet.value) return

    hoverRate.value = index
}

const updateRate = (index) => {
    if (props.isDisabled && isValueSet.value) return

    isValueSet.value = true
    rate.value = index

    emit('onChange', rate.value)
}

onMounted(() => {
    updateRate(props.isDisabled ? props.mark : 1)
})
</script>

<style scoped lang="scss">
.rating {
    position: relative;
    width: max-content;

    &--disabled {
        .rating__item {
            pointer-events: none;
            cursor: initial;
        }
    }

    &--small {
        .rating__item {
            width: 24px;
            height: 24px;

            @media (min-width: $desktop-breakpoint) {
                width: 32px;
                height: 32px;
            }
        }
    }

    &--medium {
        .rating__item {
            width: 30px;
            height: 30px;

            @media (min-width: $desktop-breakpoint) {
                width: 40px;
                height: 40px;
            }
        }
    }

    &--large {
        .rating__item {
            width: 48px;
            height: 48px;
        }
    }

    &--primary {
        :deep(svg) {
            fill: $dark-200;
        }

        .rating__item--active {
            svg {
                fill: $primary-500;
            }
        }
    }

    &--light {
        :deep(svg) {
            fill: transparent;
            stroke: $light;
        }

        .rating__item--active {
            svg {
                fill: $primary-500 !important;
                stroke: $primary-500;
            }
        }
    }

    &__list {
        display: flex;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }

        &--active {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            overflow: hidden;
        }
    }

    &__item {
        flex-shrink: 0;
        cursor: pointer;

        svg {
            width: 100%;
            height: 100%;
            vertical-align: top;
            transition: $base-ui-transition;
        }
    }
}
</style>
