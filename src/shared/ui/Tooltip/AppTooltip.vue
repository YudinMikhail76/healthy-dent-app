<template>
    <div
        ref="tooltip"
        tabindex="0"
        :class="classes"
        @click="openTooltip"
        @blur="deactivateTooltip"
        @focusout="deactivateTooltip"
        @mouseenter="openTooltip"
        @mouseleave="deactivateTooltip"
    >
        <div class="tooltip__heading">
            <slot />
        </div>
        <div
            ref="tooltip"
            :style="contentStyle"
            class="tooltip__content"
        >
            <span class="tooltip__content-title">
                {{ contentTitle }}
            </span>
            <span>
                {{ contentText }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['onLeave'])
const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ['regular'].includes(value)
    },
    contentTitle: {
        type: String,
        required: true
    },
    contentText: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        default: 'bottom',
        validator: (value) => ['bottom', 'top', 'left', 'right'].includes(value)
    }
})

const direction = ref('')
const tooltip = ref(null)
const isActive = ref(false)

const classes = computed(() => [
    'tooltip',
    `tooltip--${ props.type }`,
    { 'tooltip--active': isActive.value },
    props.position && `tooltip--${ props.position }`
])
const contentStyle = computed(() => `width: ${ props.width }px`)

const openTooltip = () => {
    isActive.value = true
}
const deactivateTooltip = () => {
    isActive.value = false
    direction.value = ''
    emit('onLeave')
}
</script>

<style scoped lang="scss">
.tooltip {
    position: relative;
    width: max-content;

    &--active {
        .tooltip__content {
            display: block;
        }
    }

    &--regular {
        .tooltip__content {
            padding: 10px 15px;
            color: $light;
            background: $primary-300;
            border-radius: 15px;

            @media (min-width: $desktop-breakpoint) {
                padding: 20px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                padding: 25px;
            }
        }
    }

    // Directions
    &--bottom {
        .tooltip__content {
            top: 100%;
            left: 50%;
            border-radius: 0 15px 15px;
        }
    }

    &--top {
        .tooltip__content {
            bottom: calc(100% + 8px);
            left: 10px;
            border-radius: 15px 15px 15px 0;

            @media (min-width: $lg-desktop-breakpoint) {
                border-radius: 20px 20px 20px 0;
            }
        }
    }

    &--left {
        .tooltip__content {
            right: calc(100% + 8px);
            bottom: 100%;
            border-radius: 15px 15px 0;
        }
    }

    &--right {
        .tooltip__content {
            top: calc(50%);
            left: calc(100% + 8px);
            border-radius: 15px;
            transform: translateY(-50%);
        }
    }

    &__content {
        position: absolute;
        z-index: 6;
        display: none;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }

    &__content-title {
        display: block;
        margin-bottom: 15px;
        font-weight: 800;
    }
}
</style>
