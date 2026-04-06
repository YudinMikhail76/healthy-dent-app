<template>
    <div class="caret-separator-vertical">
        <span class="caret-separator-vertical__line" />
    </div>
</template>

<script setup>
defineProps({
    color: {
        type: String,
        default: '#E9E8EE'
    }
})
</script>

<style lang="scss" scoped>
.caret-separator-vertical {
    position: relative;
    width: 18px;
    height: auto;

    @media (min-width: $lg-desktop-breakpoint) {
        width: 20px;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 0;
        z-index: 3;
        width: 100%;
        height: 9px;
        mask-repeat: no-repeat;
        mask-size: contain;
        background-color: v-bind(color);

        @media (min-width: $lg-desktop-breakpoint) {
            height: 10px;
        }
    }

    &::before {
        top: 0;
        mask-image: url('../../assets/background/separator-caret-bottom.svg');
    }

    &::after {
        bottom: 0;
        mask-image: url('../../assets/background/separator-caret-top.svg');
        mask-position: right;
    }

    &__line {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 1px;
        background-color: $secondary-100;
    }
}
</style>