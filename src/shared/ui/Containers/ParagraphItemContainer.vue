<template>
    <div :class="['block-item-container', { 'block-item-container--with-padding': withPadding }]">
        <slot />
    </div>
</template>

<script setup>
defineProps({
    background: {
        type: String,
        default: '#ffffff'
    },
    withPadding: {
        type: Boolean,
        default: true
    }
})
</script>

<style lang="scss" scoped>
.block-item-container {
    margin-bottom: 40px;
    background-color: v-bind(background);
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        margin-bottom: 60px;;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
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
}
</style>