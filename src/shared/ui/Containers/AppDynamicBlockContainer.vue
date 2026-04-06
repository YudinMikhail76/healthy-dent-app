<template>
    <div :class="classes">
        <div class="app-dynamic-block-container__heading">
            <slot name="heading" />
        </div>
        <slot name="content" />
    </div>
</template>

<script setup>
const props = defineProps({
    background: {
        type: String,
        default: '#ffffff'
    },
    withPadding: {
        type: Boolean,
        default: true
    }
})

const classes = computed(() => [
    'app-dynamic-block-container',
    { 'app-dynamic-block-container--with-padding': props.withPadding }
])
</script>

<style lang="scss" scoped>
.app-dynamic-block-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: v-bind(background);
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
        border-radius: 30px;
    }

    &--with-padding {
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
        }
    }

    &__heading {
        font-size: 24px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }
}
</style>